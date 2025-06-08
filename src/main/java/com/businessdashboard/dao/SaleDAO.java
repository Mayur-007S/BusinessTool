package com.businessdashboard.dao;

import com.businessdashboard.entity.Sale;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class SaleDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public List<Sale> findAll() {
        Session session = sessionFactory.getCurrentSession();
        Query<Sale> query = session.createQuery("FROM Sale s JOIN FETCH s.product JOIN FETCH s.customer", Sale.class);
        return query.getResultList();
    }

    public Optional<Sale> findById(Long id) {
        Session session = sessionFactory.getCurrentSession();
        Query<Sale> query = session.createQuery("FROM Sale s JOIN FETCH s.product JOIN FETCH s.customer WHERE s.id = :id", Sale.class);
        query.setParameter("id", id);
        List<Sale> sales = query.getResultList();
        return sales.isEmpty() ? Optional.empty() : Optional.of(sales.get(0));
    }

    public Sale save(Sale sale) {
        Session session = sessionFactory.getCurrentSession();
        if (sale.getId() == null) {
            session.persist(sale);
        } else {
            session.merge(sale);
        }
        return sale;
    }

    public void deleteById(Long id) {
        Session session = sessionFactory.getCurrentSession();
        Sale sale = session.get(Sale.class, id);
        if (sale != null) {
            session.remove(sale);
        }
    }

    public List<Sale> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        Session session = sessionFactory.getCurrentSession();
        Query<Sale> query = session.createQuery(
            "FROM Sale s JOIN FETCH s.product JOIN FETCH s.customer WHERE s.saleDate BETWEEN :startDate AND :endDate ORDER BY s.saleDate DESC", 
            Sale.class
        );
        query.setParameter("startDate", startDate);
        query.setParameter("endDate", endDate);
        return query.getResultList();
    }

    public List<Sale> findByCustomerId(Long customerId) {
        Session session = sessionFactory.getCurrentSession();
        Query<Sale> query = session.createQuery("FROM Sale s JOIN FETCH s.product WHERE s.customer.id = :customerId", Sale.class);
        query.setParameter("customerId", customerId);
        return query.getResultList();
    }

    public List<Sale> findByProductId(Long productId) {
        Session session = sessionFactory.getCurrentSession();
        Query<Sale> query = session.createQuery("FROM Sale s JOIN FETCH s.customer WHERE s.product.id = :productId", Sale.class);
        query.setParameter("productId", productId);
        return query.getResultList();
    }

    public BigDecimal getTotalRevenueByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        Session session = sessionFactory.getCurrentSession();
        Query<BigDecimal> query = session.createQuery(
            "SELECT COALESCE(SUM(s.totalAmount), 0) FROM Sale s WHERE s.saleDate BETWEEN :startDate AND :endDate", 
            BigDecimal.class
        );
        query.setParameter("startDate", startDate);
        query.setParameter("endDate", endDate);
        return query.getSingleResult();
    }

    public long countByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        Session session = sessionFactory.getCurrentSession();
        Query<Long> query = session.createQuery("SELECT COUNT(s) FROM Sale s WHERE s.saleDate BETWEEN :startDate AND :endDate", Long.class);
        query.setParameter("startDate", startDate);
        query.setParameter("endDate", endDate);
        return query.getSingleResult();
    }

    public long count() {
        Session session = sessionFactory.getCurrentSession();
        Query<Long> query = session.createQuery("SELECT COUNT(s) FROM Sale s", Long.class);
        return query.getSingleResult();
    }
}