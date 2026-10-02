import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

interface CreateRolesProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  formik?: ReturnType<
    typeof useFormik<{
      role: string;
      premistion: string;
    }>
  >;
  btnText?: string;
  loading?: boolean;
}

const CreateRoles = ({
  open = false,
  onClose = () => {},
  title = "",
  formik,
  btnText = "Submit",
  loading = false,
}: CreateRolesProps) => {
  const premistion = ["View", "Edit"];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="w-full flex gap-4 flex-col">
          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              placeholder="Enter Employ Role"
              value={formik?.values.role}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
            />
            {formik?.errors.role && formik.touched.role && (
              <p className="text-sm text-destructive">{formik.errors.role}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="premistion">Premistion</Label>
            <Select
              onValueChange={(value) =>
                formik?.setFieldValue("premistion", value)
              }
              value={formik?.values.premistion}
            >
              <SelectTrigger id="premistion">
                <SelectValue placeholder="Select a job title" />
              </SelectTrigger>
              <SelectContent>
                {premistion.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik?.errors.premistion && formik.touched.premistion && (
              <p className="text-sm text-destructive">
                {formik.errors.premistion}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onClose()}
              disabled={loading}
            >
              Cancle
            </Button>
            <Button
              disabled={loading}
              className="w-full"
              onClick={() => formik?.handleSubmit()}
            >
              {btnText}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoles;
