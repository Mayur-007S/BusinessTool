import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { initSalesChart, initCustomerChart } from "@/lib/charts";
import { useTheme } from "@/hooks/useTheme";

export default function ChartsGrid() {
  const { isDarkMode } = useTheme();
  const salesChartRef = useRef<HTMLDivElement>(null);
  const customerChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let salesChart: any = null;
    let customerChart: any = null;

    const initCharts = async () => {
      if (salesChartRef.current) {
        salesChart = await initSalesChart(salesChartRef.current, isDarkMode);
      }
      if (customerChartRef.current) {
        customerChart = await initCustomerChart(customerChartRef.current, isDarkMode);
      }
    };

    initCharts();

    return () => {
      if (salesChart) salesChart.dispose();
      if (customerChart) customerChart.dispose();
    };
  }, [isDarkMode]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in">
      {/* Sales Chart */}
      <Card className="chart-container">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Sales Overview</CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="px-3 py-1 text-xs font-medium"
              >
                7D
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="px-3 py-1 text-xs font-medium"
              >
                30D
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="px-3 py-1 text-xs font-medium"
              >
                90D
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div ref={salesChartRef} className="w-full h-64" />
        </CardContent>
      </Card>

      {/* Customer Chart */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Customer Acquisition</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={customerChartRef} className="w-full h-64" />
        </CardContent>
      </Card>
    </div>
  );
}
