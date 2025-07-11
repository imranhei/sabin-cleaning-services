import React from "react";
import { useBreadcrumbJson } from "@/hooks/useBreadcrumbJson";
import RenderBreadcrumb from "@/components/common/RenderBreadcrumb";
import { services } from "@/config/constants";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Services = () => {
  const breadcrumbData = useBreadcrumbJson();

  return (
    <div className="w-full min-h-[100vh] relative">
      <div className="w-full sm:h-60 h-40 top-0 left-0 bg-sky-800 flex justify-center relative">
        <div className="absolute max-w-7xl w-full ml-8 top-0 z-10">
          <RenderBreadcrumb items={breadcrumbData} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0">
          <h1 className="lg:text-6xl sm:text-4xl text-2xl text-white font-bold">
            We Offer Cleaning Services
          </h1>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-wrap gap-6 justify-center">
          {services?.map((service, index) => (
            <div
              key={index}
              className="relative flex flex-col rounded-xl overflow-hidden sm:w-64 w-4/5 h-96 shadow-lg hover:-translate-y-2 transform duration-300"
            >
              <div className="h-1/2 w-full">
                <img
                  src={service.img}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-sky-800">
                  {service.title || ""}
                </h2>
                <h2 className="text-muted-foreground">{service.des || ""}</h2>
              </div>
              <Link
                to={`/services/${service.url}`}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              >
                <Button className="bg-[#79c043] rounded-full px-8 py-4 text-base">
                  Learn more
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
