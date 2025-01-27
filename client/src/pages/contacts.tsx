import ContactTrace from "@/components/visualizations/ContactTrace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";
import PrivacyBadge from "@/components/shared/PrivacyBadge";

export default function Contacts() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact History</h1>
          <div className="mt-2">
            <PrivacyBadge />
          </div>
        </div>
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Why Track Your Contacts?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            This visualization helps you:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <span className="font-medium">Track Potential Exposures:</span> If you receive a notification, 
              you can see when and for how long you were in contact with others.
            </li>
            <li>
              <span className="font-medium">Make Informed Decisions:</span> Understanding your contact patterns 
              helps you make better decisions about testing and prevention.
            </li>
            <li>
              <span className="font-medium">Protect Others:</span> If you need to notify contacts, this helps you 
              remember your recent interactions.
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <ContactTrace />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Privacy Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This visualization shows your anonymized proximity history with other FlingPing users:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
              <li>Only shows the last 24 hours of contact data</li>
              <li>No personal information is collected or stored</li>
              <li>Contact points are represented by Ping Pins only</li>
              <li>Data is automatically deleted after 14 days</li>
              <li>You can delete your contact history at any time</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}