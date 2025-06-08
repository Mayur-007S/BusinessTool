package com.businessdashboard.controller;

import com.businessdashboard.dto.SaleWithDetailsDTO;
import com.businessdashboard.entity.Sale;
import com.businessdashboard.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping
    public ResponseEntity<List<SaleWithDetailsDTO>> getAllSales() {
        List<SaleWithDetailsDTO> sales = saleService.getAllSalesWithDetails();
        return ResponseEntity.ok(sales);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleWithDetailsDTO> getSaleById(@PathVariable Long id) {
        Optional<SaleWithDetailsDTO> sale = saleService.getSaleWithDetailsById(id);
        return sale.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Sale> createSale(@Valid @RequestBody Sale sale) {
        try {
            Sale createdSale = saleService.createSale(sale);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSale);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long id) {
        try {
            saleService.deleteSale(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<SaleWithDetailsDTO>> getSalesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        List<SaleWithDetailsDTO> sales = saleService.getSalesByDateRange(startDate, endDate);
        return ResponseEntity.ok(sales);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<SaleWithDetailsDTO>> getSalesByCustomer(@PathVariable Long customerId) {
        List<SaleWithDetailsDTO> sales = saleService.getSalesByCustomer(customerId);
        return ResponseEntity.ok(sales);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<SaleWithDetailsDTO>> getSalesByProduct(@PathVariable Long productId) {
        List<SaleWithDetailsDTO> sales = saleService.getSalesByProduct(productId);
        return ResponseEntity.ok(sales);
    }
}