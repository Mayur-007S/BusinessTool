package com.businessdashboard.service;

import com.businessdashboard.dao.CustomerDAO;
import com.businessdashboard.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerService {

    @Autowired
    private CustomerDAO customerDAO;

    public List<Customer> getAllCustomers() {
        return customerDAO.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerDAO.findById(id);
    }

    public Customer createCustomer(Customer customer) {
        // Check if email already exists
        Optional<Customer> existingCustomer = customerDAO.findByEmail(customer.getEmail());
        if (existingCustomer.isPresent()) {
            throw new RuntimeException("Customer with email " + customer.getEmail() + " already exists");
        }
        return customerDAO.save(customer);
    }

    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer customer = customerDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        // Check if email is being changed and if new email already exists
        if (!customer.getEmail().equals(customerDetails.getEmail())) {
            Optional<Customer> existingCustomer = customerDAO.findByEmail(customerDetails.getEmail());
            if (existingCustomer.isPresent()) {
                throw new RuntimeException("Customer with email " + customerDetails.getEmail() + " already exists");
            }
        }

        customer.setName(customerDetails.getName());
        customer.setEmail(customerDetails.getEmail());
        customer.setPhone(customerDetails.getPhone());
        customer.setAddress(customerDetails.getAddress());

        return customerDAO.save(customer);
    }

    public void deleteCustomer(Long id) {
        Customer customer = customerDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
        customerDAO.deleteById(id);
    }

    public Optional<Customer> findByEmail(String email) {
        return customerDAO.findByEmail(email);
    }

    public List<Customer> searchCustomers(String name) {
        return customerDAO.findByNameContaining(name);
    }

    public long getCustomerCount() {
        return customerDAO.count();
    }
}