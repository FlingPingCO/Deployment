import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Lock, Smartphone } from "lucide-react";

type TutorialStep = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to FlingPing",
    description: "Let's get you started with a quick tour of how we keep your experience private, secure, and stigma-free.",
    icon: <Heart className="w-12 h-12 text-primary" />,
  },
  {
    title: "Your Ping Pin (PP)",
    description: "Your PP is your anonymous identifier. We never collect names, phone numbers, or personal details. Just pound your PP to connect safely.",
    icon: <Shield className="w-12 h-12 text-primary" />,
  },
  {
    title: "Bluetooth Privacy",
    description: "Our app uses anonymous Bluetooth tracking to record encounters. No personal info, just secure PP connections when you're close.",
    icon: <Smartphone className="w-12 h-12 text-primary" />,
  },
  {
    title: "Private Notifications",
    description: "If you need to notify others, we'll automatically alert your recent PPs while keeping everyone's identity private.",
    icon: <Lock className="w-12 h-12 text-primary" />,
  },
];

interface OnboardingTutorialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OnboardingTutorial({ open, onOpenChange }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
      // Here we would save the tutorial completion status
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            {tutorialSteps[currentStep].icon}
          </div>
          <DialogTitle className="text-center">
            {tutorialSteps[currentStep].title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {tutorialSteps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-2">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </Button>
          )}
          <Button onClick={handleNext}>
            {currentStep === tutorialSteps.length - 1 ? "Get Started" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
