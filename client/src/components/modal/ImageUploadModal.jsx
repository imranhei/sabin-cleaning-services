import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ImageUploadModal = ({
  children,
  title = "Upload Image",
  oldImage = "",
  name = "image",
  isLoading = false,
  onSubmit = () => {},
}) => {
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setImageFile(file);
  };

  const handleRemove = () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSave = () => {
    if (imageFile) onSubmit(imageFile);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-xl max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center tracking-tight text-foreground pb-6">
            {title}
          </DialogTitle>
          <Avatar className="size-40 mx-auto relative">
            <AvatarImage
              src={imageFile ? URL.createObjectURL(imageFile) : oldImage}
              alt={name || "@user"}
              className="object-cover"
            />
            <AvatarFallback>{name?.slice(0, 2)?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <DialogDescription className="text-sm text-muted-foreground pb-2 text-center">
            Drag & drop or click to upload your file
          </DialogDescription>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              id="image-input"
              onChange={handleChange}
            />

            {!imageFile ? (
              <label
                htmlFor="image-input"
                className="block text-sm text-muted-foreground"
              >
                Choose an image file to upload
              </label>
            ) : (
              <div className="flex justify-between items-center">
                <span className="truncate">{imageFile.name}</span>
                <button
                  onClick={handleRemove}
                  className="text-red-500 text-xs font-bold"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setImageFile(null);
                setOpen(false);
              }}
              className="w-full"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              disabled={isLoading || !imageFile}
              className="w-full"
            >
              {isLoading ? "Uploading..." : "Save"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
