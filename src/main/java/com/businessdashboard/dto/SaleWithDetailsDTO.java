package com.businessdashboard.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SaleWithDetailsDTO {
    private Long id;
    private Long productId;
    private Long customerId;
    private Integer quantity;
    private BigDecimal totalAmount;
    private LocalDateTime saleDate;
    private String productName;
    private String customerName;

    public SaleWithDetailsDTO() {}

    public SaleWithDetailsDTO(Long id, Long productId, Long customerId, Integer quantity, 
                             BigDecimal totalAmount, LocalDateTime saleDate, 
                             String productName, String customerName) {
        this.id = id;
        this.productId = productId;
        this.customerId = customerId;
        this.quantity = quantity;
        this.totalAmount = totalAmount;
        this.saleDate = saleDate;
        this.productName = productName;
        this.customerName = customerName;
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

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
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

    public LocalDateTime getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(LocalDateTime saleDate) {
        this.saleDate = saleDate;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
}