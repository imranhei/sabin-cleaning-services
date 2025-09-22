import React from "react";
import webLogo from "/Sabin_Clean_Sky_blue.png";
import { Facebook, LogIn, Phone, Youtube } from "lucide-react";
import { Button } from "../ui/button";
import { footerLinks } from "@/config/constants";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import QuoteModal from "@/components/modal/QuoteModal";

const Footer = () => {
  return (
    <div className="bg-[#dff2fa]">
      <div className="max-w-7xl mx-auto px-4 flex md:flex-row flex-col items-start gap-4 py-10">
        <div className="flex justify-between gap-4 items-center">
          <Link to="/" className="flex gap-2 items-center min-w-72 pt-2">
            <img src={webLogo} alt="" className="size-8" />
            <h1 className="font-semibold text-muted-foreground">
              Sabin Cleaning Services
            </h1>
          </Link>
          <Link to="/auth/login" className="pt-2">
            <LogIn className="text-blue-500" />
          </Link>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex sm:flex-row flex-col justify-between gap-4 flex-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-semibold">Call</span>
              <span className="bg-[#79c043] p-2 rounded-full text-white flex items-center gap-1">
                <Phone size={16} />
              </span>
              <span className="font-bold">+61 449 897 958</span>
            </div>
            <div className="flex items-center gap-2">
              <QuoteModal>
                <Button className="bg-[#79c043] rounded-full px-12 py-6 text-base">
                  Get a Quote
                </Button>
              </QuoteModal>
              <Facebook className="text-muted-foreground" />
              <Youtube className="text-muted-foreground" />
            </div>
          </div>
          <div className="sm:flex justify-between gap-10 text-muted-foreground hidden">
            {footerLinks.map((link, index) => (
              <div
                key={index}
                className="flex flex-col sm:space-y-2 text-sm w-full"
              >
                <h1 className="font-bold text-lg">{link.title}</h1>
                <div className="w-16 border-b-2 border-[#79c043]"></div>
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-2">
                  {link.items.map((item, idx) => (
                    <Link
                      to={`/services/${item.url}`}
                      key={idx}
                      className="hover:text-[#79c043] cursor-pointer pt-2"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground sm:hidden block">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-2"
              //   defaultValue="item-1"
            >
              {footerLinks.map((link, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger className="[&[data-state=open]]:bg-gray-200 [&[data-state=open]]:text-muted-foreground p-4">
                    {link.title}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-0 text-balance pt-0">
                    {link.items.map((item, idx) => (
                      <Link
                        to={`/services/${item.url}`}
                        key={idx}
                        className="hover:text-[#79c043] cursor-pointer pt-2"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-gray-100 text-muted-foreground text-sm">
        <p className="mx-auto max-w-7xl">
          Copyright ©{new Date().getFullYear()} Sabin Cleaning Services. All
          rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
