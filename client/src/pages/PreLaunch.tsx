import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield, Heart, Bell } from "lucide-react";
import PrivacyBadge from "@/components/shared/PrivacyBadge";

export default function PreLaunch() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div>
          <h1 className="mt-6 text-4xl font-extrabold">
            FlingPing.co
            <span className="ml-2 inline-flex">
              <PrivacyBadge />
            </span>
          </h1>
          <p className="mt-2 text-xl text-muted-foreground">
            Anonymous STI notifications, made simple and stigma-free
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardContent className="pt-6">
              <Shield className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Private & Secure</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No personal information collected. Ever.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Bell className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Anonymous Notifications</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Notify partners discreetly with your Ping Pin
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Heart className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Stay Informed</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Get important health updates and resources
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Be a Founding Flinger
          </h2>
          <p className="text-muted-foreground mb-8">
            Join our waitlist for early access and exclusive perks
          </p>

          <form className="max-w-md mx-auto">
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button type="submit">
                Join Waitlist
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
