import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useBreadcrumbJson } from "@/hooks/useBreadcrumbJson";
import RenderBreadcrumb from "@/components/common/RenderBreadcrumb";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";

const initialstate = {
  img: "https://weekendmaids.net/wp-content/uploads/2023/06/man-doing-professional-home-cleaning-service-1-1536x1024.jpg.webp",
  date: "Jun 18, 2025",
  title: "Things To Do Before Moving Into Your New San Diego House",
  des: "",
  text: `Moving into a new house is an exciting journey filled with anticipation and the promise of a fresh start. However, before you can truly settle in and enjoy your new space, several important tasks should be completed to ensure everything is in order. A well-organized move not only reduces stress but also sets the foundation for a smooth transition into your new home. One of the most important things to consider before settling in is ensuring your new space is clean and ready. This is where Weekend Maids comes in. Our professional house cleaning services in San Diego can save you time and effort, making sure your home is spotless from day one.

Change the Locks
One of the first things to do before moving into your new house is to change all the locks. Even if the previous owners or tenants seem trustworthy, it's impossible to know how many people may have a copy of the keys. Changing the locks ensures that you have complete control over who has access to your home, giving you peace of mind from day one.

Deep Clean the Entire House
Before you start unpacking, it's essential to deep clean every corner of your new home. While it might look clean on the surface, there could be hidden dust, dirt, or grime that needs attention. Cleaning your new home thoroughly will not only make it more comfortable but also healthier for you and your family.`,
  gallery: [
    "https://t4.ftcdn.net/jpg/03/06/99/87/360_F_306998742_5awR6uVsZ8dRNdHHnj0tnm4sGUDBAxQ5.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKeSfAGN2cpSv2k9wgdyKCQ6hSCV_qgBVbBsw6PD3goWCZd7bAw8A8IhhNlrLzQ1nViN4&usqp=CAU",
    "https://img.iproperty.com.my/angel/750x1000-fit/wp-content/uploads/sites/2/2021/03/professional-house-cleaning-services-malaysia.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgCKQ6HPH9lKjEDCaJUsOY0ugHSB4RR9uhmEVfsxO9MLTZalHyL09UJ0za209VVzRGy-M&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ70UUTY_R57VYON7jZka2N7CsCWyPBdtoIEsCtHlRhSunGI9wv1SmiHzEfCdRTvdHnUjw&usqp=CAU",
  ],
};

const blogDetails = () => {
  const breadcrumbData = useBreadcrumbJson();
  const { slug } = useParams();
  const [formData, setFormData] = useState(initialstate);
  const [slc, setSlc] = useState(0);

  return (
    <div className="w-full min-h-[90vh] relative">
      <div className="w-full sm:h-72 h-60 top-0 left-0 bg-sky-800 flex justify-center relative">
        <div className="absolute max-w-7xl w-full ml-8 top-0 z-10">
          <RenderBreadcrumb items={breadcrumbData} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4 z-0 px-4">
          <h1 className="lg:text-4xl sm:text-2xl text-xl text-white font-bold text-center">
            {formData.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-2">
        <div className="w-full h-[500px]">
          <img
            src={formData.img}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center pt-2">Posted on {formData.date}</div>
        <div className="lg:text-4xl sm:text-2xl text-xl font-bold">
          {formData.title}
        </div>
        <div className="text-justify whitespace-pre-wrap">{formData.text}</div>
        {slc !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {formData.gallery.slice(0, slc).map((item, index) => (
              <div key={index}>
                <img src={item} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative mx-auto w-96 group pt-6">
            <img
              src={formData.gallery[0]}
              alt=""
              className="group-hover:brightness-50 brightness-75"
            />
            <Button
              onClick={() => setSlc(formData.gallery.length)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm bg-black/50"
            >
              See more photos
            </Button>
          </div>
        )}
        {/* <RichTextEditor
          value={formData.text}
          onChange={(html) => setFormData((prev) => ({ ...prev, text: html }))}
        /> */}
      </div>
    </div>
  );
};

export default blogDetails;
