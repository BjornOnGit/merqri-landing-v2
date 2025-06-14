"use client"

import { useEffect, useState } from "react";
import  { usePathname } from "next/navigation"
import Button from "../components/Button";
const Subscribe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //useState for the pictures for different pages 
  const [picture,setPicture]=useState("/images/left2.png")
  const location = usePathname()

  useEffect(
    ()=>{
      //changing picture based on the path
      if(location.pathname==='/'){
        setPicture('/images/left2.png')
      }
      else if (location.pathname==='/partnership'){
        setPicture('/images/Union (1).png')
      }
    },[location.pathname]
  )
  // const [message, setMessage] = useState("");
  return (
    <section className="bg-white px-10 py-14 md:px-20 md:py-24" id="contact">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
        <div className="">
          <img
            src={picture}
            alt=""
            className=" relative md:w-[75%] mb-10 md:mb-0  mx-auto w-3/4 "
          />
        </div>

        <div>
          <div className="">
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl font-bold md-text-3xl">
                Subscribe for Exclusive Moving Insights and Special Offers!
              </h1>
              <p className="text-sm md:w-[80%]">
                Join the MerQri community and stay one step ahead in the world
                of seamless relocations. Subscribe to our newsletter for a
                wealth of moving insights, expert tips, and exclusive offers
                designed just for you.
              </p>
            </div>
            <div className="flex flex-col gap-10 md:flex-row mt-4 ">
              <div className="">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="border rounded-lg px-4 py-2 w-64 h-10 text-start placeholder-primary  focus:outline-none"
                  placeholder="Full name"
                />
              </div>
              <div className="">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className=" border rounded-lg px-4 py-2 w-64 h-10 text-start placeholder-primary  focus:outline-none "
                  placeholder="Email"
                />
              </div>
            </div>
          </div>

          <Button
            href="/waitlist"
            bgColor="bg-secondary"
            text="Join The Waitlist"
          />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
