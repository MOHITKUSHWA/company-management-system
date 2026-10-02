"use client";
import { DashboardLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { useFormik } from "formik";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import PageLoader from "@/components/pageLoader";
import {
  changePasswordSlice,
  deleteAccountSlice,
  getDetails,
  profileUploadSlice,
  setChangePasswordData,
  setDeleteAccountData,
  setprofileUpdateData,
  setprofileUploadData,
  updateProfileSlice,
} from "@/redux/reducer/auth.slice";
import ChangePassword from "@/components/auth/change_password";
import DeleteAccount from "@/components/auth/delete_Account";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import {
  changePasswordSchema,
  updateProfileSchema,
} from "@/utils/validation/auth.validation";

const CompanyProfile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userData: any = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const changePasswordStatus = useAppSelector(
    (state) => state.auth.changePassword,
  );
  const deleteAccountStatus = useAppSelector(
    (state) => state.auth.deleteAccount,
  );

  const updateProfileStatus = useAppSelector(
    (state) => state.auth.updateProfile,
  );

  const profileImageUploadStatus = useAppSelector(
    (state) => state.auth.profileUpload,
  );

  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  /**
   *  Formik instance for managing change password form state and validation
   */
  let changePassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      let payload = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      dispatch(changePasswordSlice(payload));
    },
  });

  /**
   * Change password modal close handler, resets the form and closes the modal
   */
  const handleChangePasswordClose = () => {
    if (changePasswordStatus.loading) return;
    changePassword.resetForm();
    setChangePasswordOpen(false);
  };

  /**
   *  that is used for managing profile data ....
   */
  const formik = useFormik({
    initialValues: {
      companyName: userData?.companyName || "",
      email: userData?.email || "",
      nameOfOwner: userData?.nameOfOwner || "",
    },
    enableReinitialize: true,
    validationSchema: updateProfileSchema,
    onSubmit: (values) => {
      let payload = {
        companyName: values.companyName,
        nameOfOwner: values.nameOfOwner,
      };
      dispatch(updateProfileSlice(payload));
    },
  });

  /**
   * that useEffect is used for showing toast notifications based on the profile update status.
   */
  useEffect(() => {
    if (updateProfileStatus.success) {
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      dispatch(setprofileUpdateData());
    } else if (updateProfileStatus.error) {
      toast({
        title: "Update Failed",
        description:
          (updateProfileStatus.data as any)?.message ||
          "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      dispatch(setprofileUpdateData());
    }
  }, [updateProfileStatus]);

  /**
   * that useEffect is used for showing toast notifications based on the change password status.
   */
  useEffect(() => {
    if (changePasswordStatus.success) {
      handleChangePasswordClose();
      toast({
        title: "Password Changed",
        description: "Your password has been changed successfully.",
      });
      dispatch(setChangePasswordData());
    } else if (changePasswordStatus.error) {
      toast({
        title: "Change Password Failed",
        description:
          (changePasswordStatus?.data as any)?.message ||
          "Failed to change password. Please try again.",
        variant: "destructive",
      });
      dispatch(setChangePasswordData());
    }
  }, [changePasswordStatus]);

  /**
   * that useEffect is used for showing toast notifications based on the delete account status.
   */
  useEffect(() => {
    if (deleteAccountStatus.success) {
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully.",
      });
      dispatch(setDeleteAccountData());
      deleteCookie("token");
      setDeleteAccountOpen(false);
      router.push("/auth/register");
    } else if (deleteAccountStatus.error) {
      toast({
        title: "Delete Account Failed",
        description:
          (deleteAccountStatus.data as any)?.message ||
          "Failed to delete account. Please try again.",
        variant: "destructive",
      });
      dispatch(setDeleteAccountData());
    }
  }, [deleteAccountStatus]);

  /**
   * that handle is used for Delete Account .....
   */

  const handleDeleteAccount = () => {
    dispatch(deleteAccountSlice({}));
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (profileImageUploadStatus.loading) return;
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      let formData = new FormData();
      formData.append("profileImage", file);
      dispatch(profileUploadSlice(formData));
    }
  };

  /**
   * that useEffect is used for showing toast notifications based on the profile image upload status.
   */

  useEffect(() => {
    if (profileImageUploadStatus.success) {
      toast({
        title: "Profile Image Updated",
        description: "Your profile image has been updated successfully.",
      });
      dispatch(getDetails({}));
      dispatch(setprofileUploadData());
    } else if (profileImageUploadStatus.error) {
      toast({
        title: "Profile Image Update Failed",
        description:
          (profileImageUploadStatus.error as any)?.message ||
          "Failed to update profile image. Please try again.",
        variant: "destructive",
      });
      dispatch(setprofileUploadData());
    }
  }, [profileImageUploadStatus]);

  return (
    <DashboardLayout>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="max-w-2xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Profile Settings
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your personal information and preferences.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your public profile details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative group cursor-pointer">
                    {profileImageUploadStatus.loading ? (
                      <div className="h-24 w-24  ring-2 ring-muted ring-offset-2 flex items-center justify-center bg-black/40 rounded-full">
                        <Spinner />
                      </div>
                    ) : (
                      <Avatar className="h-24 w-24 ring-2 ring-muted ring-offset-2">
                        <AvatarImage src={userData?.profileImage} />
                        <AvatarFallback className="text-xl font-bold">
                          {userData?.companyName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <button
                      disabled={profileImageUploadStatus?.loading}
                      className="cursor-pointer absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera className="h-6 w-6" />
                      <input
                        onChange={handleProfileImageChange}
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </button>
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          placeholder="Acme Inc."
                          name="companyName"
                          onChange={formik.handleChange}
                          value={formik.values.companyName}
                          readOnly={!isEditing || updateProfileStatus.loading}
                        />
                        {formik.touched.companyName &&
                          formik.errors.companyName && (
                            <p className="text-sm text-destructive">
                              {formik?.errors.companyName as string}
                            </p>
                          )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nameOfOwner">Name of Owner</Label>
                        <Input
                          id="nameOfOwner"
                          placeholder="John Doe"
                          name="nameOfOwner"
                          onChange={formik.handleChange}
                          value={formik.values.nameOfOwner}
                          readOnly={!isEditing || updateProfileStatus.loading}
                        />
                        {formik.touched.nameOfOwner &&
                          formik.errors.nameOfOwner && (
                            <p className="text-sm text-destructive">
                              {formik?.errors.nameOfOwner as string}
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
                          readOnly
                        />
                        {formik.errors.email && formik.touched.email && (
                          <p className="text-sm text-destructive">
                            {formik.errors.email as string}
                          </p>
                        )}
                      </div>
                      {isEditing ? (
                        <div className="flex gap-4">
                          <Button
                            disabled={updateProfileStatus.loading}
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={updateProfileStatus.loading}
                          >
                            {updateProfileStatus.loading
                              ? "Updating..."
                              : "Update Profile"}
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button
                            type="submit"
                            className="w-full"
                            onClick={() => setIsEditing(true)}
                          >
                            Edit Profile
                          </Button>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col lg:flex-row mg:flex-col gap-6">
              <Card className="xl:w-1/2 md:w-full   ">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your account password to keep it secure.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setChangePasswordOpen(true)}>
                    Change Password
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-destructive/20 bg-destructive/5 xl:w-1/2 md:w-full">
                <CardHeader>
                  <CardTitle className="text-destructive">
                    Delete Account
                  </CardTitle>
                  <CardDescription>
                    Permanently remove your account and all associated data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="destructive"
                    onClick={() => setDeleteAccountOpen(true)}
                  >
                    Delete My Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <ChangePassword
            open={changePasswordOpen}
            handleClose={handleChangePasswordClose}
            formik={changePassword}
            loading={changePasswordStatus.loading}
          />
          <DeleteAccount
            open={deleteAccountOpen}
            handleClose={() => setDeleteAccountOpen(false)}
            handleDeleteAccount={handleDeleteAccount}
            loading={deleteAccountStatus.loading}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default CompanyProfile;
