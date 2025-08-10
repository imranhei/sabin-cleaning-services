import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { createBlog, updateBlog, getBlog } from "@/redux/admin/blog-slice";
import { ArrowLeft, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const AdminBlogForm = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const { currentBlog, isLoading } = useSelector((state) => state.blog);
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    banner: "",
    doc: "", // HTML content as string
    gallery: [],
  });

  useEffect(() => {
    if (mode === "edit" && blogId) {
      dispatch(getBlog(blogId));
    }
  }, [mode, blogId]);

  useEffect(() => {
    if (mode === "edit" && currentBlog && currentBlog._id === blogId) {
      setBlog({
        title: currentBlog.title,
        description: currentBlog.description,
        banner: currentBlog.banner,
        doc: currentBlog.doc,
        gallery: currentBlog.gallery || [],
      });
    }
  }, [currentBlog]);

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlog((prev) => ({ ...prev, banner: file }));
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setBlog((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...files],
    }));
  };

  const removeGalleryImage = (index) => {
    setBlog((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("description", blog.description);
      formData.append("doc", blog.doc);

      if (blog.banner instanceof File) {
        formData.append("banner", blog.banner);
      } else {
        formData.append("oldBanner", blog.banner); // send existing URL
      }

      blog.gallery.forEach((file) => {
        if (file instanceof File) {
          formData.append("gallery", file);
        }
      });

      // Send existing gallery URLs separately
      const existingGalleryUrls = blog.gallery.filter(
        (item) => !(item instanceof File)
      );
      formData.append("existingGallery", JSON.stringify(existingGalleryUrls));

      if (mode === "create") {
        dispatch(createBlog(formData)).then((res) => {
          if (res.payload?.success) {
            toast.success("Blog created successfully");
            navigate("/admin/blogs");
          }
        });
      } else {
        dispatch(updateBlog({ blogId, formData })).then((res) => {
          if (res.payload?.success) {
            toast.success("Blog updated successfully");
            navigate("/admin/blogs");
          }
        });
      }
    } catch (err) {
      console.error("Blog submit error", err);
      toast.error("Something went wrong");
    } finally {
    }
  };

  const resetForm = () => {
    setBlog({
      title: "",
      description: "",
      banner: "",
      doc: "",
      gallery: [],
    });
  };

  return (
    <div className="min-h-screen">
      <div className="relative max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl text-center font-bold text-gray-800">
          {mode === "create" ? "Create Blog" : "Edit Blog"}
        </h1>
        <Button
          variant="outline"
          className="absolute -top-4 left-0"
          onClick={() => {
            resetForm();
            navigate(-1);
          }}
        >
          <ArrowLeft className="mr-0" />
        </Button>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg border shadow-md sm:p-6 p-4 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-gray-700 font-medium mb-3">
                Title *
              </Label>
              <Input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            <div>
              <Label className="block text-gray-700 font-medium mb-3">
                Banner Image *
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="flex-1"
              />
            </div>
          </div>

          {blog?.banner && (
            <div className="w-full h-40 rounded-md overflow-hidden">
              <img
                src={
                  blog.banner instanceof File
                    ? URL.createObjectURL(blog.banner)
                    : blog.banner
                }
                alt="Banner preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <Label className="block text-gray-700 font-medium mb-3">
              Description *
            </Label>
            <Textarea
              name="description"
              value={blog.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full "
              required
            />
          </div>

          <div>
            <Label className="block text-gray-700 font-medium mb-3">
              Document Content *
            </Label>
            <RichTextEditor
              value={blog.doc}
              readOnly={false}
              onChange={(newContent) =>
                setBlog((prev) => ({ ...prev, doc: newContent }))
              }
            />
          </div>

          <div>
            <Label className="block text-gray-700 font-medium mb-3">
              Gallery Images
            </Label>
            <div className="mb-3">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                className="w-full mb-3"
              />
            </div>

            {blog?.gallery?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {blog?.gallery?.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={
                        preview instanceof File
                          ? URL.createObjectURL(preview)
                          : preview
                      }
                      alt={`Gallery ${index}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full py-0.5 px-2 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="destructive"
              onClick={() => resetForm()}
            >
              Reset Form
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : mode === "edit"
                ? "Update Blog"
                : "Post Blog"}
            </Button>
          </div>
        </form>

        {true && (
          <div className="bg-white rounded-lg shadow-md sm:p-6 p-4 border space-y-4">
            <h2 className="text-xl text-center font-semibold text-gray-800">
              Blog Preview
            </h2>
            <hr />
            {blog.banner && (
              <img
                src={
                  blog.banner instanceof File
                    ? URL.createObjectURL(blog.banner)
                    : blog.banner
                }
                alt="Blog banner"
                className="w-full h-64 object-cover rounded-md mb-6"
              />
            )}
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {blog.title || "Untitled Blog"}
            </h1>
            <p className="text-gray-600 mb-6">
              {blog.description || "No description provided"}
            </p>
            <div className="prose max-w-none ">
              {HTMLReactParser(blog.doc || "")}
            </div>

            {blog?.gallery?.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Gallery
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {blog?.gallery?.map((preview, index) => (
                    <img
                      key={index}
                      src={
                        preview instanceof File
                          ? URL.createObjectURL(preview)
                          : preview
                      }
                      alt={`Gallery ${index}`}
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogForm;
