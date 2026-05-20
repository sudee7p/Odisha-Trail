import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Explore from "@/pages/Explore";
import MapPage from "@/pages/MapPage";
import Festivals from "@/pages/Festivals";
import Itinerary from "@/pages/Itinerary";
import Wishlist from "@/pages/Wishlist";
import Hotels from "@/pages/Hotels";
import Landing from "@/pages/Landing";
import { Sidebar, MobileNav } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { useAppState } from "@/lib/state";

const queryClient = new QueryClient();

function Shell() {
  const { user } = useAppState();
  if (!user) return <Landing />;
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/explore" component={Explore} />
            <Route path="/map" component={MapPage} />
            <Route path="/hotels" component={Hotels} />
            <Route path="/festivals" component={Festivals} />
            <Route path="/itinerary" component={Itinerary} />
            <Route path="/wishlist" component={Wishlist} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Shell />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
