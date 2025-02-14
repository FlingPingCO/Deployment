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
  // Mock data showing realistic, spaced encounters throughout the day
  const contacts: Contact[] = [
    { id: 'PP-7392', distance: 0, timestamp: Date.now() - 1000 * 60 * 60 * 20, duration: 15 },          // 0 miles
    { id: 'PP-4521', distance: 2640, timestamp: Date.now() - 1000 * 60 * 60 * 12, duration: 10 },       // 0.5 miles
    { id: 'PP-9834', distance: 5280, timestamp: Date.now() - 1000 * 60 * 60 * 8, duration: 8 },         // 1 mile
    { id: 'PP-2156', distance: 7920, timestamp: Date.now() - 1000 * 60 * 60 * 4, duration: 12 },        // 1.5 miles
    { id: 'PP-6478', distance: 10560, timestamp: Date.now() - 1000 * 60 * 60 * 1, duration: 18 }        // 2 miles
  ];

  const formatData = contacts.map(contact => ({
    x: new Date(contact.timestamp).getHours(),
    y: contact.distance,
    z: contact.duration,
    id: contact.id,
    timeAgo: Math.round((Date.now() - contact.timestamp) / (1000 * 60)) // minutes ago
  }));

  const formatDistance = (distance: number) => {
    const miles = distance / 5280;
    if (distance === 0) return "0 miles (0 ft)";
    return `${miles.toFixed(1)} miles (${distance.toLocaleString()} ft)`;
  };

  const tickValues = [0, 2640, 5280, 7920, 10560]; // Exact positions for 0, 0.5, 1, 1.5, and 2 miles

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
                ticks={tickValues}
                tickFormatter={(value) => `${(value / 5280).toFixed(1)}`}
                label={{ 
                  value: 'Distance (miles)', 
                  angle: -90, 
                  position: 'left',
                  offset: 10
                }}
                domain={[0, 10560]} // Max 2 miles in feet
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
                          <p>Distance: {formatDistance(data.y)}</p>
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