import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import AddSaleDialog from "@/components/modals/AddSaleDialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { SaleWithDetails } from "@shared/schema";

export default function Sales() {
  const [showAddSaleDialog, setShowAddSaleDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: sales, isLoading } = useQuery<SaleWithDetails[]>({
    queryKey: ["/api/sales"],
  });

  const deleteSaleMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/sales/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sales"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      toast({
        title: "Success",
        description: "Sale deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete sale",
        variant: "destructive",
      });
    },
  });

  const handleDeleteSale = (id: number) => {
    if (confirm("Are you sure you want to delete this sale?")) {
      deleteSaleMutation.mutate(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sales Management</h2>
        <Button onClick={() => setShowAddSaleDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Sale
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Sales</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          ) : !sales || sales.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No sales found</p>
              <Button 
                onClick={() => setShowAddSaleDialog(true)}
                className="mt-4"
              >
                Add your first sale
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-mono">
                        #{sale.id.toString().padStart(3, "0")}
                      </TableCell>
                      <TableCell className="font-medium">
                        {sale.productName}
                      </TableCell>
                      <TableCell>{sale.customerName}</TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>${parseFloat(sale.price).toFixed(2)}</TableCell>
                      <TableCell className="font-medium">
                        ${parseFloat(sale.total).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {new Date(sale.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteSale(sale.id)}
                            disabled={deleteSaleMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AddSaleDialog 
        open={showAddSaleDialog} 
        onOpenChange={setShowAddSaleDialog} 
      />
    </div>
  );
}
