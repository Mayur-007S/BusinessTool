package com.businessdashboard.service;

import com.businessdashboard.dao.ProductDAO;
import com.businessdashboard.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductDAO productDAO;

    public List<Product> getAllProducts() {
        return productDAO.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productDAO.findById(id);
    }

    public Product createProduct(Product product) {
        return productDAO.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = productDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        product.setName(productDetails.getName());
        product.setCategory(productDetails.getCategory());
        product.setPrice(productDetails.getPrice());
        product.setStock(productDetails.getStock());
        product.setDescription(productDetails.getDescription());

        return productDAO.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = productDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        productDAO.deleteById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return productDAO.findByCategory(category);
    }

    public List<Product> searchProducts(String name) {
        return productDAO.findByNameContaining(name);
    }

    public List<Product> getLowStockProducts(int threshold) {
        return productDAO.findLowStockProducts(threshold);
    }

    public long getProductCount() {
        return productDAO.count();
    }

    public void updateStock(Long productId, int quantity) {
        Product product = productDAO.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
        
        int newStock = product.getStock() - quantity;
        if (newStock < 0) {
            throw new RuntimeException("Insufficient stock for product: " + product.getName());
        }
        
        product.setStock(newStock);
        productDAO.save(product);
    }
}