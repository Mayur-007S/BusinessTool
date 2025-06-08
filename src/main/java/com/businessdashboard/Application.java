package com.businessdashboard;

import com.businessdashboard.config.AppConfig;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class Application {
    
    private static final int PORT = 8080;

    public static void main(String[] args) {
        try {
            // Create Spring context
            AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
            context.register(AppConfig.class);

            // Create Jetty server
            Server server = new Server(PORT);

            // Create servlet context handler
            ServletContextHandler handler = new ServletContextHandler();
            handler.setContextPath("/");

            // Add Spring context to servlet context
            handler.addEventListener(new ContextLoaderListener(context));
            handler.addServlet(new ServletHolder(new DispatcherServlet(context)), "/*");

            server.setHandler(handler);

            // Start server
            server.start();
            System.out.println("Server started on port " + PORT);
            System.out.println("Application available at: http://localhost:" + PORT);
            
            server.join();

        } catch (Exception e) {
            System.err.println("Failed to start server: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }
}