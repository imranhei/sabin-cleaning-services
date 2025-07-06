import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"; // adjust path if needed

const RenderBreadcrumb = ({ items }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          switch (item.type) {
            case "link":
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink asChild>
                    <Link className="text-muted/80 font-semibold" to={item.to}>
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            case "separator":
              return <BreadcrumbSeparator key={index} />;
            case "page":
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            default:
              return null;
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default RenderBreadcrumb;
