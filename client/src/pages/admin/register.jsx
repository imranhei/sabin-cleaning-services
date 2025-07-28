import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { registerUser } from "@/redux/admin/account-slice";
import { Eye, EyeClosed } from "lucide-react";

const initialState = {
  Name: "",
  username: "",
  password: "",
  confirmPassword: "",
  role: "admin",
};

const fields = [
  { label: "Name", name: "Name", type: "text", required: true },
  { label: "Username", name: "username", type: "text", required: true },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
    isPassword: true,
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    required: true,
    isPassword: true,
  },
];

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.account);
  const [formData, setFormData] = useState(initialState);
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // //minimum password length check
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    dispatch(registerUser(formData)).then((res) => {
      if (res.payload?.success) {
        toast.success("User registered successfully");
        setFormData(initialState);
      } else {
        const errorMsg =
          res?.error?.message ||
          res?.payload?.message ||
          "Something went wrong";
        toast.error(errorMsg);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 min-h-[85vh] items-center justify-center">
      <div className="mx-auto w-full max-w-md px-6 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center tracking-tight text-foreground">
          Add New User
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map(
            ({ label, name, type = "text", required, isPassword }) => (
              <div key={name} className="space-y-2 relative">
                <Label className="block text-sm font-medium text-foreground">
                  {label} {required && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  type={
                    isPassword && visible[name]
                      ? "text"
                      : isPassword
                      ? "password"
                      : type
                  }
                  required={required}
                  value={formData[name] || ""}
                  onChange={handleChange(name)}
                />
                {isPassword &&
                  (visible[name] ? (
                    <Eye
                      className="absolute right-4 bottom-2.5 size-4 cursor-pointer"
                      onClick={() =>
                        setVisible((prev) => ({ ...prev, [name]: false }))
                      }
                    />
                  ) : (
                    <EyeClosed
                      className="absolute right-4 bottom-2.5 size-4 cursor-pointer"
                      onClick={() =>
                        setVisible((prev) => ({ ...prev, [name]: true }))
                      }
                    />
                  ))}
              </div>
            )
          )}

          <div className="flex items-center gap-6 text-sm font-medium text-foreground">
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
            Register User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
