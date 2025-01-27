import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Crown, Gift, Star, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FoundingFlinger() {
  const { toast } = useToast();
  const form = useForm();

  const onSubmit = async (data: any) => {
    toast({
      title: "You're on your way to becoming a Founding Flinger!",
      description: "We'll be in touch with next steps.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join the FlingPing Revolution</h1>
        <p className="text-xl font-semibold text-primary mb-2">
          Only 250 Founding Flinger Spots Available!
        </p>
        <p className="text-lg text-muted-foreground">
          Be part of the movement that's creating a smarter, healthier community.
        </p>
        <div className="mt-4 inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg text-xl font-bold">
          Lifetime Access for $99
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <Card>
          <CardHeader>
            <Crown className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Lifetime Membership</CardTitle>
          </CardHeader>
          <CardContent>
            Pay once and unlock all core features—no subscriptions, no limits, just peace of mind.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Early Access</CardTitle>
          </CardHeader>
          <CardContent>
            Shape FlingPing's future with your feedback and be first to try new features.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Gift className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Exclusive Perks</CardTitle>
          </CardHeader>
          <CardContent>
            Limited edition Founding Flinger swag and recognition in our community.
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Secure Your Founding Flinger Spot</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Join for $99 - Lifetime Access
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}