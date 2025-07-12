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
import { ArrowBigLeft, ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialstate = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialstate);
  const [show, setShow] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative">
      <div className="absolute top-0 left-0 p-4">
        <Link to="/" className="flex items-center gap-2" ><ArrowLeft className="size-4 cursor-pointer" />Home</Link>
      </div>
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
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
