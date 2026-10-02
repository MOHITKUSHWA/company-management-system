"use client";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft, KeyRound, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { apiRequest } from "@/lib/queryClient";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { forGetPassword, setForgetPasswordData } from "@/redux/reducer/auth.slice";
import { setCookie } from "cookies-next";
import { emailSchema } from "@/utils/validation/auth.validation";

interface forgetPasswordStatusInterface {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: {
    message?: string;
  } | null;
}

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const forgetpassword: forgetPasswordStatusInterface = useAppSelector(
    (state) => state.auth.forgetPassword,
  );

  useEffect(() => {
    if (forgetpassword?.success) {
      toast({
        title: "OTP sent successfully!",
        description: "Please check your email for the verification code.",
      });
      setCookie("verification-email", formik.values.email);
      formik.resetForm();
      dispatch(setForgetPasswordData());
      setTimeout(() => {
        router.push("/auth/forgot-password/otp-verification");
      }, 1000);
    } else if (forgetpassword?.error) {
      toast({
        variant: "destructive",
        title: "Failed to send OTP!",
        description: forgetpassword?.data?.message || "Please try again",
      });
      dispatch(setForgetPasswordData());
    }
  }, [forgetpassword]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (data) => {
      dispatch(forGetPassword(data));
    },
  });

 
  return (
    <div className="min-h-screen grid place-items-center bg-muted/30 p-4 font-sans">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
            <div className="font-display font-bold text-xl">P</div>
          </div>
          <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a verification code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                placeholder="name@company.com"
                name="email"
                value={formik.values.email}
                onChange={formik?.handleChange}
              />
              {formik?.errors.email && formik?.touched.email && (
                <p className="text-sm text-destructive">
                  {formik?.errors.email}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={forgetpassword?.loading}
            >
              {forgetpassword?.loading
                ? "Sending..."
                : "Send verification code"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6 bg-muted/20">
          <div
            onClick={() => router.push("/auth/login")}
            className="text-sm text-primary cursor-pointer hover:underline font-medium flex items-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" /> Back to login
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
