import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Medal, Shield, AlertCircle, QrCode, Bluetooth } from "lucide-react";
import PrivacyBadge from "@/components/shared/PrivacyBadge";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome to FlingPing</h1>
          <div className="mt-2">
            <PrivacyBadge />
          </div>
        </div>
        <Button variant="secondary">
          Update Status
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-500" />
              <span className="font-medium">All Clear</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: 2 days ago
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connection Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Bluetooth className="mr-2 h-4 w-4 text-primary" />
                Connect via Bluetooth
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <QrCode className="mr-2 h-4 w-4 text-primary" />
                Scan QR Code
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-yellow-500" />
              <span className="font-medium">2 New Updates</span>
            </div>
            <div className="mt-4">
              <Progress value={40} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                40% of notifications read
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Ping Pin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-6 rounded-lg text-center space-y-4">
            <span className="text-3xl font-mono tracking-wider">PP-1234-5678</span>
            <p className="text-sm text-muted-foreground">
              Share this PIN with partners to stay connected anonymously.
              Your privacy is our priority - no personal information is stored.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}