import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  MessageCircle,
  Shield,
  UserPlus,
  Lock,
  Clock,
  Bell,
  Heart,
  Zap
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().optional()
});

export default function FoundingFlinger() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    toast({
      title: "Thanks for your interest!",
      description: "We'll be in touch about founding membership soon.",
    });
  };

  return (
    <div className="min-h-screen bg-[#F4E9D9]/30">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold mb-8">Let's Flip the Script on Sexual Health</h1>
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          <Card className="bg-white/80">
            <CardHeader>
              <Shield className="w-12 h-12 text-[#0ACCA8] mx-auto mb-4" />
              <CardTitle>Make Logging Safe Effortless</CardTitle>
            </CardHeader>
            <CardContent>
              Track encounters and stay informed without awkward conversations
            </CardContent>
          </Card>

          <Card className="bg-white/80">
            <CardHeader>
              <Lock className="w-12 h-12 text-[#FF695E] mx-auto mb-4" />
              <CardTitle>Why FlingPing's Got Your Back</CardTitle>
            </CardHeader>
            <CardContent>
              Anonymous notifications keep everyone in the loop, no drama needed
            </CardContent>
          </Card>

          <Card className="bg-white/80">
            <CardHeader>
              <Heart className="w-12 h-12 text-[#FFD166] mx-auto mb-4" />
              <CardTitle>Your Privacy is Our Priority</CardTitle>
            </CardHeader>
            <CardContent>
              End-to-end encryption and zero personal data storage
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What our early adopters are saying about us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Finally, a no-nonsense way to deal with the what-ifs!",
              "Love how it keeps things private but responsible",
              "The anonymous notifications are genius",
              "Best $99 I've spent on peace of mind"
            ].map((quote, i) => (
              <Card key={i} className="bg-white">
                <CardContent className="pt-6">
                  <p className="italic text-muted-foreground">{quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Member Offer */}
      <section className="py-16 text-center bg-[#FF695E]/10">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-full p-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Join the revolution!</h2>
            <h3 className="text-2xl text-[#FF695E] mb-6">Become a Founding Flinger</h3>
            <p className="text-xl mb-4">Only 250 Founding Flinger spots available</p>
            <p className="text-3xl font-bold mb-8">Lifetime access for only $99</p>
            <Button 
              size="lg" 
              className="bg-[#FF695E] hover:bg-[#FF695E]/90 text-white px-8 py-6 text-xl"
            >
              Join Now
            </Button>
          </div>
        </div>
      </section>

      {/* MVP Features */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What to expect with your Flinger MVP</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Anonymous Protection",
                desc: "Stay safe without sharing personal details"
              },
              {
                icon: Bell,
                title: "Real-Time Notifications",
                desc: "Get instant alerts when it matters most"
              },
              {
                icon: Lock,
                title: "Encrypted Data",
                desc: "Your privacy is our top priority"
              },
              {
                icon: MessageCircle,
                title: "Discreet Communication",
                desc: "Handle sensitive situations smoothly"
              }
            ].map((feature, i) => (
              <Card key={i} className="bg-white">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-[#0ACCA8] mx-auto mb-4" />
                  <CardTitle className="text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Empowerment Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">Empower yourself with:</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center">
              <Shield className="w-6 h-6 text-[#0ACCA8] mr-4" />
              Built-in tools for making safer decisions
            </li>
            <li className="flex items-center">
              <Lock className="w-6 h-6 text-[#FF695E] mr-4" />
              Comprehensive FAQs and quick-access resources
            </li>
            <li className="flex items-center">
              <Heart className="w-6 h-6 text-[#FFD166] mr-4" />
              Valuable resources to locate testing centers and access health services
            </li>
          </ul>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>Let's get Flinging!</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Sign Up Now!
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}