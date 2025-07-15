import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuote } from "@/redux/admin/quote-slice";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const initialstate = {
  name: "",
  phone: "",
  email: "",
  address: "",
  msg: "",
};

const QuoteModal = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.quote);
  const [formData, setFormData] = useState(initialstate);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Dispatch the createQuote action
    dispatch(createQuote(formData)).then((res) => {
      if (res.payload?.success) {
        toast.success("Quote request sent successfully");
        setOpen(false);
      } else {
        toast.error(res.payload || "Something went wrong");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-5xl max-w-full">
        <DialogHeader>
          <DialogTitle className="text-center hidden sm:block"></DialogTitle>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row justify-between items-center py-6 space-y-6">
              <div className="flex-1 text-center">
                <p className="text-3xl font-bold text-primary">Get a Quote</p>
                <p className="text-muted-foreground text-base">
                  Call for cleaning quotes
                </p>
              </div>
              <div className="felx flex-col space-y-2 sm:w-2/3 w-full">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="text"
                    placeholder="Name *"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Phone *"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                <Textarea
                  placeholder="Type your message here. *"
                  className="min-h-24 max-h-48"
                  value={formData.msg}
                  onChange={(e) =>
                    setFormData({ ...formData, msg: e.target.value })
                  }
                />
                <Button className="w-full bg-[#79c043]">
                  {isLoading && <Loader className="mr-2 animate-spin" />}Submit
                </Button>
              </div>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
