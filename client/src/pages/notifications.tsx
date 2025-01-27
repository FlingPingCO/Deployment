import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Bell, AlertCircle, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";

type NotificationType = 'exposure' | 'test_result' | 'reminder';

interface NotificationFormData {
  testResult: string;
  type: NotificationType;
  recipientPingPin: string;
}

export default function Notifications() {
  const { toast } = useToast();
  const form = useForm<NotificationFormData>();

  // Get current user's profile
  const { data: profile } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  const sendNotification = useMutation({
    mutationFn: async (data: NotificationFormData) => {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: data.type,
          senderPingPin: profile?.pingPin,
          recipientPingPin: data.recipientPingPin,
          context: {
            testType: data.testResult,
            date: new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Notification Sent",
        description: "Your anonymous notification has been sent successfully.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send notification. Please try again.",
        variant: "destructive",
      });
    },
  });

  const { data: recentNotifications, isLoading } = useQuery<any>({
    queryKey: [`/api/notifications/${profile?.pingPin}`],
    enabled: !!profile?.pingPin,
  });

  const onSubmit = (data: NotificationFormData) => {
    if (!profile?.pingPin) {
      toast({
        title: "Error",
        description: "You must be logged in to send notifications.",
        variant: "destructive",
      });
      return;
    }
    sendNotification.mutate(data);
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
          <p className="text-sm text-muted-foreground mb-4">
            Our AI will help generate an appropriate, sensitive message. Your identity will remain anonymous.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="recipientPingPin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient's Ping Pin</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter recipient's PP" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the Ping Pin of the person you want to notify
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="exposure">Exposure Alert</SelectItem>
                        <SelectItem value="test_result">Test Result</SelectItem>
                        <SelectItem value="reminder">Health Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the type of notification to send. Our AI will generate an appropriate message.
                    </FormDescription>
                  </FormItem>
                )}
              />

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

              <Button 
                type="submit" 
                className="w-full" 
                disabled={sendNotification.isPending}
              >
                {sendNotification.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Send Anonymous Notification
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Notifications</h2>
        {isLoading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : !recentNotifications || recentNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-4 text-center text-muted-foreground">
              No notifications yet
            </CardContent>
          </Card>
        ) : (
          recentNotifications?.map((notification: any) => (
            <Card key={notification.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Bell className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">{notification.content.message}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}