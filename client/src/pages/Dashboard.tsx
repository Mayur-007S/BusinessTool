import StatsGrid from "@/components/dashboard/StatsGrid";
import ChartsGrid from "@/components/dashboard/ChartsGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <div className="p-6">
      <StatsGrid />
      <ChartsGrid />
      <RecentActivity />
    </div>
  );
}
