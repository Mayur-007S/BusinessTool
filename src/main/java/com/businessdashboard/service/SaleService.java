package com.businessdashboard.service;

import com.businessdashboard.dao.SaleDAO;
import com.businessdashboard.dto.SaleWithDetailsDTO;
import com.businessdashboard.entity.Sale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class SaleService {

    @Autowired
    private SaleDAO saleDAO;

    public List<Sale> getAllSales() {
        return saleDAO.findAll();
    }

    public List<SaleWithDetailsDTO> getAllSalesWithDetails() {
        return saleDAO.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<Sale> getSaleById(Long id) {
        return saleDAO.findById(id);
    }

    public Optional<SaleWithDetailsDTO> getSaleWithDetailsById(Long id) {
        return saleDAO.findById(id).map(this::convertToDTO);
    }

    public Sale createSale(Sale sale) {
        return saleDAO.save(sale);
    }

    public void deleteSale(Long id) {
        Sale sale = saleDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found with id: " + id));
        saleDAO.deleteById(id);
    }

    public List<SaleWithDetailsDTO> getSalesByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return saleDAO.findByDateRange(startDate, endDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SaleWithDetailsDTO> getSalesByCustomer(Long customerId) {
        return saleDAO.findByCustomerId(customerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SaleWithDetailsDTO> getSalesByProduct(Long productId) {
        return saleDAO.findByProductId(productId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BigDecimal getTotalRevenue(LocalDateTime startDate, LocalDateTime endDate) {
        return saleDAO.getTotalRevenueBetweenDates(startDate, endDate);
    }

    public long getSalesCount(LocalDateTime startDate, LocalDateTime endDate) {
        return saleDAO.countSalesBetweenDates(startDate, endDate);
    }

    private SaleWithDetailsDTO convertToDTO(Sale sale) {
        SaleWithDetailsDTO dto = new SaleWithDetailsDTO();
        dto.setId(sale.getId());
        dto.setProductId(sale.getProduct().getId());
        dto.setCustomerId(sale.getCustomer().getId());
        dto.setQuantity(sale.getQuantity());
        dto.setTotalAmount(sale.getTotalAmount());
        dto.setSaleDate(sale.getSaleDate());
        dto.setProductName(sale.getProduct().getName());
        dto.setCustomerName(sale.getCustomer().getName());
        return dto;
    }
}