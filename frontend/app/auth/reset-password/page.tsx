"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import {
  resetPasswordSlice,
  setResetPasswordData,
} from "@/redux/reducer/auth.slice";
import { useToast } from "@/hooks/use-toast";
import { resetSchema } from "@/utils/validation/auth.validation";

interface resetPasswordStatusInterface {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: {
    message?: string;
  } | null;
}

const RestPasswordPage = () => {
  const resetPasswordStatus: resetPasswordStatusInterface = useAppSelector(
    (state) => state.auth.resetPassword,
  );
  const { toast } = useToast();
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    let restToken = getCookie("reset-token") as string | null;
    if (!restToken) {
      router?.push("/auth/login");
    }
    setToken(restToken);
  }, []);

  useEffect(() => {
    if (resetPasswordStatus?.success) {
      toast({
        title: "Password reset successful!",
        description: "Your password has been reset successfully.",
      });
      deleteCookie("reset-token");
      setToken(null);
      dispatch(setResetPasswordData());
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    } else if (resetPasswordStatus?.error) {
      toast({
        variant: "destructive",
        title: "Password reset failed!",
        description: resetPasswordStatus?.data?.message || "Please try again",
      });
      dispatch(setResetPasswordData());
    }
  }, [resetPasswordStatus]);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetSchema,
    onSubmit: (data) => {
      dispatch(
        resetPasswordSlice({
          newPassword: data.newPassword,
          resetToken: token as string,
        }),
      );
    },
  });

  return (
    token && (
      <div className="min-h-screen grid place-items-center bg-muted/30 p-4 font-sans">
        <Card className="w-full max-w-md shadow-lg border-muted">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
              <KeyRound className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Set new password
            </CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <p className="text-sm text-destructive">
                    {formik.errors.newPassword}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={resetPasswordStatus.loading}
              >
                {resetPasswordStatus.loading
                  ? "Resetting..."
                  : "Reset Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default RestPasswordPage;
