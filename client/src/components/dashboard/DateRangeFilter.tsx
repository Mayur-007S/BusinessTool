import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown } from "lucide-react";

export type DateRange = "today" | "week" | "month" | "quarter" | "year";

interface DateRangeFilterProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const dateRangeOptions = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "quarter", label: "This Quarter" },
  { value: "year", label: "This Year" },
] as const;

export default function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = dateRangeOptions.find(option => option.value === value);

  return (
    <div className="flex items-center space-x-2">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select period">
            {selectedOption?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {dateRangeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Utility functions for date calculations
export function getDateRangeFilter(range: DateRange): { start: Date; end: Date } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (range) {
    case "today":
      return {
        start: today,
        end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
      };
    
    case "week":
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return { start: startOfWeek, end: endOfWeek };
    
    case "month":
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);
      return { start: startOfMonth, end: endOfMonth };
    
    case "quarter":
      const currentQuarter = Math.floor(today.getMonth() / 3);
      const startOfQuarter = new Date(today.getFullYear(), currentQuarter * 3, 1);
      const endOfQuarter = new Date(today.getFullYear(), (currentQuarter + 1) * 3, 0);
      endOfQuarter.setHours(23, 59, 59, 999);
      return { start: startOfQuarter, end: endOfQuarter };
    
    case "year":
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear(), 11, 31);
      endOfYear.setHours(23, 59, 59, 999);
      return { start: startOfYear, end: endOfYear };
    
    default:
      const defaultStartOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const defaultEndOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      defaultEndOfMonth.setHours(23, 59, 59, 999);
      return { start: defaultStartOfMonth, end: defaultEndOfMonth };
  }
}

export function formatDateRange(range: DateRange): string {
  const { start, end } = getDateRangeFilter(range);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  switch (range) {
    case "today":
      return formatDate(start);
    case "week":
      return `${formatDate(start)} - ${formatDate(end)}`;
    case "month":
      return start.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    case "quarter":
      const quarter = Math.floor(start.getMonth() / 3) + 1;
      return `Q${quarter} ${start.getFullYear()}`;
    case "year":
      return start.getFullYear().toString();
    default:
      return "";
  }
}