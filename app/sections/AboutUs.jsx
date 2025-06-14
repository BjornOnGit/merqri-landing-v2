import WhyCom from "../components/WhyCom";

const AboutUs = () => {
  return (
    <section
      className="flex flex-col  md:flex-row px-9 md:px-20 justify-between py-16 items-center gap-12"
      id="about"
    >
      {/* Left Section */}
      <div className="flex flex-col gap-10 md:w-2/3">
        {/* About Us Text */}
        <div>
          <h1 className="font-bold text-primary text-2xl">About Us</h1>
          <div className="bg-secondary w-24 h-1 mt-4" />
          <p className="text-sm md:text-base mt-6 whitespace-normal">
            Welcome to MerQri, where we turn the challenges of moving into
            seamless transitions and unforgettable experiences. With a passion
            for efficiency and a commitment to excellence, we are your dedicated
            partners in making every move stress-free and enjoyable.
          </p>
        </div>

        {/* Grid of Cards */}
        <div>
          <h3 className="text-secondary  font-bold text-xl mb-5">
            Why Choose US
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <WhyCom
                title="Professionalism"
                content="Our team comprises experienced and highly trained professionals who are dedicated to handling your belongings with the utmost care and attention. We bring a level of professionalism that sets us apart in the moving industry."
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <WhyCom
                title="Tailored Solutions"
                content="We recognize that every move is unique. That's why we offer personalized solutions to meet your specific needs. Whether you're moving a household, an office, or a business, we tailor our services to ensure a customized and efficient moving plan."
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <WhyCom
                title="Reliability"
                content="With MerQri, you can trust that your belongings are in safe hands. We pride ourselves on our reliability and commitment to delivering on time, every time. Your satisfaction is our priority."
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <WhyCom
                title="Transparent Pricing"
                content="No hidden fees, no surprises. We believe in transparent pricing, and we provide detailed quotes so you know exactly what to expect. Our competitive rates ensure that you get value for your investment."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section*/}
      <div className="md:ml-12 hidden md:block">
        <img
          src="/images/right.png"
          alt="About Us Image"
          className="w-full md:w-auto h-auto rounded-lg "
        />
      </div>
    </section>
  );
};

export default AboutUs;
