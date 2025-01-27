import ContactTrace from "@/components/visualizations/ContactTrace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertCircle } from "lucide-react";
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
              <AlertCircle className="h-5 w-5 text-primary" />
              Reading Your Contact History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Each dot shows a past interaction with another FlingPing user (shown by their Ping Pin)</li>
                  <li>Larger circles mean you spent more time near that person</li>
                  <li>Click any point to see when and how long the contact lasted</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-sm">The chart above displays your proximity history with other FlingPing users:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>
                    <span className="font-medium">Timeline:</span> The horizontal axis shows when 
                    contacts occurred over the last 24 hours
                  </li>
                  <li>
                    <span className="font-medium">Distance:</span> The vertical axis shows how close 
                    you were to each contact (in meters)
                  </li>
                  <li>
                    <span className="font-medium">Duration:</span> The size of each dot indicates 
                    how long the contact lasted
                  </li>
                  <li>
                    <span className="font-medium">Identity:</span> Each contact is shown by their 
                    anonymous Ping Pin - click any dot to see details
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Understanding Your Contact History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Your contact history helps you monitor your potential exposure risk:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <span className="font-medium">Proximity Patterns:</span> See when and how often 
                you're in close contact with others
              </li>
              <li>
                <span className="font-medium">Risk Assessment:</span> Longer contact duration 
                and closer proximity may indicate higher exposure risk
              </li>
              <li>
                <span className="font-medium">Contact Tracing:</span> If you receive a notification, 
                you can identify when the potential exposure occurred
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Why This Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Understanding your contact history is a crucial part of managing your sexual health:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <span className="font-medium">Early Awareness:</span> If you receive a notification, 
                you can quickly identify when the potential exposure might have occurred.
              </li>
              <li>
                <span className="font-medium">Informed Testing:</span> Understanding your contact 
                patterns helps you make better decisions about when to get tested.
              </li>
              <li>
                <span className="font-medium">Responsible Communication:</span> If you need to 
                notify others, this history helps you remember relevant contacts while maintaining privacy.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Privacy Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your privacy is our top priority. Here's how we protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
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