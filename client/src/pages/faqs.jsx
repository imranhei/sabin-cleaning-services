import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsData } from "@/config/constants";
import { useBreadcrumbJson } from "@/hooks/useBreadcrumbJson";
import RenderBreadcrumb from "@/components/common/RenderBreadcrumb";

const FAQs = () => {
  const breadcrumbData = useBreadcrumbJson();

  return (
    <div className="w-full min-h-[100vh] relative">
      <div className="w-full h-80 top-0 left-0 bg-teal-500 flex justify-center relative">
        <div className="absolute max-w-7xl w-full ml-8 top-0 z-10">
          <RenderBreadcrumb items={breadcrumbData} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0">
          <h1 className="lg:text-6xl sm:text-4xl text-2xl text-white font-bold">
            Frequently Asked Questions
          </h1>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-6"
          //   defaultValue="item-1"
        >
          {faqsData.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="">{faq.question}</AccordionTrigger>
              <AccordionContent className="">
                <p className="whitespace-pre-wrap">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
