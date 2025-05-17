"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle } from "lucide-react";

interface LinkAccountDialogProps {
  onAccountLinked: (identifier: string) => void; // Callback after successful (mock) linking
}

type LinkStep = "phone" | "otp" | "2fa" | "success";

export function LinkAccountDialog({ onAccountLinked }: LinkAccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<LinkStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [twoFaPassword, setTwoFaPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setStep("phone");
    setPhoneNumber("");
    setOtp("");
    setTwoFaPassword("");
    setIsLoading(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleSubmitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast({ variant: "destructive", title: "Error", description: "Phone number is required." });
      return;
    }
    setIsLoading(true);
    // Mock API call to request OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast({ title: "OTP Requested", description: `An OTP has been sent to ${phoneNumber} (mock).` });
    setStep("otp");
  };

  const handleSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast({ variant: "destructive", title: "Error", description: "OTP is required." });
      return;
    }
    setIsLoading(true);
    // Mock API call to verify OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Mock logic: 50% chance it needs 2FA
    if (Math.random() > 0.5) {
      toast({ title: "OTP Verified", description: "Please enter your 2FA password (if any)." });
      setStep("2fa");
    } else {
      toast({ title: "Account Linked!", description: `Telegram account ${phoneNumber} linked successfully (mock).` });
      onAccountLinked(phoneNumber);
      setStep("success");
      // setIsOpen(false); // Keep open to show success, or close after a delay
    }
  };

  const handleSubmit2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!twoFaPassword) {
      // Allow skipping if 2FA is not set, or make it required if input is shown
      toast({ title: "Skipping 2FA", description: "Assuming no 2FA set or skipping." });
    }
    setIsLoading(true);
    // Mock API call to verify 2FA
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast({ title: "Account Linked!", description: `Telegram account ${phoneNumber} linked successfully (mock).` });
    onAccountLinked(phoneNumber);
    setStep("success");
    // setIsOpen(false);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case "phone":
        return (
          <form onSubmit={handleSubmitPhone} className="space-y-4">
            <DialogDescription>
              Enter your Telegram phone number to begin the linking process.
              You will receive an OTP in your Telegram app.
            </DialogDescription>
            <div>
              <Label htmlFor="phoneNumber">Phone Number (with country code)</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Request OTP
            </Button>
          </form>
        );
      case "otp":
        return (
          <form onSubmit={handleSubmitOtp} className="space-y-4">
            <DialogDescription>
              Enter the One-Time Password (OTP) you received in your Telegram app.
            </DialogDescription>
            <div>
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="12345"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify OTP
            </Button>
          </form>
        );
      case "2fa":
        return (
          <form onSubmit={handleSubmit2FA} className="space-y-4">
            <DialogDescription>
              Your Telegram account has Two-Factor Authentication (Cloud Password) enabled.
              Please enter your 2FA password.
            </DialogDescription>
            <div>
              <Label htmlFor="twoFaPassword">2FA Password</Label>
              <Input
                id="twoFaPassword"
                type="password"
                value={twoFaPassword}
                onChange={(e) => setTwoFaPassword(e.target.value)}
                placeholder="Your cloud password"
                disabled={isLoading}
              />
            </div>
             <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Password & Link
            </Button>
             <Button type="button" variant="link" onClick={handleSubmit2FA} className="w-full text-sm" disabled={isLoading}>
              Skip if no 2FA password is set
            </Button>
          </form>
        );
      case "success":
        return (
          <div className="text-center space-y-4 py-8">
             <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-semibold">Account Linked Successfully!</h3>
            <p className="text-muted-foreground">
              Telegram account <span className="font-medium text-primary">{phoneNumber}</span> is now connected to Teleflow.
            </p>
            <Button onClick={() => { setIsOpen(false); resetForm(); }} className="w-full">
              Done
            </Button>
          </div>
        );
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Link New Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === "success" ? "Success!" : "Link Telegram Account"}
          </DialogTitle>
        </DialogHeader>
        {renderStepContent()}
        {step !== "success" && (
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
