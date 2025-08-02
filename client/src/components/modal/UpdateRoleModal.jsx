import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { updateUserRole } from "@/redux/admin/user-slice";

const UpdateRoleModal = ({ children, initialFormData }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role: role,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await dispatch(updateUserRole({ 
        id: formData._id, 
        role: formData.role 
      })).unwrap();

      toast.success("Role updated successfully");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleOpenChange = (value) => {
    setOpen(value);
    if (value) {
      setFormData(initialFormData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center tracking-tight text-foreground pb-6">
            Update Role
          </DialogTitle>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex items-center gap-6 text-sm font-medium text-foreground pb-2">
              <span>Role</span>
              {["admin", "super-admin"].map((role) => (
                <div key={role} className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.role === role}
                    onCheckedChange={() => handleRoleChange(role)}
                  />
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Role"}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoleModal;
