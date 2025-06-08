package com.businessdashboard;

import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.springframework.web.servlet.DispatcherServlet;

import com.businessdashboard.config.AppConfig;

public class Application {
    
    public static void main(String[] args) {
        try {
            System.out.println("Starting Business Dashboard Backend with MySQL...");
            
            // Create Spring web application context
            AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
            context.register(AppConfig.class);
            context.refresh();
            
            // Create Jetty server
            Server server = new Server(8080);
            
            // Configure servlet context
            ServletContextHandler contextHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
            contextHandler.setContextPath("/");
            
            // Create Spring MVC dispatcher servlet
            DispatcherServlet dispatcherServlet = new DispatcherServlet(context);
            ServletHolder servletHolder = new ServletHolder(dispatcherServlet);
            contextHandler.addServlet(servletHolder, "/*");
            
            server.setHandler(contextHandler);
            
            // Start server
            server.start();
            
            System.out.println("==============================================");
            System.out.println("Business Dashboard Backend Started Successfully!");
            System.out.println("==============================================");
            System.out.println("Server: http://localhost:8080");
            System.out.println("Database: MySQL - businessanaysisdb");
            System.out.println("");
            System.out.println("API Endpoints:");
            System.out.println("  GET  /api/customers");
            System.out.println("  POST /api/customers");
            System.out.println("  PUT  /api/customers/{id}");
            System.out.println("  DELETE /api/customers/{id}");
            System.out.println("");
            System.out.println("  GET  /api/products");
            System.out.println("  POST /api/products");
            System.out.println("  PUT  /api/products/{id}");
            System.out.println("  DELETE /api/products/{id}");
            System.out.println("");
            System.out.println("  GET  /api/sales");
            System.out.println("  POST /api/sales");
            System.out.println("  DELETE /api/sales/{id}");
            System.out.println("");
            System.out.println("  GET  /api/dashboard/stats");
            System.out.println("==============================================");
            System.out.println("Press Ctrl+C to stop the server");
            
            // Keep server running
            server.join();
            
        } catch (Exception e) {
            System.err.println("Failed to start application: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }
}