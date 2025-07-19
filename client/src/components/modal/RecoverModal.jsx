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
import { History, Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  softDeleteQuote,
  getQuotes,
  resetQuote,
  recoverQuote,
} from "@/redux/admin/quote-slice";
import { useNavigate } from "react-router-dom";

const RecoverModal = ({
  children,
  ids,
  setIds = () => {},
  resetIds = true,
  resetQut = false,
  trashed = true,
  page = 1,
  limit = 20,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.quote);
  const [open, setOpen] = useState(false);

  const handleRecover = () => {
    dispatch(recoverQuote(ids)).then((res) => {
      if (res.payload?.success) {
        toast.success(res.payload?.message || "Quote recovered successfully");
        dispatch(getQuotes({ trashed, page, limit }));
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
          resetIds && setIds([]);
        } // if modal is closed, reset ids
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center hidden sm:block">
            <div className="flex items-center justify-center mx-auto rounded-full size-20 bg-green-100">
              <History className="text-green-500 size-10" />
            </div>
          </DialogTitle>
          <DialogDescription className="text-center py-2 text-black/70 font-bold text-xl">
            Recover Quote Request?
          </DialogDescription>
          <div className="text-center text-muted-foreground">
            Are you sure you want to recover this quote?
          </div>
          <div className="flex items-center justify-center gap-4 pt-6">
            <Button
              className="w-full bg-gray-100 hover:bg-gray-200 text-black/70 shadow-none rounded-full"
              onClick={() => {
                setOpen(false);
                resetIds && setIds([]);
              }}
            >
              No, Cancel
            </Button>
            <Button
              className="w-full bg-green-400 hover:bg-green-500 rounded-full"
              onClick={handleRecover}
            >
              {isLoading && <Loader className="mr-2 animate-spin" />}
              Yes, Recover
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RecoverModal;
