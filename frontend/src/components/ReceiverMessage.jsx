


import React, { useRef, useEffect } from "react";
import dp from "../assets/user.png";
import { useSelector } from "react-redux";

const ReceiverMessage = ({ image, message }) => {

    const {selectedUser}=useSelector(state=>state.user)
  const scroll = useRef();

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
    <div className="flex items-start gap-[10px] ">
    
      <div
            
             className="w-[40px] cursor-pointer bg-white h-[40px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg   right-[-10px]  "
           >
             <img
               src={selectedUser?.image || dp}
               alt="profile"
               className="w-full h-full object-cover"
             />
           </div>


      <div ref={scroll}   className="w-fit  max-w-[500px] bg-[#20c7ff] text-white gap-[10px] flex flex-col text-[19px] rounded-tl-none rounded-2xl px-[20px] py-[10px] shadow-gray-400 relative left-0 shadow-lg"  >
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
    </div>


  );
};

export default ReceiverMessage;

