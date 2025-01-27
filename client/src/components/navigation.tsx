import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Heart, Bell, BookOpen, Home, Bluetooth } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Navigation() {
  const { data: profile } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  return (
    <header className="sticky top-0 z-50 border-b bg-[#3C3C3C] shadow-md">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <Button variant="ghost" className="flex items-center space-x-2 px-2 hover:bg-transparent">
            <Heart className="h-6 w-6 text-[#0ACCA8]" />
            <span className="text-xl flex items-center">
              <span className="logo-text logo-main">FlingPing</span>
              <span className="logo-text logo-suffix">.co</span>
            </span>
          </Button>
        </Link>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#0ACCA8]/10 transition-colors duration-200">
                  <Home className="mr-2 h-4 w-4 text-[#0ACCA8]" />
                  Dashboard
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#FF695E]/10 transition-colors duration-200">
                  <Bell className="mr-2 h-4 w-4 text-[#FF695E]" />
                  Notifications
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/resources">
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#5EB4FF]/10 transition-colors duration-200">
                  <BookOpen className="mr-2 h-4 w-4 text-[#5EB4FF]" />
                  Resources
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/connect">
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#FFD166]/10 transition-colors duration-200">
                  <Bluetooth className="mr-2 h-4 w-4 text-[#FFD166]" />
                  Connect
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}