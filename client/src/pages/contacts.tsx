import ContactTrace from "@/components/visualizations/ContactTrace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import PrivacyBadge from "@/components/shared/PrivacyBadge";

export default function Contacts() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">24-Hour Contact History</h1>
          <div className="mt-2">
            <PrivacyBadge />
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <ContactTrace />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Privacy Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your privacy is our top priority. Here's how we protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground mt-4">
              <li>Only the last 24 hours of contact data is shown</li>
              <li>No names, phone numbers, or personal details are ever collected</li>
              <li>Contacts are identified only by anonymous Ping Pins</li>
              <li>All data is automatically deleted after 14 days</li>
              <li>You can delete your contact history at any time</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}