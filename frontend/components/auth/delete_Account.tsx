import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DeleteAccountProps {
  open: boolean;
  handleClose: () => void;
  handleDeleteAccount?: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  btn?: string;
}

const DeleteAccount = ({
  open,
  handleClose,
  handleDeleteAccount,
  loading,
  title = "Delete Account",
  description = "Are you sure you want to delete your account? This action cannot be undone.",
  btn = "Delete Account",
}: DeleteAccountProps) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        <DialogFooter>
          <div className="flex gap-2 w-full">
            <Button
              className="w-1/2"
              onClick={handleClose}
              variant="outline"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className="w-1/2"
              onClick={handleDeleteAccount}
              type="button"
              variant="destructive"
              disabled={loading}
            >
              {loading ? "Deleting..." : btn}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccount;
