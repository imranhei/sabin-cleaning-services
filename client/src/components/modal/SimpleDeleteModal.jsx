import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

const SimpleDeleteModal = ({
  children,
  onSubmit = () => {},
  info = "",
  title = "",
  isLoading = false,
  id = "",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={(value) => setOpen(value)} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center tracking-tight text-foreground pb-6">
            Delete
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground pb-6 text-center">
            {title}{" "}
            <span className="text-muted-foreground font-semibold">{info}</span>
          </DialogDescription>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => onSubmit(id)}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleDeleteModal;
