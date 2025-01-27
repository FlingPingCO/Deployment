import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Crown, Gift, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FoundingFlinger() {
  const { toast } = useToast();
  const form = useForm();

  const onSubmit = async (data: any) => {
    toast({
      title: "Thanks for your interest!",
      description: "We'll notify you when we launch.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Become a Founding Flinger</h1>
        <p className="text-lg text-muted-foreground">
          Join our exclusive early access program and help shape the future of safe casual connections.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <Card>
          <CardHeader>
            <Crown className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Early Access</CardTitle>
          </CardHeader>
          <CardContent>
            Be among the first to use FlingPing.co and help us make it better.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Gift className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Exclusive Perks</CardTitle>
          </CardHeader>
          <CardContent>
            Get special badges, features, and swag available only to founding members.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Star className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Lifetime Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            Enjoy premium features for life as a thank you for being an early supporter.
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Reserve Your Spot</CardTitle>
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
              <Button type="submit" className="w-full">Join the Waitlist</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
