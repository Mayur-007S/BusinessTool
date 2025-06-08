import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, FileDown, BarChart3, UserPlus } from "lucide-react";
import AddSaleDialog from "@/components/modals/AddSaleDialog";
import AddCustomerDialog from "@/components/modals/AddCustomerDialog";
import type { SaleWithDetails } from "@shared/schema";

export default function RecentActivity() {
  const [showAddSaleDialog, setShowAddSaleDialog] = useState(false);
  const [showAddCustomerDialog, setShowAddCustomerDialog] = useState(false);

  const { data: sales, isLoading } = useQuery<SaleWithDetails[]>({
    queryKey: ["/api/sales"],
  });

  const recentSales = sales?.slice(0, 5) || [];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
        {/* Recent Sales Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                ))}
              </div>
            ) : recentSales.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recent sales found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">
                          {sale.productName}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {sale.customerName}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${parseFloat(sale.total).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(sale.date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                onClick={() => setShowAddSaleDialog(true)}
                className="w-full flex items-center justify-start"
              >
                <Plus className="mr-3 h-4 w-4" />
                Add New Sale
              </Button>
              
              <Button 
                variant="secondary"
                onClick={() => setShowAddCustomerDialog(true)}
                className="w-full flex items-center justify-start"
              >
                <UserPlus className="mr-3 h-4 w-4" />
                Add Customer
              </Button>
              
              <Button 
                variant="outline"
                className="w-full flex items-center justify-start"
              >
                <FileDown className="mr-3 h-4 w-4" />
                Export Report
              </Button>
              
              <Button 
                variant="outline"
                className="w-full flex items-center justify-start"
              >
                <BarChart3 className="mr-3 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddSaleDialog 
        open={showAddSaleDialog} 
        onOpenChange={setShowAddSaleDialog} 
      />
      <AddCustomerDialog 
        open={showAddCustomerDialog} 
        onOpenChange={setShowAddCustomerDialog} 
      />
    </>
  );
}
