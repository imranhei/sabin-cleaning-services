import React from "react";
import Hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Commitment } from "@/config/constants";
import QuoteModal from "@/components/modal/QuoteModal";
import happy_clinet from "@/assets/home_happy_client.jpg";
import clean_house from "@/assets/home_clean.jpg";
import { BrushCleaning, Star } from "lucide-react";

const Home = () => {
  return (
    <div>
      <div className="w-full min-h-[90vh] relative flex items-center justify-center py-10">
        <img
          src={Hero}
          alt="Hero Banner"
          className="absolute top-0 left-0 w-full h-full object-cover object-top z-0 brightness-50"
        />
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

      <div className="lg:flex gap-6 lg:gap-10 items-center max-w-7xl mx-auto px-4 py-10">
        <div className="relative flex-1">
          <div className="flex justify-between gap-6 pb-[calc(30%)] w-full">
            <img
              src={happy_clinet}
              alt="happy_clinet"
              className="rounded-xl w-3/5 h-[50vh] object-cover"
            />
            <div className="p-4 h-fit rounded-xl bg-[#79c043] flex flex-col justify-center gap-2">
              <h1 className="text-white text-5xl font-bold text-center">5.0</h1>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star color="#ffde05" fill="#ffde05" strokeWidth={0.5} />
                ))}
              </div>
              <p className="text-white text-xs font-semibold text-center">
                5,000 Trusted Reviews
              </p>
            </div>
          </div>
          <img
            src={clean_house}
            alt=""
            className="absolute top-1/3 right-0 rounded-xl w-2/3 h-[50vh] object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-muted-foreground">45+ Years of Superior Cleaning</h1>
          <p className="text-muted-foreground">
            Sabin Cleaning Service has the distinguished record of using environmentally friendly cleaning products since our beginning in the mid-'70s. We were eco-friendly before the recent popular trend of all natural products.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {Array.from({ length: 6 }, (_, index) => (
              <div className="group p-4 bg-gray-100 hover:bg-[#79c043] duration-200 w-full aspect-square rounded-md flex flex-col items-center justify-center gap-4">
                <BrushCleaning size={48} className="group-hover:text-white text-[#79c043] duration-200" />
                <h1 className="uppercase text-center font-semibold text-muted-foreground group-hover:text-white duration-200">End of Lease Cleaning</h1>
            </div>
            ))}
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
