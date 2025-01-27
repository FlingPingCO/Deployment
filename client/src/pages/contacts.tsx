import ContactTrace from "@/components/visualizations/ContactTrace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import PrivacyBadge from "@/components/shared/PrivacyBadge";

export default function Contacts() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Tracing</h1>
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
              Privacy Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This visualization shows anonymized proximity data. No personal information is collected or stored.
              Contact points are represented by their Ping Pins only, and data is automatically deleted after 14 days.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
