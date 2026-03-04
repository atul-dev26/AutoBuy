package com.autobuy.autobuy_backend.config;

import com.autobuy.autobuy_backend.model.entity.Car;
import com.autobuy.autobuy_backend.model.entity.User;
import com.autobuy.autobuy_backend.model.enums.ListingStatus;
import com.autobuy.autobuy_backend.model.enums.Role;
import com.autobuy.autobuy_backend.repository.CarRepository;
import com.autobuy.autobuy_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@ConditionalOnProperty(prefix = "app.seed", name = "enabled", havingValue = "true", matchIfMissing = true)
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        ensureUser("System Admin", "admin@autobuy.com", "Admin@123", Role.ADMIN);
        User dealer = ensureUser("Demo Dealer", "dealer@autobuy.com", "Dealer@123", Role.DEALER);
        ensureUser("Demo Buyer", "buyer@autobuy.com", "Buyer@123", Role.BUYER);

        if (carRepository.count() == 0) {
            List<Car> cars = List.of(
                    car(dealer, "Toyota", "Camry", 2024, "2850000", "Reliable sedan with strong resale value.", "https://placehold.co/800x500?text=Toyota+Camry"),
                    car(dealer, "Honda", "City", 2024, "1450000", "Comfortable city sedan with efficient mileage.", "https://placehold.co/800x500?text=Honda+City"),
                    car(dealer, "Hyundai", "Creta", 2024, "1800000", "Popular compact SUV with modern features.", "https://placehold.co/800x500?text=Hyundai+Creta"),
                    car(dealer, "Kia", "Seltos", 2024, "1750000", "Feature-rich SUV with sporty styling.", "https://placehold.co/800x500?text=Kia+Seltos"),
                    car(dealer, "Maruti Suzuki", "Grand Vitara", 2024, "1700000", "Practical SUV with good fuel economy.", "https://placehold.co/800x500?text=Grand+Vitara"),
                    car(dealer, "Mahindra", "XUV700", 2024, "2300000", "Powerful SUV with ADAS options.", "https://placehold.co/800x500?text=Mahindra+XUV700"),
                    car(dealer, "Tata", "Nexon", 2024, "1300000", "Safety-focused compact SUV.", "https://placehold.co/800x500?text=Tata+Nexon"),
                    car(dealer, "Volkswagen", "Virtus", 2024, "1650000", "Premium sedan with strong highway performance.", "https://placehold.co/800x500?text=VW+Virtus"),
                    car(dealer, "Skoda", "Slavia", 2024, "1680000", "Elegant sedan with turbo options.", "https://placehold.co/800x500?text=Skoda+Slavia"),
                    car(dealer, "MG", "Hector", 2024, "2250000", "Spacious SUV with connected features.", "https://placehold.co/800x500?text=MG+Hector"),
                    car(dealer, "Toyota", "Innova Hycross", 2024, "3100000", "Family MPV with hybrid option.", "https://placehold.co/800x500?text=Innova+Hycross"),
                    car(dealer, "Hyundai", "Verna", 2024, "1600000", "Modern sedan with balanced comfort and tech.", "https://placehold.co/800x500?text=Hyundai+Verna")
            );

            carRepository.saveAll(cars);
        }
    }

    private User ensureUser(String fullName, String email, String rawPassword, Role role) {
        return userRepository.findByEmail(email).orElseGet(() ->
                userRepository.save(
                        User.builder()
                                .fullName(fullName)
                                .email(email)
                                .password(passwordEncoder.encode(rawPassword))
                                .role(role)
                                .build()
                )
        );
    }

    private Car car(User dealer, String brand, String model, int year, String price, String description, String imageUrl) {
        return Car.builder()
                .brand(brand)
                .model(model)
                .manufacturingYear(year)
                .price(new BigDecimal(price))
                .description(description)
                .imageUrl(imageUrl)
                .listingStatus(ListingStatus.APPROVED)
                .dealer(dealer)
                .build();
    }
}
