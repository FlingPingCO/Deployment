import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Shield, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type TimeRange = "7d" | "30d" | "90d" | "1y";
type DataGranularity = "daily" | "weekly" | "monthly";

export default function Trends() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [granularity, setGranularity] = useState<DataGranularity>("weekly");
  const [showLocation, setShowLocation] = useState(false);
  const [showDemographics, setShowDemographics] = useState(false);

  const { data: trendsData, isLoading } = useQuery<any>({
    queryKey: ["/api/trends", timeRange, granularity, showLocation, showDemographics],
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Community Health Trends</h1>
          <p className="text-muted-foreground mt-2">
            Anonymous, aggregated health data to help understand community trends
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="location-data" className="flex flex-col gap-1">
                  <span>Location Data</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Include regional trends (aggregated by city)
                  </span>
                </Label>
                <Switch
                  id="location-data"
                  checked={showLocation}
                  onCheckedChange={setShowLocation}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="demographics" className="flex flex-col gap-1">
                  <span>Demographics</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Include age range distributions
                  </span>
                </Label>
                <Switch
                  id="demographics"
                  checked={showDemographics}
                  onCheckedChange={setShowDemographics}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="time-range">Time Range</Label>
                <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                    <SelectItem value="90d">90 Days</SelectItem>
                    <SelectItem value="1y">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="granularity">Data Granularity</Label>
                <Select
                  value={granularity}
                  onValueChange={(v) => setGranularity(v as DataGranularity)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select granularity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <AlertCircle className="mr-2 h-4 w-4 animate-pulse" />
              Loading trends data...
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Notification Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendsData?.notifications}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {showDemographics && (
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trendsData?.demographics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
