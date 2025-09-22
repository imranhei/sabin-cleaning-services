import RenderBreadcrumb from "@/components/common/RenderBreadcrumb";
import React from "react";
import { useBreadcrumbJson } from "@/hooks/useBreadcrumbJson";

const About = () => {
  const breadcrumbData = useBreadcrumbJson();

  return (
    <div className="w-full relative">
      <div className="w-full sm:h-60 h-40 top-0 left-0 bg-sky-800 flex justify-center relative">
        <div className="absolute max-w-7xl w-full ml-8 top-0 z-10">
          <RenderBreadcrumb items={breadcrumbData} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0">
          <h1 className="lg:text-6xl sm:text-4xl text-2xl text-white font-bold">
            Get to Know Us
          </h1>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl flex sm:flex-row flex-col justify-between items-center gap-10 px-4 sm:py-20 py-10">
        <div className="sm:space-y-6 space-y-2 flex-1 min-w-60 text-muted-foreground">
          <h1 className="sm:text-5xl text-3xl font-bold text-center text-sky-800">
            About Us
          </h1>
          <p className="text-lf font-semibold text-center">
            We are here to make your life brighter
          </p>
        </div>
        <div className="text-justify sm:text-lg max-w-3xl text-muted-foreground">
          At Sabin Cleaning Service, we proudly provide high-quality residential
          and commercial cleaning services across Australia. As part of Sabin &
          Sidney Group Pty Ltd, we are committed to delivering professional,
          reliable, and detail-oriented cleaning solutions tailored to each
          client's unique needs.
          <br />
          <br />
          With more than a year of company experience and a cleaning team with
          more than 20 years of hands-on cleaning expertise, we've built a
          strong reputation for excellence and customer satisfaction. Our
          experienced team understands the importance of cleanliness, hygiene,
          and trust and we bring those values to every job we complete.
          <br />
          <br />
          As a locally owned and operated Australian business, we view our
          clients as neighbors and partners in the community. Fully insured and
          quality-focused, Sabin Cleaning Service is dedicated to maintaining
          safe, spotless environments for homes and businesses across the
          region.
        </div>
      </div>
    </div>
  );
};

export default About;
