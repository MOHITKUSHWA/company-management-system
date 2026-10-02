"use client";
import { useFormik } from "formik";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ChangePasswordProps {
  open: boolean;
  handleClose: () => void;
  loading?: boolean;
  formik: ReturnType<
    typeof useFormik<{
      currentPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    }>
  >;
}

const ChangePassword = ({ open, handleClose, formik , loading }: ChangePasswordProps) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex gap-3 flex-col mb-3 mt-2">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="font-text">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Current Password"
                className="mb-2"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly={loading}
              />
              {formik.touched.currentPassword &&
                formik.errors.currentPassword && (
                  <p className="text-sm text-destructive">
                    {formik.errors.currentPassword}
                  </p>
                )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="New Password"
                className="mb-2"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly={loading}
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-sm text-destructive">
                  {formik.errors.newPassword}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                placeholder="Confirm New Password"
                name="confirmNewPassword"
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly={loading}
              />
              {formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword && (
                  <p className="text-sm text-destructive">
                    {formik.errors.confirmNewPassword}
                  </p>
                )}
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-2 w-full mt-4">
              <Button className="w-1/2" onClick={handleClose} variant="outline" disabled={loading}>
                Cancel
              </Button>
              <Button  className="w-1/2" type="submit" disabled={loading}>
                {loading ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
