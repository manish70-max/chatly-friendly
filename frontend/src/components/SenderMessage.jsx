import { useSelector } from "react-redux";
import dp from "../assets/user.png";
import React, { useEffect, useRef } from "react";

const SenderMessage = ({ image, message }) => {
  const scroll = useRef();

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message, image]);

  const handleImageScroll = () => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-start   gap-[10px] ">
      <div
        ref={scroll}
        className="w-fit max-w-[500px] bg-[rgb(23,151,194)] text-white gap-[10px] flex flex-col text-[19px] rounded-tr-none rounded-2xl px-[20px] py-[10px] ml-auto shadow-gray-400 shadow-lg"
      >
        {image && (
          <img
            src={image}
            className="w-[100px] rounded-lg"
            alt=""
            onLoad={handleImageScroll}
          />
        )}

        {message && <span>{message}</span>}
      </div>

      <div
       
        className="w-[40px] cursor-pointer bg-white h-[40px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg   right-[-10px]  "
      >
        <img
          src={userData?.image || dp}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SenderMessage;
