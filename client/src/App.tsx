import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import FoundingFlinger from "@/pages/founding-flinger";
import Dashboard from "@/pages/dashboard";
import Notifications from "@/pages/notifications";
import Resources from "@/pages/resources";
import Analytics from "@/pages/analytics";
import Trends from "@/pages/trends";

function Router() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/founding-flinger" component={FoundingFlinger} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/resources" component={Resources} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/trends" component={Trends} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen relative">
        <div className="fixed inset-0 bg-[#F4E9D9] opacity-30 pointer-events-none" />
        <div className="relative z-10">
          <Router />
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;