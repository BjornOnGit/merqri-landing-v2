import { handleJoinWaitList } from "../apis/JoinWaitlist";
import { useState } from "react";
import { SlArrowRightCircle } from "react-icons/sl";

const WaitlistJoin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <section className="bg-white px-5 md:px-20 py-20 flex flex-col items-center">
      <div className="flex flex-col gap-10 w-full md:px-20">
        <div className="flex flex-col gap-5">
          <label htmlFor="" className="text-secondary text-[1.5rem] md:text-[2rem]">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" border-b-4 border-secondary focus:outline-none text-xl"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <label htmlFor="" className="text-secondary text-[1.5rem] md:text-[2rem]">
              Your Email
            </label>
            <button  
            onClick={(event) => handleJoinWaitList(name, email, setMessage, event)}
            className="text-secondary font-semibold py-2 px-4 rounded-lg cursor-pointer text-xs md:text-sm">
              <SlArrowRightCircle size={40} />
            </button>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-4 border-secondary focus:outline-none text-xl"
          />
        </div>
      </div>
      {message && <div className="text-center text-[1.5rem] mt-10 text-primary font-semibold">{message}</div>}
      <div className="text-center flex justify-center mt-10">
        <p className="text-[2rem] text-secondary md:w-[53%] text-center">
          We are just starting our journey, but we promise that it will be cool!
        </p>
      </div>
    </section>
  );
};

export default WaitlistJoin;
