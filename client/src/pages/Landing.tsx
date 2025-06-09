import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, DollarSign, Package } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Business Dashboard
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Comprehensive business management with sales tracking, inventory control, 
          customer management, and financial analytics.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-8 w-8 mx-auto text-blue-600" />
              <CardTitle className="text-lg">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Real-time business insights and reporting
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <DollarSign className="h-8 w-8 mx-auto text-green-600" />
              <CardTitle className="text-lg">Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track and manage all sales transactions
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Package className="h-8 w-8 mx-auto text-orange-600" />
              <CardTitle className="text-lg">Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Manage products and stock levels
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 mx-auto text-purple-600" />
              <CardTitle className="text-lg">Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Customer relationship management
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        
        <Button 
          size="lg" 
          className="text-lg px-8 py-3"
          onClick={() => window.location.href = '/api/login'}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}