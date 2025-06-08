import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  PieChart, 
  Settings 
} from "lucide-react";

const navigationItems = [
  { id: "dashboard", name: "Dashboard", icon: TrendingUp, path: "/" },
  { id: "sales", name: "Sales", icon: ShoppingCart, path: "/sales" },
  { id: "inventory", name: "Inventory", icon: Package, path: "/inventory" },
  { id: "customers", name: "Customers", icon: Users, path: "/customers" },
  { id: "financial", name: "Financial Reports", icon: BarChart3, path: "/financial" },
  { id: "analytics", name: "Analytics", icon: PieChart, path: "/analytics" },
  { id: "settings", name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "w-64 bg-white dark:bg-gray-800 shadow-lg flex-shrink-0 transition-all duration-300 z-50",
        "hidden lg:block",
        isMobileMenuOpen && "fixed inset-y-0 left-0 lg:relative"
      )}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                BusinessPro
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Business Management
              </p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path || 
                (item.path === "/" && location === "/dashboard");
              
              return (
                <li key={item.id}>
                  <Link href={item.path}>
                    <a className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "text-primary bg-primary/10 dark:bg-primary/20"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                    )}>
                      <Icon className={cn(
                        "mr-3 h-5 w-5",
                        isActive 
                          ? "text-primary" 
                          : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                      )} />
                      {item.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
