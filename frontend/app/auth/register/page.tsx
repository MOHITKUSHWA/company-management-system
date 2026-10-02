"use client";
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
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { setSignUpData, signUpCompany } from "@/redux/reducer/auth.slice";
import { useEffect } from "react";
import { setCookie } from "cookies-next";
import { registerSchema } from "@/utils/validation/auth.validation";

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const createCompanyStatus: any = useAppSelector(
    (state) => state.auth.createUser,
  );

  const formik = useFormik({
    initialValues: {
      companyName: "",
      nameOfowner: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      let payload = {
        email: values.email,
        password: values.password,
        companyName: values.companyName,
        nameOfOwner: values.nameOfowner,
      };
      dispatch(signUpCompany(payload));
    },
  });

  useEffect(() => {
    if (createCompanyStatus?.success) {
      toast({
        title: "Registration successful!",
        description: "Your company workspace has been created.",
      });
      setCookie("email", formik.values.email);
      formik.resetForm();
      dispatch(setSignUpData());
      setTimeout(() => {
        router.push("/auth/register/otp-verification");
      }, 2000);
    } else if (createCompanyStatus?.error) {
      if (createCompanyStatus?.data?.isverFied === false) {
        toast({
          title: "Email not verified!",
          description: "Please verify your email before logging in.",
        });
        localStorage.setItem("email", formik.values.email);
        formik.resetForm();
        dispatch(setSignUpData());
        setTimeout(() => {
          router.push("/auth/register/otp-verification");
        }, 2000);
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed!",
          description: createCompanyStatus?.data?.message,
        });
        dispatch(setSignUpData());
      }
    }
  }, [createCompanyStatus]);

  return (
    <div className="min-h-screen grid place-items-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
            <div className="font-display font-bold text-xl">P</div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Start your journey
          </CardTitle>
          <CardDescription>Create a workspace for your company</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Acme Inc."
                name="companyName"
                onChange={formik.handleChange}
                value={formik.values.companyName}
              />
              {formik.touched.companyName && formik.errors.companyName && (
                <p className="text-sm text-destructive">
                  {formik.errors.companyName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nameOfowner">Name of Owner</Label>
              <Input
                id="nameOfowner"
                placeholder="John Doe"
                name="nameOfowner"
                onChange={formik.handleChange}
                value={formik.values.nameOfowner}
              />
              {formik.touched.nameOfowner && formik.errors.nameOfowner && (
                <p className="text-sm text-destructive">
                  {formik.errors.nameOfowner}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                placeholder="name@company.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-sm text-destructive">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-sm text-destructive">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="comfirmPassword">Confirm Password</Label>
              <Input
                id="comfirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
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
              disabled={createCompanyStatus?.loading}
              type="submit"
              className="w-full"
            >
              {createCompanyStatus?.loading
                ? "Creating..."
                : "Create Workspace"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              className="text-primary hover:underline font-medium cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
