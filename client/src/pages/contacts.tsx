import ContactTrace from "@/components/visualizations/ContactTrace";
import { Card, CardContent } from "@/components/ui/card";

export default function Contacts() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-2xl font-bold">24-Hour Contact History</h1>

      <ContactTrace />

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Reading Your Contact History:</h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Each dot shows a past interaction with another FlingPing user (shown by their Ping Pin)</li>
            <li>Larger circles mean you spent more time near that person</li>
            <li>Click any point to see when and how long the contact lasted</li>
          </ul>

          <div className="mt-6">
            <p>The chart above displays your proximity history with other FlingPing users:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Timeline:</strong> The horizontal axis shows when contacts occurred over the last 24 hours</li>
              <li><strong>Distance:</strong> The vertical axis shows how close you were to each contact (in meters)</li>
              <li><strong>Duration:</strong> The size of each dot indicates how long the contact lasted</li>
              <li><strong>Identity:</strong> Each contact is shown by their anonymous Ping Pin - click any dot to see details</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Understanding Your Contact History</h2>

          <p>Your contact history helps you monitor your potential exposure risk:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Proximity Patterns:</strong> See when and how often you're in close contact with others</li>
            <li><strong>Risk Assessment:</strong> Longer contact duration and closer proximity may indicate higher exposure risk</li>
            <li><strong>Contact Tracing:</strong> If you receive a notification, you can identify when the potential exposure occurred</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Why This Matters</h2>

          <p>Understanding your contact history is a crucial part of managing your sexual health:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Early Awareness:</strong> If you receive a notification, you can quickly identify when the potential exposure might have occurred.</li>
            <li><strong>Informed Testing:</strong> Understanding your contact patterns helps you make better decisions about when to get tested.</li>
            <li><strong>Responsible Communication:</strong> If you need to notify others, this history helps you remember relevant contacts while maintaining privacy.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Privacy Protection</h2>

          <p>Your privacy is our top priority. Here's how we protect your information:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Only the last 24 hours of contact data is shown</li>
            <li>No names, phone numbers, or personal details are ever collected</li>
            <li>Contacts are identified only by anonymous Ping Pins</li>
            <li>All data is automatically deleted after 14 days</li>
            <li>You can delete your contact history at any time</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}