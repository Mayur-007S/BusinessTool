package com.businessdashboard.service;

import com.businessdashboard.dao.SaleDAO;
import com.businessdashboard.entity.Sale;
import com.businessdashboard.entity.Product;
import com.businessdashboard.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SaleService {

    @Autowired
    private SaleDAO saleDAO;

    @Autowired
    private ProductService productService;

    @Autowired
    private CustomerService customerService;

    public List<Sale> getAllSales() {
        return saleDAO.findAll();
    }

    public Optional<Sale> getSaleById(Long id) {
        return saleDAO.findById(id);
    }

    public Sale createSale(Sale sale) {
        // Validate product and customer exist
        Product product = productService.getProductById(sale.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + sale.getProduct().getId()));
        
        Customer customer = customerService.getCustomerById(sale.getCustomer().getId())
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + sale.getCustomer().getId()));

        // Check stock availability
        if (product.getStock() < sale.getQuantity()) {
            throw new RuntimeException("Insufficient stock for product: " + product.getName());
        }

        // Set the actual entities
        sale.setProduct(product);
        sale.setCustomer(customer);

        // Calculate total amount if not provided
        if (sale.getTotalAmount() == null) {
            BigDecimal totalAmount = product.getPrice().multiply(BigDecimal.valueOf(sale.getQuantity()));
            sale.setTotalAmount(totalAmount);
        }

        // Update product stock
        productService.updateStock(product.getId(), sale.getQuantity());

        return saleDAO.save(sale);
    }

    public void deleteSale(Long id) {
        Sale sale = saleDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found with id: " + id));
        
        // Restore product stock
        Product product = sale.getProduct();
        product.setStock(product.getStock() + sale.getQuantity());
        productService.updateProduct(product.getId(), product);
        
        saleDAO.deleteById(id);
    }

    public List<Sale> getSalesByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return saleDAO.findByDateRange(startDate, endDate);
    }

    public List<Sale> getSalesByCustomer(Long customerId) {
        return saleDAO.findByCustomerId(customerId);
    }

    public List<Sale> getSalesByProduct(Long productId) {
        return saleDAO.findByProductId(productId);
    }

    public BigDecimal getTotalRevenue(LocalDateTime startDate, LocalDateTime endDate) {
        return saleDAO.getTotalRevenueByDateRange(startDate, endDate);
    }

    public long getSalesCount(LocalDateTime startDate, LocalDateTime endDate) {
        return saleDAO.countByDateRange(startDate, endDate);
    }

    public long getTotalSalesCount() {
        return saleDAO.count();
    }
}