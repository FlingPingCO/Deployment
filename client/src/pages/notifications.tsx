import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Bell, AlertCircle, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type NotificationType = 'exposure' | 'test_result';
type ExposureType = 'direct' | 'indirect';
type TestResultStatus = 'positive' | 'negative';

interface NotificationFormData {
  type: NotificationType;
  exposureType?: ExposureType;
  testResultStatus?: TestResultStatus;
  testType?: string;
  otherTestType?: string;
}

export default function Notifications() {
  const { toast } = useToast();
  const form = useForm<NotificationFormData>();
  const queryClient = useQueryClient();

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
          context: {
            testType: data.testType === 'other' ? data.otherTestType : data.testType,
            exposureType: data.exposureType,
            testResultStatus: data.testResultStatus,
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
        title: "Status Update Sent",
        description: "Your status has been updated. Recent contacts will be notified anonymously.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: [`/api/notifications/${profile?.pingPin}`] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
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
        description: "You must be logged in to update your status.",
        variant: "destructive",
      });
      return;
    }

    // Validate required fields based on type
    if (data.type === 'exposure') {
      if (!data.exposureType) {
        toast({
          title: "Error",
          description: "Please select the type of exposure.",
          variant: "destructive",
        });
        return;
      }
      if (!data.testType) {
        toast({
          title: "Error",
          description: "Please select or specify what you were exposed to.",
          variant: "destructive",
        });
        return;
      }
      if (data.testType === 'other' && !data.otherTestType) {
        toast({
          title: "Error",
          description: "Please specify the other STI/STD you were exposed to.",
          variant: "destructive",
        });
        return;
      }
    }

    if (data.type === 'test_result') {
      if (!data.testResultStatus) {
        toast({
          title: "Error",
          description: "Please select test result status (positive/negative).",
          variant: "destructive",
        });
        return;
      }
      if (!data.testType) {
        toast({
          title: "Error",
          description: "Please select or specify the test type.",
          variant: "destructive",
        });
        return;
      }
      if (data.testType === 'other' && !data.otherTestType) {
        toast({
          title: "Error",
          description: "Please specify the other test type.",
          variant: "destructive",
        });
        return;
      }
    }

    sendNotification.mutate(data);
  };

  const updateType = form.watch("type");
  const testType = form.watch("testType");
  const testResultStatus = form.watch("testResultStatus");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Health Status Update</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Update Your Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Your update will automatically notify recent contacts anonymously through our system.
            Our AI will help generate appropriate, sensitive messages.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Update Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select update type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="exposure">Report Exposure</SelectItem>
                        <SelectItem value="test_result">Report Test Result</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {updateType === 'exposure' && (
                <>
                  <FormField
                    control={form.control}
                    name="exposureType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exposure Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select exposure type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="direct">Direct Exposure</SelectItem>
                            <SelectItem value="indirect">Indirect Exposure</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Direct: You were directly exposed. Indirect: You were notified of potential exposure by someone else.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="testType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exposed To</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select what you were exposed to" />
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

                  {testType === 'other' && (
                    <FormField
                      control={form.control}
                      name="otherTestType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specify Other STI/STD</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter the specific STI/STD" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}

              {updateType === 'test_result' && (
                <>
                  <FormField
                    control={form.control}
                    name="testResultStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Test Result Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select test result status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="positive">Positive</SelectItem>
                            <SelectItem value="negative">Negative</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {testResultStatus === 'positive' && (
                    <FormField
                      control={form.control}
                      name="testType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Test Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select test type" />
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
                  )}

                  {testResultStatus === 'positive' && testType === 'other' && (
                    <FormField
                      control={form.control}
                      name="otherTestType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specify Other STI/STD</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter the specific STI/STD" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={sendNotification.isPending}
              >
                {sendNotification.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Update Status & Notify Contacts
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
                    <p className="font-medium">{notification.content?.message}</p>
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