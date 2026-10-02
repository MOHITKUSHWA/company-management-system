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

const NewUserOtpVerificationPage = () => {
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
    let storedEmail = getCookie("email") as string | null;
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
        setCookie("token", token);
      }
      toast({
        title: "OTP verification successful!",
        description: "Your email has been verified successfully.",
      });
      deleteCookie("email");
      dispatch(setOtpData());
      router.push("/dashboard/company");
    } else if (otpStatus?.error) {
      dispatch(setOtpData());
      toast({
        variant: "destructive",
        title: "OTP verification failed!",
        description: otpStatus?.data?.message || "Please try again.",
      });
    }
  }, [otpStatus]);

  useEffect(() => {
    if (resendOtpStatus?.success) {
      dispatch(setResendOtpData());
      toast({
        title: "OTP resent successfully!",
        description: "A new OTP has been sent to your email.",
      });
    } else if (resendOtpStatus?.error) {
      dispatch(setResendOtpData());
      toast({
        variant: "destructive",
        title: "Failed to resend OTP!",
        description: resendOtpStatus?.data?.message || "Please try again.",
      });
    }
  }, [resendOtpStatus]);

  const handelOtpChange = (value: string) => {
    setOtp(value);
  };

  /**
   *
   * handleResend is used to resend the otp to the user's email. It dispatches the resendOtpSlice action with the email as payload.
   */
  const handleResend = () => {
    if (resendOtpStatus?.loading) return;
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email not found!",
        description: "Please go back and enter your email.",
      });
      return;
    }
    dispatch(resendOtpSlice({ email }));
  };

  /**
   * handleVerifyOtp is used to verify the otp entered by the user. It dispatches the otpVarifyslice action with the email and otp as payload.
   */
  const handleVerifyOtp = () => {
    dispatch(otpVarifyslice({ email, otp }));
  };

  return (
    email && (
      <OtpVerification
        email={email}
        otp={otp}
        otpOnChange={handelOtpChange}
        handleResend={handleResend}
        pathname="/auth/register"
        handleVerifyOtp={handleVerifyOtp}
        submitBtnText={otpStatus?.loading ? "Verifying..." : "Continue"}
        loading={otpStatus?.loading}
        resendLoading={resendOtpStatus?.loading}
      />
    )
  );
};

export default NewUserOtpVerificationPage;
