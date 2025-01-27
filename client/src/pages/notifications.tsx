import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Bell, Send } from "lucide-react";

export default function Notifications() {
  const form = useForm();

  const onSubmit = async (data: any) => {
    // Handle notification sending
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send Anonymous Notification</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="recipientPP"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient's Ping Pin</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter PP" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
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
                  From: PP-****-5678 • 2 hours ago
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
