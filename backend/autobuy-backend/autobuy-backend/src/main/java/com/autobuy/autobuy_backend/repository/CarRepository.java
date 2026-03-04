package com.autobuy.autobuy_backend.repository;

import com.autobuy.autobuy_backend.model.entity.Car;
import com.autobuy.autobuy_backend.model.enums.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByListingStatus(ListingStatus listingStatus);
    List<Car> findByDealerId(Long dealerId);
    List<Car> findByListingStatusAndDealerId(ListingStatus listingStatus, Long dealerId);
    Optional<Car> findByIdAndListingStatus(Long id, ListingStatus listingStatus);
}
