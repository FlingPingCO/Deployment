import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Shield, Zap } from "lucide-react";
import OnboardingTutorial from "@/components/onboarding/OnboardingTutorial";
import { useState } from "react";

export default function Home() {
  const [showTutorial, setShowTutorial] = useState(true); 

  return (
    <>
      <OnboardingTutorial open={showTutorial} onOpenChange={setShowTutorial} />

      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4E9D9]/30">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Welcome to
          </h1>

          <div className="text-5xl sm:text-6xl md:text-7xl font-medium">
            <span className="logo-text logo-main">FlingPing</span>
            <span className="logo-text logo-suffix">.co</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl mt-4">
            The First App to Outsmart STDs: {" "}
            <span className="text-[#0ACCA8] underline decoration-[#0ACCA8] underline-offset-4">Smart</span>,{" "}
            <span className="text-[#FF695E] underline decoration-[#FF695E] underline-offset-4">Private</span>, and{" "}
            <span className="text-[#FFD166] underline decoration-[#FFD166] underline-offset-4">Empowering</span>.
          </h2>

          <h3 className="text-2xl font-bold mt-8">
            Revolutionize Your Health Journey: Get Lifetime Access Now!
          </h3>

          <Link href="/founding-flinger">
            <Button 
              className="mt-8 bg-[#FF695E] hover:bg-[#FF695E]/90 text-white px-8 py-6 text-lg rounded-full shadow-lg"
            >
              JOIN NOW!
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}