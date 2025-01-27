import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Users, Info } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Contact {
  id: string;
  distance: number; // in meters
  timestamp: number;
  duration: number; // in minutes
}

export default function ContactTrace() {
  // Mock data for beta visualization
  const contacts: Contact[] = [
    { id: 'PP-1234', distance: 2, timestamp: Date.now() - 1000 * 60 * 60 * 2, duration: 15 },
    { id: 'PP-5678', distance: 1, timestamp: Date.now() - 1000 * 60 * 60 * 1, duration: 30 },
    { id: 'PP-9012', distance: 3, timestamp: Date.now() - 1000 * 60 * 30, duration: 5 },
  ];

  const formatData = contacts.map(contact => ({
    x: new Date(contact.timestamp).getHours(),
    y: contact.distance,
    z: contact.duration,
    id: contact.id
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Proximity Contact Map
          </CardTitle>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This visualization shows your recent contacts:
                  • Each point represents a contact
                  • X-axis shows when the contact occurred
                  • Y-axis shows how close you were
                  • Larger bubbles mean longer contact duration
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Time" 
                domain={[0, 24]}
                tickFormatter={(hour) => `${hour}:00`}
                label={{ 
                  value: 'Hours (24-hour format)', 
                  position: 'bottom',
                  offset: 20
                }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Distance" 
                unit="m"
                label={{ 
                  value: 'Distance (meters)', 
                  angle: -90, 
                  position: 'left',
                  offset: 10
                }}
                domain={[0, 'auto']}
              />
              <ZAxis 
                type="number" 
                dataKey="z" 
                range={[100, 1000]} 
                name="Duration" 
                unit="min"
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded p-3 shadow-lg">
                        <p className="font-semibold text-primary">{data.id}</p>
                        <div className="space-y-1 mt-2 text-sm">
                          <p>Distance: {data.y}m</p>
                          <p>Duration: {data.z} minutes</p>
                          <p>Time: {data.x}:00</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                name="Contacts" 
                data={formatData} 
                fill="hsl(var(--primary))"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 space-y-2">
          <h4 className="font-semibold">How to read this chart:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-primary" />
              <p>Each dot represents a contact with another user (identified by their Ping Pin)</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 mt-1 rounded-full bg-primary/20" />
              <p>Larger circles indicate longer contact duration</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-muted" />
              <p>Hover over any point to see detailed information</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}