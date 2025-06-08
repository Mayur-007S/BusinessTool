package com.businessdashboard.service;

import com.businessdashboard.entity.Customer;
import com.businessdashboard.entity.Product;
import com.businessdashboard.entity.Sale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;

@Service
@Transactional
public class DataInitializationService {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ProductService productService;

    @Autowired
    private SaleService saleService;

    @PostConstruct
    public void initializeData() {
        // Only initialize if no data exists
        if (customerService.getCustomerCount() == 0) {
            createSampleData();
        }
    }

    private void createSampleData() {
        // Create sample customers
        Customer customer1 = new Customer("John Smith", "john@example.com", "555-0123", "123 Main St, City, State");
        Customer customer2 = new Customer("Jane Doe", "jane@example.com", "555-0456", "456 Oak Ave, City, State");
        Customer customer3 = new Customer("Bob Johnson", "bob@example.com", "555-0789", "789 Pine Rd, City, State");

        customer1 = customerService.createCustomer(customer1);
        customer2 = customerService.createCustomer(customer2);
        customer3 = customerService.createCustomer(customer3);

        // Create sample products
        Product product1 = new Product("Premium Software License", "Software", new BigDecimal("299.99"), 50, "Professional software license with premium support");
        Product product2 = new Product("Cloud Storage Subscription", "Services", new BigDecimal("49.99"), 100, "1TB cloud storage with advanced features");
        Product product3 = new Product("Hardware Kit", "Hardware", new BigDecimal("199.95"), 25, "Complete hardware kit for development");
        Product product4 = new Product("Training Course", "Education", new BigDecimal("149.99"), 75, "Comprehensive training course with certification");

        product1 = productService.createProduct(product1);
        product2 = productService.createProduct(product2);
        product3 = productService.createProduct(product3);
        product4 = productService.createProduct(product4);

        // Create sample sales
        Sale sale1 = new Sale(product1, customer1, 2, new BigDecimal("599.98"));
        Sale sale2 = new Sale(product2, customer2, 1, new BigDecimal("49.99"));
        Sale sale3 = new Sale(product3, customer1, 1, new BigDecimal("199.95"));
        Sale sale4 = new Sale(product4, customer3, 3, new BigDecimal("449.97"));
        Sale sale5 = new Sale(product2, customer3, 2, new BigDecimal("99.98"));
        Sale sale6 = new Sale(product1, customer2, 1, new BigDecimal("299.99"));

        saleService.createSale(sale1);
        saleService.createSale(sale2);
        saleService.createSale(sale3);
        saleService.createSale(sale4);
        saleService.createSale(sale5);
        saleService.createSale(sale6);

        System.out.println("Sample data initialized successfully!");
    }
}