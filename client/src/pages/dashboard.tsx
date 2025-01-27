import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Medal, Shield, AlertCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Update Status</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-500" />
              <span>All Clear</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: 2 days ago
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Medal className="h-8 w-8 text-primary" />
              <span>3 Badges Earned</span>
            </div>
            <Progress value={60} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-yellow-500" />
              <span>2 New Updates</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Ping Pin (PP)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg text-center">
            <span className="text-2xl font-mono">PP-1234-5678</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Share this PIN with partners to stay connected anonymously
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
