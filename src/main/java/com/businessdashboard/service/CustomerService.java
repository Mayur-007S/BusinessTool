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
        return customerDAO.save(customer);
    }

    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer customer = customerDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

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

    public long getCustomerCount() {
        return customerDAO.count();
    }
}