import React from "react";

const BecomeAVendor = () => {
  return (
    <section className="">
      <div className=" flex flex-col-reverse px-4 md:px-14 w-full py-20 md:flex-row ">
        <div className=" w-full md:w-[60%]">
          <h1 className="text-primary text-2xl font-semibold">
            How to Become a MerQri Vendor:
          </h1>
          <div className="bg-secondary w-[4rem] h-[0.4rem]" />
          <p className="text-[#1C151E] mt-10 text-[15px]">
            At MerQri, we understand that our success is intertwined with the
            success of our vendors. We are committed to fostering a
            collaborative and mutually beneficial relationship that propels both
            parties to new heights. Ready to take your moving business to the
            next level? Apply to become a MerQri vendor today and experience the
            difference of strategic collaboration!
          </p>
          <div className="bg-[#fef2e7] flex flex-col  gap-8 px-6 pt-10  pb-[6rem] rounded-xl w-full md:w-[60%] mt-10">
            <div className="flex items-center gap-6">
              <img src="images/tick.png" alt="" />
              <p className="text-primary text-[15px]">
                <span className="font-semibold">Submit Your Application:</span>{" "}
                Fill out our vendor application form to express your interest in
                joining our network.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <img src="images/tick.png" alt="" />
              <p className="text-primary text-[15px]">
                <span className="font-semibold">Submit Your Application:</span>{" "}
                Fill out our vendor application form to express your interest in
                joining our network.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <img src="images/tick.png" alt="" />
              <p className="text-primary text-[15px]">
                <span className="font-semibold">Submit Your Application:</span>{" "}
                Fill out our vendor application form to express your interest in
                joining our network.
              </p>
            </div>
          </div>
        </div>
        <div>
          <img src="/images/Group 997.png" alt="image"className="relative md:w-[75%] mb-10 md:mb-0  mx-auto w-3/4  lg:top-[-170px] lg:right-[-70px]" />
        </div>
      </div>
    </section>
  );
};

export default BecomeAVendor;
