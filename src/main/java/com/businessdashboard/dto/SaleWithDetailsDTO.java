package com.businessdashboard.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SaleWithDetailsDTO {
    private Long id;
    private Long productId;
    private String productName;
    private Long customerId;
    private String customerName;
    private Integer quantity;
    private BigDecimal totalAmount;
    private LocalDateTime date;

    public SaleWithDetailsDTO() {}

    public SaleWithDetailsDTO(Long id, Long productId, String productName, Long customerId, 
                             String customerName, Integer quantity, BigDecimal totalAmount, LocalDateTime date) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.customerId = customerId;
        this.customerName = customerName;
        this.quantity = quantity;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}