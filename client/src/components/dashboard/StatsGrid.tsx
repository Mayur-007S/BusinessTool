import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Package 
} from "lucide-react";
import type { DashboardStats } from "@shared/schema";

const statIcons = {
  revenue: DollarSign,
  customers: Users,
  sales: ShoppingCart,
  inventory: Package,
};

const statColors = {
  revenue: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  customers: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  sales: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  inventory: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
};

export default function StatsGrid() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-12 w-12 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Failed to load dashboard statistics</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statsData = [
    {
      id: "revenue",
      title: "Total Revenue",
      value: stats.totalRevenue,
      change: "+12.5%",
      icon: statIcons.revenue,
      color: statColors.revenue,
    },
    {
      id: "customers",
      title: "Active Customers",
      value: stats.activeCustomers.toString(),
      change: "+8.2%",
      icon: statIcons.customers,
      color: statColors.customers,
    },
    {
      id: "sales",
      title: "Sales This Month",
      value: stats.salesThisMonth.toString(),
      change: "+15.3%",
      icon: statIcons.sales,
      color: statColors.sales,
    },
    {
      id: "inventory",
      title: "Inventory Items",
      value: stats.inventoryItems.toString(),
      change: "+3.7%",
      icon: statIcons.inventory,
      color: statColors.inventory,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id} className="transition-all duration-300 hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
