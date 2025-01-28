import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Contact {
  id: string;
  distance: number; // in feet
  timestamp: number;
  duration: number; // in minutes
}

export default function ContactTrace() {
  // Mock data showing diverse, anonymous encounters throughout the day
  const contacts: Contact[] = [
    // Random encounters throughout the day with more varied distances
    { id: 'PP-7392', distance: 15.5, timestamp: Date.now() - 1000 * 60 * 60 * 7, duration: 15 }, // Morning
    { id: 'PP-4521', distance: 24.2, timestamp: Date.now() - 1000 * 60 * 60 * 5, duration: 10 }, // Late morning
    { id: 'PP-9834', distance: 18.0, timestamp: Date.now() - 1000 * 60 * 60 * 4, duration: 20 }, // Early afternoon
    { id: 'PP-2156', distance: 28.8, timestamp: Date.now() - 1000 * 60 * 60 * 2, duration: 12 }, // Late afternoon
    { id: 'PP-6478', distance: 22.2, timestamp: Date.now() - 1000 * 60 * 60 * 1, duration: 18 }, // Evening
  ];

  const formatData = contacts.map(contact => ({
    x: new Date(contact.timestamp).getHours(),
    y: contact.distance,
    z: contact.duration,
    id: contact.id,
    timeAgo: Math.round((Date.now() - contact.timestamp) / (1000 * 60)) // minutes ago
  }));

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-end space-x-2">
        <TooltipProvider>
          <UITooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Click any dot to see contact details</p>
            </TooltipContent>
          </UITooltip>
        </TooltipProvider>
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
                  value: 'Contact Time (24-hour format)', 
                  position: 'bottom',
                  offset: 20
                }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Distance" 
                unit=" ft"
                label={{ 
                  value: 'Distance Between Users (feet)', 
                  angle: -90, 
                  position: 'left',
                  offset: 10
                }}
                domain={[0, 30]} // Increased max distance to 30 feet
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
                      <div className="bg-background border rounded p-4 shadow-lg">
                        <p className="font-semibold text-primary mb-2">{data.id}</p>
                        <div className="space-y-1 text-sm">
                          <p>Distance: {data.y.toFixed(1)} feet</p>
                          <p>Duration: {data.z} minutes</p>
                          <p>Time: {data.x}:00</p>
                          <p className="text-muted-foreground mt-1">
                            {data.timeAgo < 60 
                              ? `${data.timeAgo} minutes ago`
                              : `${Math.round(data.timeAgo / 60)} hours ago`}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                name="Past Contacts" 
                data={formatData} 
                fill="hsl(var(--primary))"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}