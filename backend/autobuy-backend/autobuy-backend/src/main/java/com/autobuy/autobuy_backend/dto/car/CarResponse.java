package com.autobuy.autobuy_backend.dto.car;

import com.autobuy.autobuy_backend.model.enums.ListingStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class CarResponse {
    private Long id;
    private String brand;
    private String model;
    private Integer manufacturingYear;
    private BigDecimal price;
    private String description;
    private String imageUrl;
    private ListingStatus listingStatus;
    private Long dealerId;
    private String dealerName;
}
