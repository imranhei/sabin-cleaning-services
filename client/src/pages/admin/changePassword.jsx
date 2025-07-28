import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
};

const fields = [
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

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.account);
  const [formData, setFormData] = useState(initialState);
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    //minimum password length check
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    dispatch();
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
                  type={
                    field.isPassword
                      ? visible[field.name]
                        ? "text"
                        : "password"
                      : field.type
                  }
                  id={field.name}
                  placeholder={field.label}
                  value={formData[field.name]}
                  onChange={handleChange(field.name)}
                  className="pr-10"
                />
                {field.isPassword && (
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
                )}
              </div>
            </div>
          ))}

          <Button type="submit" className="w-full" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
