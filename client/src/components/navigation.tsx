import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Heart, Bell, BookOpen, Home, BarChart, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Navigation() {
  const { data: profile } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <Button variant="ghost" className="flex items-center space-x-2 px-2 group">
            <Heart className="h-6 w-6 text-[#0ACCA8] animate-pulse-ring" />
            <span className="text-xl">
              <span className="font-medium" style={{ fontFamily: 'Poppins' }}>FlingPing</span>
              <span className="font-extralight" style={{ fontFamily: 'Poppins' }}>.co</span>
            </span>
          </Button>
        </Link>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-[#0ACCA8]/10 font-medium tracking-wide">
                  <Home className="mr-2 h-4 w-4 text-[#0ACCA8]" />
                  Stay Smart
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="hover:bg-[#FF695E]/10 font-medium tracking-wide">
                  <Bell className="mr-2 h-4 w-4 text-[#FF695E]" />
                  Stay Ahead
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/resources">
                <Button variant="ghost" size="sm" className="hover:bg-[#5EB4FF]/10 font-medium tracking-wide">
                  <BookOpen className="mr-2 h-4 w-4 text-[#5EB4FF]" />
                  Stay Informed
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/trends">
                <Button variant="ghost" size="sm" className="hover:bg-[#FFD166]/10 font-medium tracking-wide">
                  <TrendingUp className="mr-2 h-4 w-4 text-[#FFD166]" />
                  Community
                </Button>
              </Link>
            </NavigationMenuItem>
            {profile?.isAdmin && (
              <NavigationMenuItem>
                <Link href="/analytics">
                  <Button variant="ghost" size="sm" className="hover:bg-[#3C3C3C]/10 font-medium tracking-wide">
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