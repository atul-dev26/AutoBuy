package com.autobuy.autobuy_backend.dto.car;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class EmiResponse {
    private BigDecimal monthlyEmi;
    private BigDecimal totalAmount;
    private BigDecimal totalInterest;
}
