import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNavigation from "./TopNavigation";
import { useTheme } from "@/hooks/useTheme";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex overflow-hidden transition-colors duration-300 ${
      isDarkMode ? "dark" : ""
    }`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
