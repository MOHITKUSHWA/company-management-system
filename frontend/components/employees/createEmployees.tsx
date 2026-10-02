import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  isAddOpen: boolean;
  handleClose: () => void;
  formik: ReturnType<
    typeof useFormik<{
      firstName: string;
      lastName: string;
      email: string;
      title: string;
    }>
  >;
  loading?: boolean;
  submitBtnText?: string;
  title?: string;
}

const CreateAndEditEmployees = ({
  isAddOpen,
  handleClose,
  formik,
  loading,
  title = "Add New Employee",
  submitBtnText = "Add Employee",
}: Props) => {
  const baseRoles = ["guest", "manager", "accountant", "employee"];
  const roles = formik.values.title
    ? Array.from(new Set([...baseRoles, formik.values.title]))
    : baseRoles;
  return (
    <Dialog open={isAddOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Full Name</Label>
            <Input
              id="firstName"
              placeholder="Jane"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.firstName && formik.touched.firstName && (
              <p className="text-sm text-destructive">
                {formik.errors.firstName}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.lastName && formik.touched.lastName && (
              <p className="text-sm text-destructive">
                {formik.errors.lastName}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="jane@company.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-sm text-destructive">{formik.errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Select
              onValueChange={(value) => formik.setFieldValue("title", value)}
              value={formik.values.title}
            >
              {" "}
              <SelectTrigger id="title">
                <SelectValue placeholder="Select a job title" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role} className="">
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.errors.title && formik.touched.title && (
              <p className="text-sm text-destructive">{formik.errors.title}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : submitBtnText}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAndEditEmployees;
