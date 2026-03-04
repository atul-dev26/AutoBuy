package com.autobuy.autobuy_backend.service;

import com.autobuy.autobuy_backend.dto.car.CarCreateRequest;
import com.autobuy.autobuy_backend.dto.car.CarResponse;
import com.autobuy.autobuy_backend.dto.car.EmiRequest;
import com.autobuy.autobuy_backend.dto.car.EmiResponse;
import com.autobuy.autobuy_backend.model.entity.Car;
import com.autobuy.autobuy_backend.model.entity.User;
import com.autobuy.autobuy_backend.model.enums.ListingStatus;
import com.autobuy.autobuy_backend.model.enums.Role;
import com.autobuy.autobuy_backend.repository.CarRepository;
import com.autobuy.autobuy_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public CarResponse createCar(CarCreateRequest request, String dealerEmail) {
        User dealer = userRepository.findByEmail(dealerEmail)
                .orElseThrow(() -> new IllegalArgumentException("Dealer not found"));

        if (dealer.getRole() != Role.DEALER) {
            throw new IllegalArgumentException("Only dealer can create listings");
        }

        Car car = Car.builder()
                .brand(request.getBrand())
                .model(request.getModel())
                .manufacturingYear(request.getManufacturingYear())
                .price(request.getPrice())
                .description(request.getDescription())
                .listingStatus(ListingStatus.PENDING)
                .dealer(dealer)
                .build();

        return toResponse(carRepository.save(car));
    }

    public List<CarResponse> getApprovedCars() {
        return carRepository.findByListingStatus(ListingStatus.APPROVED)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public CarResponse getApprovedCarById(Long carId) {
        Car car = carRepository.findByIdAndListingStatus(carId, ListingStatus.APPROVED)
                .orElseThrow(() -> new IllegalArgumentException("Approved car not found"));
        return toResponse(car);
    }

    public List<CarResponse> getDealerCars(String dealerEmail) {
        User dealer = userRepository.findByEmail(dealerEmail)
                .orElseThrow(() -> new IllegalArgumentException("Dealer not found"));

        return carRepository.findByDealerId(dealer.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<CarResponse> getPendingCars() {
        return carRepository.findByListingStatus(ListingStatus.PENDING)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public CarResponse updateListingStatus(Long carId, ListingStatus status) {
        if (status == ListingStatus.PENDING) {
            throw new IllegalArgumentException("Status can only be APPROVED or REJECTED");
        }

        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));

        car.setListingStatus(status);
        return toResponse(carRepository.save(car));
    }

    public EmiResponse calculateEmi(EmiRequest request) {
        BigDecimal principal = request.getPrincipal();
        double principalValue = principal.doubleValue();
        double monthlyRate = request.getAnnualInterestRate().doubleValue() / 1200.0;
        int months = request.getTenureMonths();

        double emiValue;
        if (monthlyRate == 0.0) {
            emiValue = principalValue / months;
        } else {
            double factor = Math.pow(1 + monthlyRate, months);
            emiValue = (principalValue * monthlyRate * factor) / (factor - 1);
        }

        BigDecimal monthlyEmi = BigDecimal.valueOf(emiValue).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalAmount = monthlyEmi.multiply(BigDecimal.valueOf(months)).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalInterest = totalAmount.subtract(principal).setScale(2, RoundingMode.HALF_UP);

        return EmiResponse.builder()
                .monthlyEmi(monthlyEmi)
                .totalAmount(totalAmount)
                .totalInterest(totalInterest)
                .build();
    }

    private CarResponse toResponse(Car car) {
        return CarResponse.builder()
                .id(car.getId())
                .brand(car.getBrand())
                .model(car.getModel())
                .manufacturingYear(car.getManufacturingYear())
                .price(car.getPrice())
                .description(car.getDescription())
                .imageUrl(car.getImageUrl())
                .listingStatus(car.getListingStatus())
                .dealerId(car.getDealer().getId())
                .dealerName(car.getDealer().getFullName())
                .build();
    }
}
