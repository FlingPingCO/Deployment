import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Heart, Shield, UserCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
        Keep it casual, keep it safe
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-[750px]">
        FlingPing.co is a privacy-focused platform for anonymous STD/STI notifications.
        No awkward conversations, just accountability and care.
      </p>
      
      <Link href="/founding-flinger">
        <Button size="lg" className="mb-12">
          Become a Founding Flinger
        </Button>
      </Link>

      <div className="grid gap-8 md:grid-cols-3 w-full">
        <Card>
          <CardHeader>
            <Shield className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Privacy First</CardTitle>
          </CardHeader>
          <CardContent>
            Complete anonymity with our Ping Pin system. No personal information required.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Heart className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Stigma Free</CardTitle>
          </CardHeader>
          <CardContent>
            A supportive, judgment-free environment for sexual health awareness.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <UserCheck className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Easy Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            Discreetly notify partners about potential exposure with just a few clicks.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
