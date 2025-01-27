import { Shield, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PrivacyBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="secondary" className="gap-1">
            <Lock className="h-3 w-3" />
            Private & Secure
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">
            Your privacy is our priority. We never collect or store personal information.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
