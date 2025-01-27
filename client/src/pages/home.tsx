import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Heart, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
        Flip the Script on Sexual Health
      </h1>
      <p className="text-2xl font-semibold text-primary mb-4">
        The First App to Outsmart STDs – Smart, Private, and Empowering
      </p>
      <p className="text-lg text-muted-foreground mb-8 max-w-[750px]">
        Say goodbye to awkward "uh-oh" moments and hello to a smarter, safer, and discreet way 
        to stay ahead of your sexual health.
      </p>

      <Link href="/founding-flinger">
        <Button size="lg" className="mb-12">
          Join the Revolution - Only 250 Spots!
        </Button>
      </Link>

      <div className="grid gap-8 md:grid-cols-3 w-full">
        <Card>
          <CardHeader>
            <Zap className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Stay Smart</CardTitle>
          </CardHeader>
          <CardContent>
            Take charge with cutting-edge technology. No awkward texts, no forgotten names, just confidence.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Stay Private</CardTitle>
          </CardHeader>
          <CardContent>
            Keep your personal life personal with encrypted, anonymous communication. No names, no numbers—just peace of mind.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Heart className="w-12 h-12 mb-4 text-primary mx-auto" />
            <CardTitle>Stay Fun</CardTitle>
          </CardHeader>
          <CardContent>
            Who knew safe sex could be this empowering? Confidence never looked so good.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}