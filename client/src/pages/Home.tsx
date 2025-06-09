import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { BarChart3, Users, DollarSign, Package, Settings, TrendingUp } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.firstName || 'User'}!
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your business with our comprehensive dashboard
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/api/logout'}
          >
            Sign Out
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <CardTitle>Dashboard</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  View real-time business metrics and analytics
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/sales">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <CardTitle>Sales</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track sales transactions and revenue
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/inventory">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Package className="h-6 w-6 text-orange-600" />
                  <CardTitle>Inventory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage products and stock levels
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/customers">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  <CardTitle>Customers</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage customer relationships and data
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/analytics">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                  <CardTitle>Analytics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Deep insights and business intelligence
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/settings">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Settings className="h-6 w-6 text-gray-600" />
                  <CardTitle>Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Configure your account and preferences
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}