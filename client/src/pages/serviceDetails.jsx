import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { services } from "@/config/constants";
import { useBreadcrumbJson } from "@/hooks/useBreadcrumbJson";
import RenderBreadcrumb from "@/components/common/RenderBreadcrumb";
import { CircleCheckBig } from "lucide-react";

const serviceDetails = () => {
  const breadcrumbData = useBreadcrumbJson();
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Find the service by slug (or use ID if you're using that)
    const found = services.find((s) => s.url === slug);
    setService(found);
  }, [slug]);

  if (!service) {
    return <div className="p-6">Service not found.</div>;
  }

  return (
    <div className="w-full min-h-[100vh] relative">
      <div className="w-full sm:h-72 h-60 top-0 left-0 bg-sky-800 flex justify-center relative">
        <div className="absolute max-w-7xl w-full ml-8 top-0 z-10">
          <RenderBreadcrumb items={breadcrumbData} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4 z-0 px-4">
          <h1 className="lg:text-6xl sm:text-4xl text-2xl text-white font-bold">
            {service.title}
          </h1>
          <p className="text-white sm:text-lg font-semibold text-center">
            {service.des}
          </p>
        </div>
      </div>

      <div className="md:flex md:space-x-10 max-w-7xl mx-auto px-4 py-10">
        <div className="flex-1">
          <img
            src={service.img}
            alt="happy_clinet"
            className="rounded-xl w-full aspect-square object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 md:pt-0 pt-10">
          <h1 className="sm:text-3xl text-2xl font-bold text-muted-foreground pb-2">
            {service.title} Checklist
          </h1>
          <div className="text-muted-foreground grid grid-cols-1 gap-2">
            {service.checklist.length > 0 ? (
              service.checklist.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <CircleCheckBig
                    size={18}
                    strokeWidth={2.5}
                    color="#79c043"
                    className="mt-1"
                    style={{ minWidth: 18, minHeight: 18 }} // Add this line
                  />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-lg">This service is currently unavailable.</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10 ">
        <div className="flex flex-col sm:flex-row-reverse shadow-md items-stretch mx-4 border">
          <div className="sm:w-2/5">
            <img
              src="https://irp.cdn-website.com/7d0d0d3a/dms3rep/multi/eco+friendly+cleaning.jpeg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col p-6 sm:p-8 flex-1 gap-4 text-muted-foreground">
            <h1 className="text-2xl font-bold">
              Eco-friendly home Cleaning Solutions
            </h1>
            <p className="text-justify sm:leading-7">
              As one of the trusted bond back cleaning companies in Australia,
              we use biodegradable cleaning products that leave no trace of
              toxic chemical or fume that damage your furniture or harm your
              family members. Our products provide deep cleaning of all kinds of
              surfaces—glass, wood, tiles or event cemented floors—while giving
              a complete peace of mind to all our customers. They do not cause
              any harm to you, your family and the environment.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10 ">
        <div className="flex sm:flex-row flex-col shadow-md items-stretch mx-4 border">
          <div className="sm:w-2/5">
            <img
              src="https://hellamaid.ca/wp-content/uploads/2024/03/OOM-2024-03-07T120740.512.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col p-6 sm:p-8 flex-1 gap-4 text-muted-foreground">
            <h1 className="text-2xl font-bold">Add Value To Your Property</h1>
            <p className="text-justify sm:leading-7">
              End of lease cleaning can be stressful but hiring local bond back
              cleaners in Australia can help you gain the lost sheen of the
              rental property and win back the security deposit without any
              penalty. We use industry-leading tools and equipment to clean the
              obstinate stains to bring back your property to its original, new
              state. Our team ensures your home or office looks squeaky clean
              and hygienic to ensure your property is rented at the most
              competitive rate to the new tenants.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10 ">
        <div className="flex flex-col sm:flex-row-reverse shadow-md items-stretch mx-4 border">
          <div className="sm:w-2/5">
            <img
              src="https://naturalcarecleaningservice.com/wp-content/uploads/2024/03/Why-Choose-NaturalCare-Cleaning-Service-Over-DIY-Methods-scaled.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col p-6 sm:p-8 flex-1 gap-4 text-muted-foreground">
            <h1 className="text-2xl font-bold">
              Affordable Cleaning Solutions
            </h1>
            <p className="text-justify sm:leading-7">
              Sabin Cleaning Services stand by its top-class bond-back cleaning service in
              Australia without charging insane money. Regardless of the size of
              your property, our team remains dedicated to offer superior
              quality cleaning services within at the most affordable prices. We
              promise stress-free cleaning experience for every bond cleaning
              job. Entrust us once to experience the impact of professional bond
              back cleaning on your residential and/or commercial property.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-10 ">
        <div className="flex sm:flex-row flex-col shadow-md items-stretch mx-4 border">
          <div className="sm:w-2/5">
            <img
              src="https://img.freepik.com/free-photo/medium-shot-workers-with-cleaning-cart_23-2149345519.jpg?semt=ais_hybrid&w=740"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col p-6 sm:p-8 flex-1 gap-4 text-muted-foreground">
            <h1 className="text-2xl font-bold">Expert Cleaning Service</h1>
            <p className="text-justify sm:leading-7">
              We are qualified and skilled to clean your entire home, from
              vacuuming carpets, cleaning windows/doors to scrubbing
              bathroom/kitchen to everything else. Our team meticulously plan
              and execute cleaning to deliver the best results that satisfy the
              landlord and the property manager. Whether small or big house, our
              meticulous service and punctuality leaves our customers completely
              satisfied and gain many repeat bond back cleaning customers in
              Australia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default serviceDetails;
