import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

const Testimonies = () => {
  return (
    <section className="px-10 py-20 flex flex-col md:flex-row items-center justify-between">
      <div>
        <h1 className="font-bold text-primary text-xl">Testimonies</h1>
        <div className="bg-secondary w-[4rem] h-[0.4rem]" />

        <p className="text-2xl mt-10 font-[500] text-[#21243D]">
          CLIENT TESTIMONIALS: WHAT OUR CUSTOMERS SAY ABOUT US
        </p>
        <p className="lg:w-[60%] text-[15px] mt-10 text-[#1E1E1E]">
          At MerQri, we take pride in our commitment to delivering exceptional
          moving experiences. Don't just take our word for it—listen to what our
          satisfied clients have to say about their journeys with us:
        </p>
      </div>
      <div className="">
        <Carousel className="w-[35rem] px-4 py-8 rounded-xl bg-[#FCE6CE]">
          <CarouselContent className="">
            <CarouselItem className="text-primary">
              "Moving can be incredibly stressful, but MerQri, made
              it a breeze! The team was professional, efficient, and handled my
              belongings with the utmost care. I couldn't be happier with the
              service and would recommend them to anyone in a heartbeat."
              <p className=" text-center font-bold  mt-6">
                Jane M. - Residential Move
              </p>
            </CarouselItem>
            <CarouselItem className="text-primary">
              "Moving can be incredibly stressful, but MerQri, made
              it a breeze! The team was professional, efficient, and handled my
              belongings with the utmost care. I couldn't be happier with the
              service and would recommend them to anyone in a heartbeat."
              <p className=" text-center font-bold  mt-6">
                Jane M. - Residential Move
              </p>
            </CarouselItem>
            <CarouselItem className="text-primary">
              "Moving can be incredibly stressful, but MerQri, made
              it a breeze! The team was professional, efficient, and handled my
              belongings with the utmost care. I couldn't be happier with the
              service and would recommend them to anyone in a heartbeat."
              <p className=" text-center font-bold  mt-6">
                Jane M. - Residential Move
              </p>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonies;
