import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "lucide-react";
import ImageUploadModal from "@/components/modal/ImageUploadModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateProfile } from "@/redux/auth-slice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [editableName, setEditableName] = useState(user?.name || "");

  const handleUpdate = () => {
    if (editableName && editableName !== user.name) {
      const formData = new FormData();
      formData.append("name", editableName);
      dispatch(updateProfile(formData)).then((res) => {
        if (res.payload?.success) {
          toast.success("Profile updated successfully");
        } else {
          toast.error(res.payload || "Something went wrong");
        }
      });
    }
  };

  const handleImageUpload = (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    if (user?.pro_pic) formData.append("oldImage", user.pro_pic);

    dispatch(updateProfile(formData)).then((res) => {
      if (res.payload?.success) {
        toast.success("Image updated successfully");
      } else {
        toast.error(res.payload || "Something went wrong");
      }
    });
  };

  useEffect(() => {
    if (user?.name) {
      setEditableName(user.name);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex-col space-y-4 border rounded p-6 w-full max-w-[450px] min-w-80">
        <Avatar className="size-40 mx-auto relative">
          <AvatarImage
            src={user?.pro_pic ? user.pro_pic : ""}
            alt={user?.name || "@user"}
            className="object-cover"
          />
          <AvatarFallback>
            {user?.name.slice(0, 2)?.toUpperCase()}
          </AvatarFallback>
          <ImageUploadModal
            title="Upload Image"
            fieldName="image"
            isLoading={isLoading}
            onSubmit={handleImageUpload}
            oldImage={user?.pro_pic}
            name={user?.name}
          >
            <div className="absolute z-20 bottom-5 right-5 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-md cursor-pointer">
              <Camera className="size-4" />
            </div>
          </ImageUploadModal>
        </Avatar>
        <div className="w-full space-y-2">
          <div className="flex items-center">
            <h1 className="w-20">Name</h1>
            <Input
              className="flex-1"
              value={editableName}
              onChange={(e) => setEditableName(e.target.value)}
            />
          </div>
          <div className="flex">
            <h1 className="w-20">Role</h1>
            <p>{user?.role}</p>
          </div>
        </div>
        <Button
          className="float-end"
          onClick={handleUpdate}
          disabled={editableName === user?.name || isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
