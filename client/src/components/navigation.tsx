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
            <Heart className="h-6 w-6 text-primary animate-pulse-ring" />
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              FlingPing.co
            </span>
          </Button>
        </Link>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="font-bold tracking-wide hover:bg-primary/10">
                  <Home className="mr-2 h-4 w-4" />
                  Stay Smart
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="font-bold tracking-wide hover:bg-primary/10">
                  <Bell className="mr-2 h-4 w-4" />
                  Stay Ahead
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/resources">
                <Button variant="ghost" size="sm" className="font-bold tracking-wide hover:bg-primary/10">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Stay Informed
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/trends">
                <Button variant="ghost" size="sm" className="font-bold tracking-wide hover:bg-primary/10">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Community
                </Button>
              </Link>
            </NavigationMenuItem>
            {profile?.isAdmin && (
              <NavigationMenuItem>
                <Link href="/analytics">
                  <Button variant="ghost" size="sm" className="font-bold tracking-wide hover:bg-primary/10">
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