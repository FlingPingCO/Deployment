import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Heart, Bell, BookOpen, Home, BarChart, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Navigation() {
  // Check if user is admin
  const { data: profile } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/">
          <a className="flex items-center space-x-2 font-bold">
            <Heart className="h-6 w-6 text-primary" />
            <span>FlingPing.co</span>
          </a>
        </Link>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/notifications">
                <Button variant="ghost" size="sm">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/resources">
                <Button variant="ghost" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Resources
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/trends">
                <Button variant="ghost" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Trends
                </Button>
              </Link>
            </NavigationMenuItem>
            {profile?.isAdmin && (
              <NavigationMenuItem>
                <Link href="/analytics">
                  <Button variant="ghost" size="sm">
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