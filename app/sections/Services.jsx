import { services } from "../constants/index";
import { GoArrowUpRight } from "react-icons/go";

const ServiceCard = () => {
  return (
    <div className="container mx-auto px-4 py-16" id="services">
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`border-gray-400 ${
                index > 0 ? "sm:border-l sm:pl-4" : ""
              } ${index === 0 ? "border-none" : ""}`}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="mb-4">
                  <h2 className="text-xl text-center font-bold text-secondary mb-2">
                    {service.title}
                  </h2>
                  <p className="text-gray-700 text-center">
                    {service.description}
                  </p>
                </div>
                <div className="flex justify-center mt-auto">
                  <button className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded-lg flex items-center">
                    Find More <GoArrowUpRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
