package com.businessdashboard.service;

import com.businessdashboard.dto.DashboardStatsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.util.Locale;

@Service
@Transactional(readOnly = true)
public class DashboardService {

    @Autowired
    private SaleService saleService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ProductService productService;

    public DashboardStatsDTO getDashboardStats(LocalDateTime startDate, LocalDateTime endDate) {
        // Get total revenue for the date range
        BigDecimal totalRevenue = saleService.getTotalRevenue(startDate, endDate);
        String formattedRevenue = formatCurrency(totalRevenue);

        // Get active customers count (total customers)
        long activeCustomers = customerService.getCustomerCount();

        // Get sales count for the date range
        long salesCount = saleService.getSalesCount(startDate, endDate);

        // Get total inventory items
        long inventoryItems = productService.getProductCount();

        return new DashboardStatsDTO(
            formattedRevenue,
            (int) activeCustomers,
            (int) salesCount,
            (int) inventoryItems
        );
    }

    private String formatCurrency(BigDecimal amount) {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(Locale.US);
        return formatter.format(amount);
    }
}