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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping
    public ResponseEntity<List<SaleWithDetailsDTO>> getAllSales() {
        List<Sale> sales = saleService.getAllSales();
        List<SaleWithDetailsDTO> salesWithDetails = sales.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(salesWithDetails);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleWithDetailsDTO> getSaleById(@PathVariable Long id) {
        Optional<Sale> sale = saleService.getSaleById(id);
        return sale.map(s -> ResponseEntity.ok(convertToDTO(s)))
                  .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Sale> createSale(@Valid @RequestBody Sale sale) {
        try {
            Sale createdSale = saleService.createSale(sale);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSale);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
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
        
        List<Sale> sales = saleService.getSalesByDateRange(startDate, endDate);
        List<SaleWithDetailsDTO> salesWithDetails = sales.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(salesWithDetails);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<SaleWithDetailsDTO>> getSalesByCustomer(@PathVariable Long customerId) {
        List<Sale> sales = saleService.getSalesByCustomer(customerId);
        List<SaleWithDetailsDTO> salesWithDetails = sales.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(salesWithDetails);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<SaleWithDetailsDTO>> getSalesByProduct(@PathVariable Long productId) {
        List<Sale> sales = saleService.getSalesByProduct(productId);
        List<SaleWithDetailsDTO> salesWithDetails = sales.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(salesWithDetails);
    }

    private SaleWithDetailsDTO convertToDTO(Sale sale) {
        return new SaleWithDetailsDTO(
            sale.getId(),
            sale.getProduct().getId(),
            sale.getProduct().getName(),
            sale.getCustomer().getId(),
            sale.getCustomer().getName(),
            sale.getQuantity(),
            sale.getTotalAmount(),
            sale.getSaleDate()
        );
    }
}