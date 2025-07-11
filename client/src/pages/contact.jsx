import React from "react";
import { useBreadcrumbJson } from "@/hooks/useBreadcrumbJson";
import RenderBreadcrumb from "@/components/common/RenderBreadcrumb";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const breadcrumbData = useBreadcrumbJson();

  return (
    <div className="w-full relative">
      <div className="w-full sm:h-60 h-40 top-0 left-0 bg-sky-800 flex justify-center relative">
        <div className="absolute max-w-7xl w-full ml-8 top-0 z-10">
          <RenderBreadcrumb items={breadcrumbData} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0">
          <h1 className="lg:text-6xl sm:text-4xl text-2xl text-white font-bold">
            Get in Touch
          </h1>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl flex flex-col justify-center sm:gap-6 gap-2 px-4 sm:py-20 py-10 w-fit">
        <h1 className="sm:text-5xl text-2xl font-bold text-sky-800">
          We are always here for you!
        </h1>
        <p className="sm:text-3xl font-semibold text-muted-foreground">
          Call us to get a free quote!
        </p>
        
        <div className="flex gap-2 items-center sm:text-2xl font-semibold text-muted-foreground">
          <Phone className="sm:size-6 size-4" />
          +61 000 000 000
        </div>
        <div className="flex gap-2 items-center sm:text-2xl font-semibold text-muted-foreground">
          <Mail className="sm:size-6 size-4" />
          sabincleaning@gmail.com
        </div>
        <div className="flex gap-2 items-center sm:text-2xl font-semibold text-muted-foreground pb-4">
          <MapPin className="sm:size-6 size-4" />
          38/299 Lakemba Street, Wiley Park, NSW-2195
        </div>
        <p className="sm:text-xl mt-4 font-semibold text-muted-foreground">A Part of</p>
        <p className="sm:text-3xl -mt-2 text-xl font-bold text-sky-800">Sabin & Sidney Group Pty Ltd​</p>
        <p className="sm:text-2xl font-semibold text-muted-foreground">ACN 682 730 196</p>
      </div>
    </div>
  );
};

export default Contact;