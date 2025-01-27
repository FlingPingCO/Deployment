import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Notifications from "@/pages/notifications";
import Resources from "@/pages/resources";
import PreLaunch from "@/pages/PreLaunch";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/resources" component={Resources} />
          <Route path="/connect" component={() => <div>Coming Soon</div>} />
          <Route path="/" component={PreLaunch} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;