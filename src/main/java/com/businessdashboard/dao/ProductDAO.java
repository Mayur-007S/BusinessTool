package com.businessdashboard.dao;

import com.businessdashboard.entity.Product;
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
public class ProductDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public List<Product> findAll() {
        Session session = sessionFactory.getCurrentSession();
        Query<Product> query = session.createQuery("FROM Product", Product.class);
        return query.getResultList();
    }

    public Optional<Product> findById(Long id) {
        Session session = sessionFactory.getCurrentSession();
        Product product = session.get(Product.class, id);
        return Optional.ofNullable(product);
    }

    public Product save(Product product) {
        Session session = sessionFactory.getCurrentSession();
        if (product.getId() == null) {
            session.persist(product);
        } else {
            session.merge(product);
        }
        return product;
    }

    public void deleteById(Long id) {
        Session session = sessionFactory.getCurrentSession();
        Product product = session.get(Product.class, id);
        if (product != null) {
            session.remove(product);
        }
    }

    public List<Product> findByCategory(String category) {
        Session session = sessionFactory.getCurrentSession();
        Query<Product> query = session.createQuery("FROM Product p WHERE p.category = :category", Product.class);
        query.setParameter("category", category);
        return query.getResultList();
    }

    public List<Product> findByNameContaining(String name) {
        Session session = sessionFactory.getCurrentSession();
        Query<Product> query = session.createQuery("FROM Product p WHERE p.name LIKE :name", Product.class);
        query.setParameter("name", "%" + name + "%");
        return query.getResultList();
    }

    public List<Product> findLowStockProducts(int threshold) {
        Session session = sessionFactory.getCurrentSession();
        Query<Product> query = session.createQuery("FROM Product p WHERE p.stock <= :threshold", Product.class);
        query.setParameter("threshold", threshold);
        return query.getResultList();
    }

    public long count() {
        Session session = sessionFactory.getCurrentSession();
        Query<Long> query = session.createQuery("SELECT COUNT(p) FROM Product p", Long.class);
        return query.getSingleResult();
    }
}