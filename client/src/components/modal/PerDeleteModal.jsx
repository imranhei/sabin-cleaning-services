import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  getQuotes,
  resetQuote,
  deleteQuote,
} from "@/redux/admin/quote-slice";
import { useNavigate } from "react-router-dom";

const PerDeleteModal = ({
  children,
  ids,
  setIds = () => {},
  resetQut = false,
  page = 1,
  limit = 20,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.quote);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteQuote(ids)).then((res) => {
      if (res.payload?.success) {
        toast.success(
          res.payload?.message || "Quote permanently deleted successfully"
        );
        dispatch(getQuotes({ page, limit, trashed: true }));
        setIds([]);
        resetQut && dispatch(resetQuote());
        setOpen(false);
        resetQut && navigate(-1);
      } else {
        toast.error(res.payload?.message || "Something went wrong");
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value); // open/close the modal
        if (!value) {
          setIds([]);
        } // if modal is closed, reset ids
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center hidden sm:block">
            <div className="flex items-center justify-center mx-auto rounded-full size-20 bg-red-50">
              <Trash2 className="text-red-500 size-10" />
            </div>
          </DialogTitle>
          <DialogDescription className="text-center py-2 text-black/70 font-bold text-xl">
            Permanently Delete Quote Request?
          </DialogDescription>
          <div className="text-center text-muted-foreground">
            Are you sure you want to permanently delete this quote request?
          </div>
          <div className="flex items-center justify-center gap-4 pt-6">
            <Button
              className="w-full bg-gray-100 hover:bg-gray-200 text-black/70 shadow-none rounded-full"
              onClick={() => {
                setOpen(false);
                setIds([]);
              }}
            >
              No, Keep It.
            </Button>
            <Button
              className="w-full bg-rose-400 hover:bg-rose-500 rounded-full"
              onClick={handleDelete}
            >
              {isLoading && <Loader className="mr-2 animate-spin" />}
              Yes, Delete It
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PerDeleteModal;
