package com.businessdashboard.dao;

import com.businessdashboard.entity.Customer;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class CustomerDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public List<Customer> findAll() {
        Session session = sessionFactory.getCurrentSession();
        Query<Customer> query = session.createQuery("FROM Customer", Customer.class);
        return query.getResultList();
    }

    public Optional<Customer> findById(Long id) {
        Session session = sessionFactory.getCurrentSession();
        Customer customer = session.get(Customer.class, id);
        return Optional.ofNullable(customer);
    }

    public Customer save(Customer customer) {
        Session session = sessionFactory.getCurrentSession();
        if (customer.getId() == null) {
            session.persist(customer);
        } else {
            session.merge(customer);
        }
        return customer;
    }

    public void deleteById(Long id) {
        Session session = sessionFactory.getCurrentSession();
        Customer customer = session.get(Customer.class, id);
        if (customer != null) {
            session.remove(customer);
        }
    }

    public Optional<Customer> findByEmail(String email) {
        Session session = sessionFactory.getCurrentSession();
        Query<Customer> query = session.createQuery("FROM Customer c WHERE c.email = :email", Customer.class);
        query.setParameter("email", email);
        List<Customer> customers = query.getResultList();
        return customers.isEmpty() ? Optional.empty() : Optional.of(customers.get(0));
    }

    public List<Customer> findByNameContaining(String name) {
        Session session = sessionFactory.getCurrentSession();
        Query<Customer> query = session.createQuery("FROM Customer c WHERE c.name LIKE :name", Customer.class);
        query.setParameter("name", "%" + name + "%");
        return query.getResultList();
    }

    public long count() {
        Session session = sessionFactory.getCurrentSession();
        Query<Long> query = session.createQuery("SELECT COUNT(c) FROM Customer c", Long.class);
        return query.getSingleResult();
    }
}