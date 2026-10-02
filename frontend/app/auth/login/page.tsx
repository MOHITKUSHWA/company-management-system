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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { setLoginData, signIn } from "@/redux/reducer/auth.slice";
import { setCookie } from "cookies-next";
import { loginSchema } from "@/utils/validation/auth.validation";

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedTabs, setSelectedTabs] = useState("company");
  const dispatch = useAppDispatch();
  const login: any = useAppSelector((state) => state.auth.login);

  useEffect(() => {
    if (login?.success) {
      toast({
        title: "Login successful!",
        description: "You have successfully logged in.",
      });
      let token = login.data?.accessToken;
      setCookie("token", token, {
        maxAge: 24 * 60 * 60, // 30 days
        secure: false,
      });
      dispatch(setLoginData())
      setTimeout(() => router.push("/dashboard/company"), 1000);
    } else if (login?.error) {
      toast({
        variant: "destructive",
        title: "Login failed!",
        description: login?.data?.message,
      });
      dispatch(setLoginData())
    }
  }, [login]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard/company");
    }
  }, [router]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (value) => {
      let payload = {
        email: value.email,
        password: value.password,
        role: selectedTabs,
      };
      dispatch(signIn(payload));
    },
  });

  /**
   * @param tab
   * that is used to change tabs for login
   */
  const handleChangeTabs = (tab: string) => {
    if (tab === selectedTabs) return;
    setSelectedTabs(tab);
    formik.resetForm();
  };

  return (
    <div className="min-h-screen grid place-items-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
            <div className="font-display font-bold text-xl">P</div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="company" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="company"
                onClick={() => handleChangeTabs("company")}
                disabled={login?.loading}
                className="cursor-pointer"
              >
                <Building2 className="mr-2 h-4 w-4" /> Company
              </TabsTrigger>
              <TabsTrigger
                value="employee"
                onClick={() => handleChangeTabs("employee")}
                disabled={login?.loading}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" /> Employee
              </TabsTrigger>
            </TabsList>

            <TabsContent value="company">
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-company">Email</Label>
                  <Input
                    id="email-company"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-destructive">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-company">Password</Label>
                    <span className="text-xs text-primary hover:underline cursor-pointer" onClick={()=> router.push("/auth/forgot-password")}>
                      Forgot password?
                    </span>
                  </div>
                  <Input
                    id="password-company"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Password"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={login?.loading}
                >
                  {login?.loading ? "Loading ..." : "Log in as Company"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="employee">
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-employee">Email</Label>
                  <Input
                    id="email-employee"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-destructive">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-employee">Password</Label>
                  </div>
                  <Input
                    id="password-employee"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-destructive">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={login?.loading}
                >
                  {login?.loading ? "Loading ..." : "Log in as Employee"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Don't have a company account?{" "}
            <a
              className="text-primary hover:underline font-medium cursor-pointer"
              onClick={() => router.push("/auth/register")}
            >
              Register
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
