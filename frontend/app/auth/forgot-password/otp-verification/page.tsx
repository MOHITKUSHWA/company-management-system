"use client";
import OtpVerification from "@/components/otpComponents";
import { useToast } from "@/hooks/use-toast";
import {
  otpVarifyslice,
  resendOtpSlice,
  setOtpData,
  setResendOtpData,
} from "@/redux/reducer/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface otpStatusInterface {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: {
    token?: string;
    message?: string;
  } | null;
}

interface resendOtpStatusInterface {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: {
    message?: string;
  } | null;
}

const ForgetPasswordOtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const otpStatus: otpStatusInterface = useAppSelector(
    (state) => state.auth.otp,
  );
  const resendOtpStatus: resendOtpStatusInterface = useAppSelector(
    (state) => state.auth.resendOtp,
  );
  const router = useRouter();

  useEffect(() => {
    let storedEmail = getCookie("verification-email") as string | null;
    if (!storedEmail) {
      router.push("/auth/login");
    }
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (otpStatus?.success) {
      setOtp("");
      let token = otpStatus?.data?.token;
      if (token) {
        setCookie("reset-token", token as string);
      }
      deleteCookie("verification-email");
      toast({
        title: "OTP verification successful!",
        description: "Your  email has been verified successfully.",
      });
      setEmail(null);
      dispatch(setOtpData());
      setTimeout(() => {
        router.push("/auth/reset-password");
      }, 1000);
    } else if (otpStatus?.error) {
      toast({
        variant: "destructive",
        title: "OTP verification failed!",
        description: otpStatus?.data?.message || "Please try again",
      });
      dispatch(setOtpData());
    }
  }, [otpStatus]);

  useEffect(() => {
    if (resendOtpStatus?.success) {
      toast({
        title: "OTP resent successfully!",
        description: "Please check your email for the new verification code.",
      });
      dispatch(setResendOtpData());
    } else if (resendOtpStatus?.error) {
      dispatch(setResendOtpData());
      toast({
        variant: "destructive",
        title: "Failed to resend OTP!",
        description: resendOtpStatus?.data?.message || "Please try again",
      });
    }
  }, [resendOtpStatus]);

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a complete 6-digit code",
        variant: "destructive",
      });
      return;
    }
    dispatch(otpVarifyslice({ email, otp }));
  };

  const handleResendOtp = () => {
    dispatch(resendOtpSlice({ email }));
  };

  const handelOtpChange = (value: string) => {
    setOtp(value);
  };

  return (
    email && (
      <OtpVerification
        email={email}
        otp={otp}
        otpOnChange={handelOtpChange}
        handleResend={handleResendOtp}
        pathname="/auth/forgot-password"
        handleVerifyOtp={handleVerifyOtp}
        submitBtnText={otpStatus?.loading ? "Verifying..." : "Continue"}
        loading={otpStatus?.loading}
        resendLoading={resendOtpStatus?.loading}
      />
    )
  );
};

export default ForgetPasswordOtpVerificationPage;
