import ContactTrace from "@/components/visualizations/ContactTrace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertCircle } from "lucide-react";
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

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Reading Your Contact History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ContactTrace />
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
              The visualization above shows your recent interactions with other FlingPing users 
              in a way that protects everyone's privacy while helping you stay informed:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <span className="font-medium">Time and Distance:</span> See when you were near 
                other users and how close the contact was.
              </li>
              <li>
                <span className="font-medium">Duration:</span> Larger circles show longer 
                periods of proximity, which can be important for exposure risk assessment.
              </li>
              <li>
                <span className="font-medium">Anonymous IDs:</span> Each contact is identified 
                only by their Ping Pin, maintaining complete privacy.
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