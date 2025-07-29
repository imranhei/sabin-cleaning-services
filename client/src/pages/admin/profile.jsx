import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, role, isLoading } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex-col space-y-4 border rounded p-6 max-w-[500px] w-96">
        <Avatar className="size-40 mx-auto">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
