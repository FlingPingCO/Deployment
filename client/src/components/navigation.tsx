import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Heart, Bell, BookOpen, Home, TrendingUp, BarChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Navigation() {
  const { data: profile } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  return (
    <header className="sticky top-0 z-50 border-b bg-[#3C3C3C]">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <Button variant="ghost" className="flex items-center space-x-2 px-2 group">
            <Heart className="h-6 w-6 text-[#0ACCA8]" />
            <span className="text-xl">
              <span className="font-medium text-[#0ACCA8]" style={{ fontFamily: 'Poppins' }}>FlingPing</span>
              <span className="font-extralight text-[#FF695E]" style={{ fontFamily: 'Poppins' }}>.co</span>
            </span>
          </Button>
        </Link>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#0ACCA8]/10">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#FF695E]/10">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/resources">
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#5EB4FF]/10">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Resources
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/trends">
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#FFD166]/10">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Trends
                </Button>
              </Link>
            </NavigationMenuItem>
            {profile?.isAdmin && (
              <NavigationMenuItem>
                <Link href="/analytics">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}