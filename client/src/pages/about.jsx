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
          <h1 className="sm:text-5xl text-3xl font-bold text-center text-sky-800">About Us</h1>
          <p className="text-lf font-semibold text-center">
            We are here to make your life brighter
          </p>
        </div>
        <div className="text-justify sm:text-lg max-w-3xl text-muted-foreground">
          At Australia Cleaning Services, we take pride in being a trusted provider of high-quality residential and commercial cleaning solutions. Operated under the umbrella of Sabin & Sidney Group Pty Ltd, our company brings a strong foundation of professionalism, consistency, and customer-focused service to every job.
          <br /><br />
          With over five years of experience in the cleaning industry, we have steadily expanded our service offerings and built long-lasting relationships with a growing number of satisfied clients. As a locally owned and operated business, we are deeply committed to supporting and uplifting our community.
          <br /><br />
          We view our customers not just as clients, but as neighbors - and we are dedicated to making a meaningful difference in their homes and workplaces through reliable, detailed, and efficient cleaning services. Furthermore, USA Cleaning Services is fully insured, reflecting our commitment to safety, accountability, and the highest standards of service quality.
        </div>
      </div>
    </div>
  );
};

export default About;
