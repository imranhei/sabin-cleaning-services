import { Menu, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import site_logo from "../../../public/Sabin_Clean_Sky_blue.png";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = ({
  logo = {
    url: "/",
    src: site_logo,
    alt: "logo",
    title: "Sabin Cleaning Services",
  },
  menu = [
    {
      title: "About",
      url: "about",
    },
    {
      title: "Services",
      url: "/services",
      items: [
        {
          title: "End of Lease Cleaning",
          url: "/services/end-of-lease-cleaning",
        },
        {
          title: "Bond Back Cleaning",
          url: "#",
        },
        {
          title: "Moving In And Out Cleaning",
          url: "#",
        },
        {
          title: "Carpet Cleaning",
          url: "#",
        },
        {
          title: "Deep Cleaning",
          url: "#",
        },
        {
          title: "Commercial Cleaning",
          url: "#",
        },
        {
          title: "Tile and Grout Cleaning",
          url: "#",
        },
        {
          title: "Acid wash",
          url: "#",
        },
        {
          title: "Floor Polish",
          url: "#",
        },
        {
          title: "Pressure Wash",
          url: "#",
        },
        {
          title: "Driveway Wash",
          url: "#",
        },
        {
          title: "Window Cleaning",
          url: "#",
        },
        {
          title: "Building & Brick Wall Cleaning",
          url: "#",
        },
      ],
    },
    {
      title: "FAQs",
      url: "/faqs",
    },
    {
      title: "Blog",
      url: "/blog",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ],
  contact = {
    phone: { title: "017 0000 0000", url: "#" },
  },
}) => {
  return (
    <section className="fixed top-0 left-0 w-full z-50 py-4 bg-[#A4E2FA]">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          {/* Logo */}
          <Link to={logo.url} className="flex items-center gap-2">
            <img src={logo.src} className="max-h-10" alt={logo.alt} />
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <Button
              asChild
              // variant="outline"
              size="sm"
              className="pointer-events-none bg-[#79c043]"
            >
              <div className="font-bold">
                <Phone strokeWidth={3} />
                <span className="text-base">{contact.phone.title}</span>
              </div>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Link to="#" className="bg-[#79c043] p-2 rounded text-white">
                <Phone size={20} />
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  {/* <Button className="bg-transparent" variant="ghost" size="icon"> */}
                  <Menu className="size-9 bg-[#79c043] p-2 rounded text-white" />
                  {/* </Button> */}
                </SheetTrigger>
                <SheetContent
                  className="overflow-y-auto h-screen bg-[#A4E2FA] p-4"
                  side="top"
                  pos="top-7 right-6"
                >
                  <SheetHeader>
                    <SheetTitle>
                      <Link
                        to={logo.url}
                        className="flex items-center gap-2 w-fit"
                      >
                        <img
                          src={logo.src}
                          className="max-h-8"
                          alt={logo.alt}
                        />
                        <span className="text-lg font-semibold tracking-tighter">
                          {logo.title}
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 py-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="pointer-events-none bg-[#79c043]"
                    >
                      <div className="font-semibold text-base text-white">
                        <Phone />
                        {contact.phone.title}
                      </div>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="!bg-transparent font-semibold text-base z-50">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <Link asChild key={subItem.title} to={subItem.url} className="w-80">
              <SubMenuLink item={subItem} />
            </Link>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        to={item.url}
        className="group bg-transparent inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 font-semibold transition-colors hover:text-[#00518B]"
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 px-0 bg-transparent [&[data-state=open]]:bg-[#ffffff00] [&[data-state=open]]:text-black [&[data-state=open]]:mb-2 [&[data-state=open]>svg]:text-muted-forground font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="p-0">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} to={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }) => {
  return (
    <Link
      className="flex flex-row gap-4 p-2 leading-none no-underline transition-colors outline-none select-none bg-[#D2F2FC] hover:bg-white hover:text-accent-foreground w-full lg:w-80 border-b border-black/10"
      to={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
