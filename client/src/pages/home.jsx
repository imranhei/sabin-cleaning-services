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

const Home = () => {
  return (
    <div>
      <div className="w-full min-h-[90vh] relative flex items-center justify-center py-10">
        <img
          src="https://res.cloudinary.com/dcuphhnil/image/upload/v1752939210/SCS_cover_dnvsac.jpg"
          alt="Hero Banner"
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
          <h1 className="lg:text-7xl sm:text-5xl text-4xl font-bold">
            Simplify Life.
          </h1>
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
                <p>{item.title}</p>
              </div>
            ))}
          </div>
          <QuoteModal>
            <Button className="bg-[#79c043] rounded-full px-12 py-6 text-base">
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
              alt="happy_clinet"
              className="rounded-xl w-3/5 h-[50vh] object-cover"
            />
            <div className="p-4 h-fit rounded-xl bg-[#79c043] flex flex-col justify-center gap-2">
              <h1 className="text-white sm:text-5xl text-3xl font-bold text-center">
                5.0
              </h1>
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
            alt=""
            className="absolute bottom-0 right-0 rounded-xl w-2/3 h-[50vh] object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 lg:pt-0 pt-20">
          <h1 className="sm:text-3xl text-2xl font-bold text-muted-foreground">
            Professional residential and commercial cleaning service in Sydney,
            Australia.
          </h1>
          <p className="text-muted-foreground text-justify">
            Sabin Cleaning Service proudly combines over 20 years of team
            expertise with a long-standing commitment to using environmentally
            friendly cleaning products. We embraced eco-friendly practices well
            before the recent trend toward all-natural products.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {services.slice(0, 6).map((service, index) => (
              <div
                className="group p-4 bg-gray-100 hover:bg-[#79c043] duration-200 w-full aspect-square rounded-md flex flex-col items-center h-full justify-center gap-4"
                key={index}
              >
                <service.icon className="sm:size-12 size-8 group-hover:text-white text-[#79c043] duration-200" />
                <h1 className="uppercase sm:text-base text-sm text-center font-semibold text-muted-foreground group-hover:text-white duration-200">
                  {service.title}
                </h1>
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
                Call for Free Quote
              </h1>
            </div>
            <p className="text-muted-foreground text-justify">
              Want to know how much it will cost to clean your home? Call us or
              use our easy online quote tool - it's fast, simple, and
              convenient. Don't waste time waiting for someone to come over just
              to give you an estimate. Instead, just call or message us with the
              size of your home, number of bedrooms and bathrooms, the services
              you need, and how often you'd like them. We'll send you a quick
              and accurate quote. No walkthroughs are required. We base our
              estimates only on the rooms and services you choose, and both can
              be updated anytime to suit your needs.
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
                <span className="font-bold">+61 000 000 000</span>
              </div>
            </div>
          </div>
          <div className="p-6 overflow-hidden">
            <img src={cleaned_room} alt="" className="rounded-xl" />
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
            <h3 className="font-semibold text-lg">{item.title}</h3>
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
