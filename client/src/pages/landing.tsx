import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, MessageCircle, Bell } from "lucide-react";
import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Private Health Communication,{" "}
            <span className="text-primary">Reimagined</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Anonymous, secure, and compassionate STI exposure notifications
            that put your privacy first.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Anonymous Protection</CardTitle>
              </CardHeader>
              <CardContent>
                Notify partners without revealing your identity
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="w-12 h-12 text-primary mb-4" />
                <CardTitle>End-to-End Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                Your data is encrypted and never shared
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Compassionate Communication</CardTitle>
              </CardHeader>
              <CardContent>
                Templates designed for sensitivity and clarity
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Bell className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Instant Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                Real-time alerts when it matters most
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Take Control of Your Health Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for discreet and
            responsible health communication.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="px-8">
              Create Anonymous Profile
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
