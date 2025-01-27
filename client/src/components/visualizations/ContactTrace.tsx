import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Users } from "lucide-react";

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
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Proximity Contact Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Time" 
                unit="h"
                domain={[0, 24]}
                label={{ value: 'Hours Ago', position: 'bottom' }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Distance" 
                unit="m"
                label={{ value: 'Distance (meters)', angle: -90, position: 'left' }}
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
                      <div className="bg-background border rounded p-2">
                        <p className="font-semibold">{data.id}</p>
                        <p>Distance: {data.y}m</p>
                        <p>Duration: {data.z}min</p>
                        <p>Time: {data.x}:00</p>
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
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Bubble size indicates contact duration. Hover over points to see details.</p>
        </div>
      </CardContent>
    </Card>
  );
}
