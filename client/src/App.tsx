import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Sales from "@/pages/Sales";
import Inventory from "@/pages/Inventory";
import Customers from "@/pages/Customers";
import Financial from "@/pages/Financial";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Home} />
          <AppLayout>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/sales" component={Sales} />
            <Route path="/inventory" component={Inventory} />
            <Route path="/customers" component={Customers} />
            <Route path="/financial" component={Financial} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/settings" component={Settings} />
          </AppLayout>
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
