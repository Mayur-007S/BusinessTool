import { useState } from "react";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Search, 
  Moon, 
  Sun, 
  Bell 
} from "lucide-react";

interface TopNavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/sales": "Sales",
  "/inventory": "Inventory",
  "/customers": "Customers",
  "/financial": "Financial Reports",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export default function TopNavigation({ isDarkMode, toggleDarkMode }: TopNavigationProps) {
  const [location] = useLocation();
  const [searchValue, setSearchValue] = useState("");
  
  const currentPageName = pageNames[location] || "Dashboard";
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", 
    day: "numeric"
  });

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden sm:block">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {currentPageName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentDate}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:block relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-64 pl-10 bg-white dark:bg-gray-700"
              />
            </div>
          </div>
          
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="p-2"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500">
              3
            </Badge>
          </Button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-white text-sm font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                John Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
