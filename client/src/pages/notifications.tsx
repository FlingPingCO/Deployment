import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Bell, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Notifications() {
  const form = useForm();

  const onSubmit = async (data: any) => {
    // Handle notification sending through the database
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Test Result</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Your report will automatically notify relevant contacts anonymously through our system.
            No personal information will be shared.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="testResult"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test Result Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select test result to report" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="chlamydia">Chlamydia</SelectItem>
                        <SelectItem value="gonorrhea">Gonorrhea</SelectItem>
                        <SelectItem value="syphilis">Syphilis</SelectItem>
                        <SelectItem value="hiv">HIV</SelectItem>
                        <SelectItem value="other">Other STI/STD</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary">
                <AlertCircle className="mr-2 h-4 w-4" />
                Send Anonymous Notifications
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                This will notify all relevant contacts from your recent check-ins
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Notifications</h2>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">New Exposure Alert</p>
                <p className="text-sm text-muted-foreground">
                  Anonymous Alert • 2 hours ago
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Health Update Required</p>
                <p className="text-sm text-muted-foreground">
                  System Notification • 1 day ago
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}