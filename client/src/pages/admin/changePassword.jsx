import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";
import { resetPassword } from "@/redux/admin/user-slice";

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const fields = [
  {
    label: "Old Password",
    name: "oldPassword",
    type: "password",
    required: true,
  },
  {
    label: "New Password",
    name: "newPassword",
    type: "password",
    required: true,
  },
  {
    label: "Confirm New Password",
    name: "confirmPassword",
    type: "password",
    required: true,
  },
];

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(initialState);
  const [visible, setVisible] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    //minimum password length check
    if (
      formData.newPassword.length < 6 ||
      formData.confirmPassword.length < 6
    ) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New Password and Confirm Password does not match");
      return;
    }

    dispatch(resetPassword(formData)).then((res) => {
      if (res.payload?.success) {
        toast.success("Password reset successful");
        setFormData(initialState);
      } else {
        toast.error(res.payload?.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 min-h-[85vh] items-center justify-center">
      <div className="mx-auto w-full max-w-md px-6 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center tracking-tight text-foreground">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          {fields.map((field) => (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <div className="relative">
                <Input
                  type={visible[field.name] ? "text" : field.type}
                  id={field.name}
                  placeholder={field.label}
                  value={formData[field.name]}
                  onChange={handleChange(field.name)}
                  className="pr-10"
                />

                <div
                  className="absolute inset-y-0 right-0 flex items-center"
                  onClick={() =>
                    setVisible({
                      ...visible,
                      [field.name]: !visible[field.name],
                    })
                  }
                >
                  {visible[field.name] ? (
                    <Eye className="mr-4 h-4 w-4" />
                  ) : (
                    <EyeClosed className="mr-4 h-4 w-4" />
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
