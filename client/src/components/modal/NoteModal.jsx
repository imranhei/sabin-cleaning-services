import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuote } from "@/redux/admin/quote-slice";

function NoteModal({ children, id, prevNote = "" }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.quote);
  const [formData, setFormData] = useState(prevNote);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.trim() === prevNote.trim()) return;
    // Dispatch the createQuote action
    dispatch(updateQuote({ id, note: formData })).then((res) => {
      if (res.payload?.success) {
        toast.success("Note updated successfully");
        setOpen(false);
      } else {
        toast.error(res.payload || "Something went wrong");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-w-full">
        <DialogHeader>
          <DialogTitle className="text-center hidden sm:block"></DialogTitle>
          <form onSubmit={handleSubmit}>
            <div className="py-6 space-y-4">
              <Textarea
                placeholder="Type your note here..."
                className="min-h-32 max-h-48"
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
              />
              <div className="flex gap-4 items-center">
                <Button
                  type="button"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-[#79c043]" type="submit">
                  {isLoading && <Loader className="mr-2 animate-spin" />} Save
                  Note
                </Button>
              </div>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default NoteModal;
