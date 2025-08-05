import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBreadcrumbJson } from "@/hooks/useBreadcrumbJson";
import RenderBreadcrumb from "@/components/common/RenderBreadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { getBlog } from "@/redux/admin/blog-slice";
import { Loader } from "lucide-react";
import HTMLReactParser from "html-react-parser";

const blogDetails = () => {
  const dispatch = useDispatch();
  const breadcrumbData = useBreadcrumbJson();
  const { slug } = useParams();
  const { currentBlog, isLoading } = useSelector((state) => state.blog);
  const [slc, setSlc] = useState(1);

  useEffect(() => {
    dispatch(getBlog(slug));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-[85vh]">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[90vh] relative">
      <div className="w-full sm:h-72 h-60 top-0 left-0 bg-sky-800 flex justify-center relative">
        <div className="absolute max-w-7xl w-full ml-8 top-0 z-10">
          <RenderBreadcrumb items={breadcrumbData} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4 z-0 px-4">
          <h1 className="lg:text-4xl sm:text-2xl text-xl text-white font-bold text-center">
            {currentBlog?.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-4">
        <div className="w-full h-[500px]">
          <img
            src={currentBlog?.banner}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center pt-2">
          Posted on {currentBlog?.createdAt.split("T")[0]}
        </div>
        <div className="lg:text-4xl sm:text-2xl text-xl font-bold">
          {currentBlog?.title}
        </div>
        <div className="text-justify whitespace-pre-wrap pb-4">
          {currentBlog?.description}
        </div>
        <div className="text-justify whitespace-pre-wrap">
          {HTMLReactParser(currentBlog?.doc || "")}
        </div>
        {slc !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {currentBlog?.gallery.slice(0, slc).map((item, index) => (
              <div key={index}>
                <img src={item} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative mx-auto w-96 group pt-6">
            <img
              src={currentBlog?.gallery[0]}
              alt=""
              className="group-hover:brightness-50 brightness-75"
            />
            <Button
              onClick={() => setSlc(currentBlog?.gallery.length)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm bg-black/50"
            >
              See more photos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default blogDetails;
