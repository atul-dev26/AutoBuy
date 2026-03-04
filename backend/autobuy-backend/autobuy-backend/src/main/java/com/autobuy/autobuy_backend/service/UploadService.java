package com.autobuy.autobuy_backend.service;

import com.autobuy.autobuy_backend.model.entity.Car;
import com.autobuy.autobuy_backend.model.entity.User;
import com.autobuy.autobuy_backend.repository.CarRepository;
import com.autobuy.autobuy_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UploadService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Transactional
    public String uploadCarImage(Long carId, MultipartFile file, String dealerEmail) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is required");
        }

        User dealer = userRepository.findByEmail(dealerEmail)
                .orElseThrow(() -> new IllegalArgumentException("Dealer not found"));

        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));

        if (!car.getDealer().getId().equals(dealer.getId())) {
            throw new IllegalArgumentException("You can upload image only for your own listing");
        }

        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            String originalName = file.getOriginalFilename() == null ? "image" : file.getOriginalFilename();
            String ext = "";
            int idx = originalName.lastIndexOf('.');
            if (idx >= 0) {
                ext = originalName.substring(idx);
            }

            String fileName = "car_" + carId + "_" + UUID.randomUUID() + ext;
            Path target = uploadPath.resolve(fileName).normalize();

            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/uploads/" + fileName;
            car.setImageUrl(imageUrl);
            carRepository.save(car);

            return imageUrl;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }
    }
}
