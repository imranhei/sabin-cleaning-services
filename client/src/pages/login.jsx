import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeClosed, Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/auth-slice";
import { toast } from "sonner";

const initialstate = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialstate);
  const [show, setShow] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Input validation
    if (!formData.username && !formData.password) {
      toast.error("Please enter username and password");
      return;
    }

    if (!formData.username) {
      toast.error("Please enter username");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter password");
      return;
    }

    try {
      const result = dispatch(login(formData)).then((res) => {
        if (res.payload?.success) {
          toast.success("Login successful");
          navigate("/admin/dashboard");
        } else {
          toast.error(res.payload || "Login failed");
        }
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative">
      <div className="absolute top-0 left-0 p-4">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="size-4 cursor-pointer" />
          Home
        </Link>
      </div>
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your username and password below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">
                    Username <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="username"
                    type="username"
                    placeholder="m@example.com"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={show ? "text" : "password"}
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    {show ? (
                      <Eye
                        className="absolute right-4 top-1/2 -translate-y-1/2 size-4 cursor-pointer"
                        onClick={() => setShow(!show)}
                      />
                    ) : (
                      <EyeClosed
                        className="absolute right-4 top-1/2 -translate-y-1/2 size-4 cursor-pointer"
                        onClick={() => setShow(!show)}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full bg-[#79c043]">
                    {isLoading && <Loader className="mr-2 animate-spin" />}
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
