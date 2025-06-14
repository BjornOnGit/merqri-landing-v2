import PartnerBox from "../components/PartnerBox";
import React from "react";

const WhyPartnerMerQri = () => {
  return (
    <section className="px-4 md:px-14 w-full pb-20">
      <h1 className="text-[1.3rem] md:text-[1.7rem] w-full lg:w-[35rem] text-primary font-[400]">
        <span>Why Partner with MerQri ?</span>
      </h1>
      <div className="bg-secondary w-[4rem] h-[0.4rem]" />
      <br />
      <div className="flex flex-col md:flex-row items-center gap-10">
        <PartnerBox
          text="Increased Visibility: Joining our network opens doors to increased visibility and exposure within the moving industry. Benefit from being associated with a trusted and reputable brand."
          bgColor="#e9e9ec"
          textColor="#27285C"
          imgUrl="/images/search.png"
        />
        <PartnerBox
          text="Diversified Service Offerings: Expand your service portfolio by incorporating our comprehensive suite of moving services. From residential to commercial moves, packing to unpacking, our diverse offerings empower you to meet all client needs."
          bgColor="#fef2e7"
          textColor="#F2800A"
          imgUrl="/images/globalSearch.png"
        />
        <PartnerBox
          text="Strategic Collaboration: Forge strategic partnerships with like-minded professionals in the moving industry. Collaborate with a network of experts who share your commitment to excellence and reliability."
          bgColor="#e9e9e9"
          textColor="#1E1E1E"
          imgUrl="/images/users.png"
        />
        <PartnerBox
          text="Increased Visibility: Joining our network opens doors to increased visibility and exposure within the moving industry. Benefit from being associated with a trusted and reputable brand."
          bgColor="#e9f5f6"
          textColor="#1F9CA4"
          imgUrl="/images/access.png"
        />
      </div>
    </section>
  );
};

export default WhyPartnerMerQri;
