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

const initialstate = {
  name: "",
  phone: "",
  email: "",
  address: "",
  date: "",
  msg: "",
};

const QuoteModal = ({ children }) => {
  const [formData, setFormData] = useState(initialstate);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can handle form logic here (like sending data)
    console.log("Form submitted", formData);

    // Then close the modal
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-5xl max-w-full">
        <DialogHeader>
          {/* <DialogTitle className="text-center hidden sm:block">Get a Quote</DialogTitle> */}
          <DialogDescription>
            <div className="flex flex-col sm:flex-row justify-between items-center py-6 space-y-6">
              <div className="flex-1 text-center">
                <h1 className="text-3xl font-bold text-primary">Get a Quote</h1>
                <h5 className="text-muted-foreground text-base">
                  Call for cleaning quotes
                </h5>
              </div>
              <div className="felx flex-col space-y-2 sm:w-2/3 w-full">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="text"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Phone *"
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
                  <Input type="date" placeholder="Select a date" />
                </div>
                <Textarea
                  placeholder="Type your message here."
                  className="min-h-24 max-h-48"
                  value={formData.msg}
                  onChange={(e) =>
                    setFormData({ ...formData, msg: e.target.value })
                  }
                />
                <Button className="w-full bg-[#79c043]" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
