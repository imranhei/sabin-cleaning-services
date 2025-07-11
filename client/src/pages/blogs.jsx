import React from 'react'
import { useBreadcrumbJson } from "@/hooks/useBreadcrumbJson";
import RenderBreadcrumb from "@/components/common/RenderBreadcrumb";
import { blogs } from "@/config/constants"

const Blogs = () => {
  const breadcrumbData = useBreadcrumbJson();

  return (
    <div className="w-full min-h-[100vh] relative">
      <div className="w-full sm:h-60 h-40 top-0 left-0 bg-sky-800 flex justify-center relative">
        <div className="absolute max-w-7xl w-full ml-8 top-0 z-10">
          <RenderBreadcrumb items={breadcrumbData} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0">
          <h1 className="lg:text-6xl sm:text-4xl text-2xl text-white font-bold">
            Our Experiences
          </h1>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-wrap gap-6 justify-center">
            {blogs?.map((blog, index) => (
            <div
              key={index}
              className="relative flex flex-col rounded-xl overflow-hidden sm:w-80 w-4/5 h-[420px] shadow-lg hover:-translate-y-2 transform duration-300"
            >
              <div className="h-1/2 w-full">
                <img
                  src={blog.img}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <p className="text-sm text-[#79c043]">{blog.date}</p>
                <h2 className="text-lg font-semibold text-sky-800">
                  {blog.title || ""}
                </h2>
                <h2 className="text-muted-foreground line-clamp-3 text-justify">{blog.des || ""}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs
