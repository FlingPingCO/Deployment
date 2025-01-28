import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertCircle, QrCode, Bluetooth, Clock, Activity, Users } from "lucide-react";
import PrivacyBadge from "@/components/shared/PrivacyBadge";
import { useQuery } from "@tanstack/react-query";
import ContactTrace from "@/components/visualizations/ContactTrace";

export default function Dashboard() {
  const { data: healthData } = useQuery<any>({
    queryKey: ["/api/health-status"],
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Health Dashboard</h1>
          <div className="mt-2">
            <PrivacyBadge />
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Activity className="h-4 w-4" />
          Update Status
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-500" />
              <span className="font-medium">Enhanced Privacy Active</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Your data is end-to-end encrypted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-blue-500" />
              <div>
                <span className="font-medium">Last Check-in</span>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
            </div>
            <Progress value={80} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <span className="font-medium">Active Connections</span>
                <p className="text-sm text-muted-foreground">3 in last 24h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Visualization */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactTrace />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Regular Check-ins</h3>
                <p className="text-sm text-muted-foreground">
                  Consider updating your status every 3-5 days for optimal tracking
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Network Activity</h3>
                <p className="text-sm text-muted-foreground">
                  Your recent connections are within normal range
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Privacy Tips</h3>
                <p className="text-sm text-muted-foreground">
                  Remember to review your privacy settings periodically
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Options */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline" className="justify-start">
              <Bluetooth className="mr-2 h-4 w-4 text-primary" />
              Enable Proximity Tracking
            </Button>
            <Button variant="outline" className="justify-start">
              <QrCode className="mr-2 h-4 w-4 text-primary" />
              Show My QR Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}