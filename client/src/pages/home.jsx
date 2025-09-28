import React from "react";
import { Button } from "@/components/ui/button";
import { Commitment } from "@/config/constants";
import QuoteModal from "@/components/modal/QuoteModal";
import happy_clinet from "@/assets/home_happy_client.jpg";
import cleaned_room from "@/assets/cleaned_room.webp";
import clean_house from "@/assets/home_clean.jpg";
import { Phone, Star } from "lucide-react";
import { services } from "@/config/constants";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>
          Sabin Cleaning Service | Professional Cleaning Services Australia
        </title>
        <meta
          name="description"
          content="Sabin Cleaning Service offers expert residential, commercial, and end of lease cleaning services across Sydney and other parts of Australia. Eco-friendly, reliable, and affordable."
        />
        <meta
          name="keywords"
          content="cleaning services Australia, house cleaning, commercial cleaning, end of lease cleaning, residential cleaning Sydney, eco-friendly cleaning, office cleaning"
        />
        <link rel="canonical" href="https://sabincleaning.com.au" />
      </Helmet>
      <div className="w-full min-h-[90vh] relative flex items-center justify-center py-10">
        <img
          src="https://res.cloudinary.com/dcuphhnil/image/upload/v1752939210/SCS_cover_dnvsac.jpg"
          alt="Cleaning services Australia"
          className="absolute top-0 left-0 w-full h-full object-cover object-top z-0 brightness-50"
        />
        <div className="absolute top-6 right-0 w-full">
          <div className="container max-w-7xl flex justify-end mx-auto pr-4">
            <span className="text-white font-semibold sm:text-lg">
              ACN 682 730 196
            </span>
          </div>
        </div>
        <div className="container max-w-7xl px-4 z-10 text-white space-y-6">
          <h2 className="lg:text-7xl sm:text-5xl text-4xl font-bold">
            Simplify Life.
          </h2>
          <h2 className="lg:text-7xl sm:text-5xl text-4xl font-bold">
            Delegate Cleaning
          </h2>
          <div className="flex flex-wrap sm:gap-6 gap-4">
            {Commitment.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 sm:text-lg text-sm"
              >
                <item.icon className="bg-[#79c043] p-1.5 size-8 rounded-full" />
                <h2>{item.title}</h2>
              </div>
            ))}
          </div>
          <QuoteModal>
            <Button
              className="bg-[#79c043] rounded-full px-12 py-6 text-base"
              aria-label="Get a free cleaning quote"
            >
              Get a Quote
            </Button>
          </QuoteModal>
        </div>
      </div>

      <div className="lg:flex lg:space-x-10 items-center max-w-7xl mx-auto px-4 py-10">
        <div className="relative flex-1">
          <div className="flex justify-between gap-6 pb-[calc(40%)] w-full">
            <img
              src={happy_clinet}
              alt="Professional cleaning services Australia"
              className="rounded-xl w-3/5 h-[50vh] object-cover"
            />
            <div className="p-4 h-fit rounded-xl bg-[#79c043] flex flex-col justify-center gap-2">
              <p className="text-white sm:text-5xl text-3xl font-bold text-center">
                5.0
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    stroke="#ffde05"
                    color="#ffde05"
                    fill="#ffde05"
                    strokeWidth={0.5}
                    className="size-4 sm:size-6"
                  />
                ))}
              </div>
              {/* <p className="text-white text-xs font-semibold text-center">
                5,000 Trusted Reviews
              </p> */}
            </div>
          </div>
          <img
            src={clean_house}
            alt="Residential cleaning Australia"
            className="absolute bottom-0 right-0 rounded-xl w-2/3 h-[50vh] object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 lg:pt-0 pt-20">
          <h1 className="sm:text-3xl text-2xl font-bold text-muted-foreground">
            Trusted Residential & Commercial Cleaning Services in Sydney,
            Australia
          </h1>
          <p className="text-muted-foreground text-justify">
            At Sabin Cleaning Service, our team brings over 20 years of
            experience providing high-quality residential cleaning, commercial
            cleaning, and end of lease cleaning services in Sydney and across
            Australia. We use eco-friendly products and tailor our cleaning
            solutions to meet your specific needs.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {services.slice(0, 6).map((service, index) => (
              <div
                className="group p-4 bg-gray-100 hover:bg-[#79c043] duration-200 w-full aspect-square rounded-md flex flex-col items-center h-full justify-center gap-4"
                key={index}
              >
                <service.icon className="sm:size-12 size-8 group-hover:text-white text-[#79c043] duration-200" />
                <h3 className="uppercase sm:text-base text-sm text-center font-semibold text-muted-foreground group-hover:text-white duration-200">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
          <Link to="/services">
            <Button className="w-fit px-6 bg-[#79c043] rounded-full">
              More Services
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="py-10 lg:flex lg:space-x-10 items-center max-w-7xl relative mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="flex sm:gap-4 gap-2 items-center">
              <img
                src="https://cottagecare.com/wp-content/uploads/2022/09/power-icon.svg"
                alt="spark"
                className="sm:size-12 size-8"
              />
              <h1 className="sm:text-4xl text-2xl font-bold text-muted-foreground line-clamp-2">
                Call for Quote
              </h1>
            </div>
            <p className="text-muted-foreground text-justify">
              Looking for a hassle-free cleaning quote? Give us a call or
              request one online—it's quick, simple, and convenient. Forget the
              wait for in-home walkthroughs. Instead, just share a few details
              with us, such as your home size, the number of bedrooms and
              bathrooms, the services you're looking for, and how often you'd
              like them. With this information, we'll prepare a fast and
              accurate estimate tailored to your needs. And the best part? If
              you call us directly, you'll receive your personalized quotation
              within one business day. Getting a cleaning quote has never been
              easier!
            </p>
            <div className="flex flex-wrap items-center sm:gap-4 gap-2 gap-y-4">
              <QuoteModal>
                <Button className="bg-[#79c043] rounded-full px-12 py-6 text-base">
                  Get a Quote
                </Button>
              </QuoteModal>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-semibold">Call</span>
                <span className="bg-[#79c043] p-2 rounded-full text-white flex items-center gap-1">
                  <Phone size={16} />
                </span>
                <span className="font-bold">+61 449 897 958</span>
              </div>
            </div>
          </div>
          <div className="p-6 overflow-hidden">
            <img
              src={cleaned_room}
              alt="House cleaning Australia"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="py-10 flex justify-center flex-wrap gap-6 max-w-7xl relative mx-auto px-4">
        {Commitment.map((item, index) => (
          <div
            key={index}
            className="h-[330px] w-80 flex flex-col items-center gap-2 text-center bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <item.icon className="bg-[#79c043] text-white p-2 size-12 rounded-full" />
            <h1 className="font-semibold text-lg">{item.title}</h1>
            <p className="text-muted-foreground text-justify">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
