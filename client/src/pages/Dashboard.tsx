import { useState } from "react";
import StatsGrid from "@/components/dashboard/StatsGrid";
import ChartsGrid from "@/components/dashboard/ChartsGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DateRangeFilter, { type DateRange, formatDateRange } from "@/components/dashboard/DateRangeFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>("month");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview for {formatDateRange(selectedDateRange)}
          </p>
        </div>
        <Card className="w-fit">
          <CardContent className="p-4">
            <DateRangeFilter 
              value={selectedDateRange} 
              onChange={setSelectedDateRange} 
            />
          </CardContent>
        </Card>
      </div>
      
      <StatsGrid dateRange={selectedDateRange} />
      <ChartsGrid />
      <RecentActivity dateRange={selectedDateRange} />
    </div>
  );
}
