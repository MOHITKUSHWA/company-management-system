"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowLeft, KeyRound, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

interface OtpVerificationProps {
  titale?: string;
  discription?: string;
  email: string;
  otp: string;
  otpOnChange: (value: string) => void;
  handleResend: () => void;
  handleVerifyOtp: () => void;
  pathname: string;
  submitBtnText?: string;
  loading?: boolean;
  resendLoading?: boolean;
}

const OtpVerification = ({
  titale = "Enter verification code",
  discription = "Enter the 6-digit code sent to your email",
  email,
  otp = "",
  otpOnChange,
  handleResend,
  handleVerifyOtp,
  pathname,
  submitBtnText = "Continue",
  loading = false,
  resendLoading = false,
}: OtpVerificationProps) => {
  const router = useRouter();

  return (
    <div className="min-h-screen grid place-items-center bg-muted/30 p-4 font-sans">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
            <Mail className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold">{titale}</CardTitle>
          <CardDescription>
            {discription}
            <br />
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={otpOnChange}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerifyOtp}
            className="w-full"
            disabled={otp.length !== 6 || loading}
          >
            {submitBtnText}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <Button variant="ghost" onClick={handleResend} className="gap-2 cursor-pointer">
             {resendLoading ? (
                <RefreshCw className="animate-spin h-4 w-4" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}{" "}
              Resend
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6 bg-muted/20">
          <Button
            variant="ghost"
            onClick={() => router.push(`${pathname}`)}
            className="gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Change email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OtpVerification;
