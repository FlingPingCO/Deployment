import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PingPinDisplayProps {
  pingPin: string;
}

export default function PingPinDisplay({ pingPin }: PingPinDisplayProps) {
  const { toast } = useToast();

  const copyPingPin = async () => {
    try {
      await navigator.clipboard.writeText(pingPin);
      toast({
        title: "Copied!",
        description: "Your Ping Pin has been copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Your Ping Pin
          <Badge variant="secondary">Private</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <code className="relative rounded bg-muted px-[0.5rem] py-[0.4rem] font-mono text-lg">
            {pingPin}
          </code>
          <Button variant="outline" size="icon" onClick={copyPingPin}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
