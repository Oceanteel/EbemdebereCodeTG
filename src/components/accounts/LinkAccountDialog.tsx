
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
import { Loader2, PlusCircle, CheckCircle2 } from "lucide-react"; // Added CheckCircle2
import { requestTelegramOtp, submitTelegramOtp, submitTelegram2fa } from "@/app/(app)/accounts/actions";

interface LinkAccountDialogProps {
  onAccountLinked: (identifier: string) => void;
}

type LinkStep = "phone" | "otp" | "2fa" | "success" | "error";

export function LinkAccountDialog({ onAccountLinked }: LinkAccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<LinkStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [twoFaPassword, setTwoFaPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [phoneCodeHash, setPhoneCodeHash] = useState<string | null>(null);
  const { toast } = useToast();

  const resetForm = () => {
    setStep("phone");
    setPhoneNumber("");
    setOtp("");
    setTwoFaPassword("");
    setIsLoading(false);
    setErrorMessage(null);
    setPhoneCodeHash(null);
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
    setErrorMessage(null);

    const result = await requestTelegramOtp(phoneNumber);

    setIsLoading(false);
    if (result.status === "otp_sent" && result.phoneCodeHash) {
      toast({ title: "OTP Requested", description: result.message });
      setPhoneCodeHash(result.phoneCodeHash);
      setStep("otp");
    } else if (result.status === "2fa_hint" && result.phoneCodeHash) {
      // This case might happen if Telegram knows 2FA is needed even before OTP for some lib versions
      toast({ title: "2FA Required", description: result.message + (result.hint ? ` Hint: ${result.hint}`: "") });
      setPhoneCodeHash(result.phoneCodeHash); // Still might need this if OTP was implicitly handled
      setStep("2fa");
    }
    else {
      setErrorMessage(result.message);
      toast({ variant: "destructive", title: "Error", description: result.message });
      setStep("error");
    }
  };

  const handleSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast({ variant: "destructive", title: "Error", description: "OTP is required." });
      return;
    }
    if (!phoneCodeHash) {
      toast({ variant: "destructive", title: "Error", description: "Session error, please restart linking." });
      setStep("error");
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);

    const result = await submitTelegramOtp(phoneNumber, phoneCodeHash, otp);
    setIsLoading(false);

    if (result.status === "2fa_required") {
      toast({ title: "OTP Verified", description: result.message + (result.hint ? ` Hint: ${result.hint}`: "") });
      setStep("2fa");
    } else if (result.status === "success") {
      toast({ title: "Account Linked!", description: result.message });
      onAccountLinked(phoneNumber);
      setStep("success");
    } else {
      setErrorMessage(result.message);
      toast({ variant: "destructive", title: "Error", description: result.message });
      setStep("error");
    }
  };

  const handleSubmit2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    // 2FA password can be empty if the user doesn't have one set up and the server action handles this
    // For now, we assume if this step is reached, password might be needed by Telegram
    
     setIsLoading(true);

    const result = await submitTelegram2fa(phoneNumber, twoFaPassword); // phoneCodeHash might not be needed here by some libs
    setIsLoading(false);

    if (result.status === "success") {
      toast({ title: "Account Linked!", description: result.message });
      onAccountLinked(phoneNumber);
      setStep("success");
    } else {
      setErrorMessage(result.message);
      toast({ variant: "destructive", title: "Error", description: result.message });
      setStep("error");
    }
  };
  
  const renderStepContent = () => {
    switch (step) {
      case "phone":
        return (
          <form onSubmit={handleSubmitPhone} className="space-y-4">
            <DialogDescription>
              Enter your Telegram phone number to begin the linking process.
              You will receive an OTP in your Telegram app (not SMS).
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
              Your Telegram account may have Two-Factor Authentication (Cloud Password) enabled.
              If so, please enter your 2FA password. If not, you might be able to submit empty.
            </DialogDescription>
            <div>
              <Label htmlFor="twoFaPassword">2FA Password (Cloud Password)</Label>
              <Input
                id="twoFaPassword"
                type="password"
                value={twoFaPassword}
                onChange={(e) => setTwoFaPassword(e.target.value)}
                placeholder="Your cloud password (if set)"
                disabled={isLoading}
              />
            </div>
             <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Password & Link
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
      case "error":
        return (
          <div className="text-center space-y-4 py-8">
            <DialogDescription className="text-destructive">
              An error occurred: {errorMessage || "Unknown error."}
            </DialogDescription>
            <Button onClick={resetForm} className="w-full" variant="outline">
              Try Again
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
            {step === "success" ? "Success!" : step === "error" ? "Error" : "Link Telegram Account"}
          </DialogTitle>
        </DialogHeader>
        {renderStepContent()}
        {step !== "success" && step !== "error" && (
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
