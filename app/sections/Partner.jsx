import Button from "../components/Button";

const Partner = () => {
  return (
    <section className="px-10 py-14 md:px-20 md:py-24 bg-secondary ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
        {/* Left Section: Image */}
        <div className="relative">
          <div className="absolute  top-14 right-5 md:right-16 md:top-32">
            <div className="w-7 h-7 md:w-14 md:h-14 bg-white rounded-full"></div>
          </div>
          <img
            src="/images/left.png"
            alt="Description of your image"
            className="relative md:w-[75%] mb-10 md:mb-0  mx-auto w-3/4  "
          />
        </div>

        {/* Right Section: Text Content */}
        <div className="text-start font-lato md:text-left">
          <h2 className="text-lg   md:text-2xl font-bold text-white mb-4">
            EXPLORE LIMITLESS POSSIBILITIES WITH MERQRI: YOUR TRUSTED MOVING
            PARTNER
          </h2>
          <p className="text-sm md:text-lg text-white whitespace-normal">
            Are you a moving company seeking a reliable and strategic
            partnership? Look no further! Name invites you to join hands with us
            and unlock a world of opportunities in the moving industry.
          </p>
          <div className="bg-none md:bg-slate-200 flex flex-wrap items-center gap-6 my-10 justify-center rounded-lg h-auto sm:h-10 w-full sm:w-90  text-white md:text-black">
            <div className="flex items-center w-1/2 sm:w-auto ">
              <img src="/head.png" alt="" className="w-5 " />
              <p className="text-sm ml-2">Expertise</p>
            </div>
            <div className="flex items-center w-1/2 sm:w-auto">
              <img src="/Vector1.png" alt="" className="w-5" />
              <p className="text-sm ml-2">Expanded services</p>
            </div>
            <div className="flex items-center w-1/2 sm:w-auto">
              <img src="/X.png" alt="" className="w-5" />
              <p className="text-sm ml-2">Reliability</p>
            </div>
            <div className="flex items-center w-1/2 sm:w-auto">
              <img src="/open.png" alt="" className="w-5" />
              <p className="text-sm ml-2">Transparent collaboration</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button text=" Partner With Us" href="/waitlist" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
