package com.autobuy.autobuy_backend.dto.car;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class EmiRequest {

    @NotNull(message = "Principal amount is required")
    @DecimalMin(value = "1.0", inclusive = true, message = "Principal must be positive")
    private BigDecimal principal;

    @NotNull(message = "Annual interest rate is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Interest rate must be > 0")
    private BigDecimal annualInterestRate;

    @NotNull(message = "Tenure in months is required")
    @Min(value = 1, message = "Tenure must be at least 1 month")
    private Integer tenureMonths;
}
