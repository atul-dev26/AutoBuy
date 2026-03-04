package com.autobuy.autobuy_backend.dto.car;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CarCreateRequest {

    @NotBlank(message = "Brand is required")
    @Size(max = 80, message = "Brand must be <= 80 characters")
    private String brand;

    @NotBlank(message = "Model is required")
    @Size(max = 80, message = "Model must be <= 80 characters")
    private String model;

    @NotNull(message = "Manufacturing year is required")
    @Min(value = 1990, message = "Manufacturing year must be >= 1990")
    @Max(value = 2100, message = "Manufacturing year must be <= 2100")
    private Integer manufacturingYear;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "1.0", inclusive = true, message = "Price must be positive")
    private BigDecimal price;

    @Size(max = 1200, message = "Description must be <= 1200 characters")
    private String description;
}
