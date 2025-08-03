import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, deleteBlog } from "@/redux/admin/blog-slice";
import { CalendarCheck, Edit, Loader, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SimpleDeleteModal from "@/components/modal/SimpleDeleteModal";
import { toast } from "sonner";

const AdminBlogList = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteBlog(id)).then((res) => {
      if (res.payload?.success) {
        toast.success(res.payload?.message || "Blog deleted successfully");
      } else {
        toast.error(res.payload?.message || "Something went wrong");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-40">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog List</h1>
        <Link to="/admin/blogs/create">
          <Button>Post New Blog</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {blogs?.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col rounded-xl overflow-hidden sm:w-80 w-4/5 h-[490px] shadow-lg"
          >
            <div className="h-1/2 w-full">
              <img
                src={blog.banner}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <p className="text-sm text-[#79c043] flex items-center gap-1">
                <CalendarCheck size={16} />
                {blog.createdAt.split("T")[0]}
              </p>
              <h2 className="text-lg font-semibold text-sky-800">
                {blog.title || ""}
              </h2>
              <h2 className="text-muted-foreground line-clamp-3 text-justify">
                {blog.description || ""}
              </h2>
            </div>
            <div className="flex justify-between items-center px-4">
              <Link to={`/admin/blogs/edit/${blog._id}`}>
                <Button>
                  <Edit size={16} />
                  Edit
                </Button>
              </Link>
              <SimpleDeleteModal
                title="Are you sure you want to delete this blog?"
                onSubmit={handleDelete}
                id={blog._id}
              >
                <Button variant="destructive">
                  <Trash2 size={16} />
                  {isLoading ? "Deleting..." : "Delete"}
                </Button>
              </SimpleDeleteModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogList;
