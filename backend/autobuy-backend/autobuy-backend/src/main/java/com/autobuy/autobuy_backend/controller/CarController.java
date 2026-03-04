package com.autobuy.autobuy_backend.controller;

import com.autobuy.autobuy_backend.dto.car.CarCreateRequest;
import com.autobuy.autobuy_backend.dto.car.CarResponse;
import com.autobuy.autobuy_backend.dto.car.EmiRequest;
import com.autobuy.autobuy_backend.dto.car.EmiResponse;
import com.autobuy.autobuy_backend.model.enums.ListingStatus;
import com.autobuy.autobuy_backend.service.CarService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    @PostMapping("/dealer")
    @PreAuthorize("hasRole('DEALER')")
    public ResponseEntity<CarResponse> createCar(@Valid @RequestBody CarCreateRequest request,
                                                 Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(carService.createCar(request, authentication.getName()));
    }

    @GetMapping("/approved")
    @PreAuthorize("hasAnyRole('BUYER','DEALER','ADMIN')")
    public ResponseEntity<List<CarResponse>> getApprovedCars() {
        return ResponseEntity.ok(carService.getApprovedCars());
    }

    @GetMapping("/{carId}")
    @PreAuthorize("hasAnyRole('BUYER','DEALER','ADMIN')")
    public ResponseEntity<CarResponse> getApprovedCarById(@PathVariable Long carId) {
        return ResponseEntity.ok(carService.getApprovedCarById(carId));
    }

    @GetMapping("/dealer/me")
    @PreAuthorize("hasRole('DEALER')")
    public ResponseEntity<List<CarResponse>> getDealerCars(Authentication authentication) {
        return ResponseEntity.ok(carService.getDealerCars(authentication.getName()));
    }

    @GetMapping("/admin/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CarResponse>> getPendingCars() {
        return ResponseEntity.ok(carService.getPendingCars());
    }

    @PatchMapping("/admin/{carId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CarResponse> updateListingStatus(@PathVariable Long carId,
                                                           @RequestParam ListingStatus status) {
        return ResponseEntity.ok(carService.updateListingStatus(carId, status));
    }

    @PostMapping("/emi/calculate")
    @PreAuthorize("hasAnyRole('BUYER','DEALER','ADMIN')")
    public ResponseEntity<EmiResponse> calculateEmi(@Valid @RequestBody EmiRequest request) {
        return ResponseEntity.ok(carService.calculateEmi(request));
    }
}
