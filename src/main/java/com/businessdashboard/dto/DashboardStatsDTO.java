package com.businessdashboard.dto;

public class DashboardStatsDTO {
    private String totalRevenue;
    private int activeCustomers;
    private int salesThisMonth;
    private int inventoryItems;

    public DashboardStatsDTO() {}

    public DashboardStatsDTO(String totalRevenue, int activeCustomers, int salesThisMonth, int inventoryItems) {
        this.totalRevenue = totalRevenue;
        this.activeCustomers = activeCustomers;
        this.salesThisMonth = salesThisMonth;
        this.inventoryItems = inventoryItems;
    }

    public String getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(String totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public int getActiveCustomers() {
        return activeCustomers;
    }

    public void setActiveCustomers(int activeCustomers) {
        this.activeCustomers = activeCustomers;
    }

    public int getSalesThisMonth() {
        return salesThisMonth;
    }

    public void setSalesThisMonth(int salesThisMonth) {
        this.salesThisMonth = salesThisMonth;
    }

    public int getInventoryItems() {
        return inventoryItems;
    }

    public void setInventoryItems(int inventoryItems) {
        this.inventoryItems = inventoryItems;
    }
}