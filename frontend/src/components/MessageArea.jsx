import React, { useEffect, useRef, useState } from "react";

import { IoIosArrowRoundBack } from "react-icons/io";
import { IoCallOutline, IoVideocamOutline } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";

import dp from "../assets/user.png";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

import {
  RiEmojiStickerLine,
  RiSendPlane2Fill,
} from "react-icons/ri";

import { FaImages } from "react-icons/fa6";

import EmojiPicker from "emoji-picker-react";

import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";

import axios from "axios";

import {
  setMessages,
  addMessage,
} from "../redux/messageSlice";

import { socket } from "../socket/socket";

const MessageArea = () => {
  const dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const image = useRef(null);

  const { selectedUser, userData, onlineUser } = useSelector(
    (state) => state.user
  );

  const { messages } = useSelector(
    (state) => state.message
  );

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (
      input.trim().length === 0 &&
      backendImage == null
    ) {
      return;
    }

    if (!selectedUser?._id) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append("message", input);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post(
        `https://chatly-friendly-backend.onrender.com/api/message/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("New message:", result.data);

      dispatch(
        setMessages([
          ...(messages || []),
          result.data,
        ])
      );

      setInput("");
      setFrontendImage(null);
      setBackendImage(null);
      setShowPicker(false);

      if (image.current) {
        image.current.value = "";
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);
    }
  };

  // =====================================================
  // EMOJI
  // =====================================================

  const onEmojiClick = (emojiData) => {
    setInput(
      (prevInput) =>
        prevInput + emojiData.emoji
    );

    setShowPicker(false);
  };

  // =====================================================
  // IMAGE
  // =====================================================

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setBackendImage(file);
    setFrontendImage(
      URL.createObjectURL(file)
    );
  };

  // =====================================================
  // SOCKET
  // =====================================================

  useEffect(() => {
    const handleNewMessage = (message) => {
      console.log("🔥 RECEIVED:", message);

      dispatch(addMessage(message));
    };

    socket.on(
      "newMessage",
      handleNewMessage
    );

    return () => {
      socket.off(
        "newMessage",
        handleNewMessage
      );
    };
  }, [dispatch]);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      await axios.get(
        "https://chatly-friendly-backend.onrender.com/api/auth/logout",
        {
          withCredentials: true,
        }
      );

      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================================
  // RETURN
  // =====================================================
return (
  <div
    className={`
      w-full
      lg:w-[70%]
      h-[100dvh]
      max-h-[100dvh]
      bg-slate-200
      relative
      flex
      flex-col
      overflow-hidden
      ${selectedUser ? "flex" : "hidden lg:flex"}
    `}
  >
    {/* ================= NO USER SELECTED ================= */}

    {!selectedUser && (
      <div className="hidden lg:flex w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex-col justify-center items-center">
        <div className="w-[90px] h-[90px] rounded-full bg-[#20c7ff] flex items-center justify-center shadow-lg mb-[25px]">
          <RiSendPlane2Fill className="w-[45px] h-[45px] text-white" />
        </div>

        <h1 className="text-[45px] font-bold text-gray-700">
          Welcome to Chatly
        </h1>

        <p className="mt-[10px] text-[25px] font-semibold text-gray-500">
          Chat Friendly! 💬
        </p>

        <p className="mt-[8px] text-[15px] text-gray-400">
          Select a user and start chatting
        </p>
      </div>
    )}

    {/* ================= SELECTED USER ================= */}

    {selectedUser && (
      <>
        {/* ================= HEADER ================= */}

     




        <div
  className="
    w-full
    h-[75px]
    min-h-[75px]
    max-h-[75px]
    shrink-0
    flex-none
    bg-white
    border-b
    border-gray-200
    shadow-sm
    flex
    items-center
    px-[10px]
    sm:px-[20px]
    relative
    z-[100]
  "
>
  {/* MOBILE BACK BUTTON */}
  <button
    type="button"
    onClick={() => {
      dispatch(setSelectedUser(null));
      setShowPicker(false);
    }}
    className="
      lg:hidden
      w-[42px]
      h-[42px]
      shrink-0
      rounded-full
      bg-gray-100
      shadow-md
      flex
      items-center
      justify-center
      text-gray-700
      active:scale-95
      transition
      mr-[10px]
    "
  >
    <IoIosArrowRoundBack className="w-[30px] h-[30px]" />
  </button>

  {/* USER INFO */}
  <div className="flex items-center gap-3 min-w-0 flex-1">
    <div className="relative shrink-0">
      <div
        className="
          w-[45px]
          h-[45px]
          sm:w-[48px]
          sm:h-[48px]
          rounded-full
          overflow-hidden
          border-2
          border-white
          shadow-md
          bg-gray-100
        "
      >
        <img
          src={selectedUser?.image || dp}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      {onlineUser?.includes(selectedUser?._id) && (
        <span
          className="
            absolute
            bottom-0
            right-0
            w-[13px]
            h-[13px]
            rounded-full
            bg-[#3aff20]
            border-2
            border-white
          "
        />
      )}
    </div>

    <div className="min-w-0">
      <h1 className="text-[16px] sm:text-[18px] font-semibold text-gray-800 truncate">
        {selectedUser?.name || selectedUser?.userName}
      </h1>

      <p
        className={`text-[12px] font-medium ${
          onlineUser?.includes(selectedUser?._id)
            ? "text-green-500"
            : "text-gray-400"
        }`}
      >
        {onlineUser?.includes(selectedUser?._id)
          ? "Online"
          : "Offline"}
      </p>
    </div>
  </div>

  {/* DESKTOP BUTTONS */}
  <div className="hidden lg:flex items-center gap-1">
    <button
      type="button"
      className="w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-green-50"
    >
      <IoCallOutline className="w-[22px] h-[22px]" />
    </button>

    <button
      type="button"
      className="w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-sky-50"
    >
      <IoVideocamOutline className="w-[22px] h-[22px]" />
    </button>

    <button
      type="button"
      onClick={handleLogout}
      className="w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500"
    >
      <BiLogOutCircle className="w-[24px] h-[24px]" />
    </button>
  </div>
</div>

        {/* ================= MESSAGE AREA ================= */}

        
          <div className="flex-1 min-h-0 overflow-hidden relative">
          {/* EMOJI PICKER */}

          {showPicker && (
          
  <div
    className="
      w-full
      h-full
      overflow-y-auto
      overscroll-contain
      px-[10px]
      sm:px-[25px]
      pt-[15px]
      pb-[15px]
      flex
      flex-col
      gap-[12px]
      bg-slate-100
    "
  >
    {messages?.length > 0 ? (
      messages.map((mess) =>
        mess.sender === userData?._id ? (
          <SenderMessage
            key={mess._id}
            image={mess.image}
            message={mess.message}
          />
        ) : (
          <ReceiverMessage
            key={mess._id}
            image={mess.image}
            message={mess.message}
          />
        )
      )
    ) : (
      <div className="flex-1 flex justify-center items-center">
        <div className="text-center">
          <div className="text-[40px]">👋</div>

          <h2 className="text-gray-600 font-semibold text-[18px]">
            Start a conversation
          </h2>

          <p className="text-gray-400 text-[14px] mt-1">
            Send a message to{" "}
            {selectedUser?.name || selectedUser?.userName}
          </p>
        </div>
      </div>
    )}
  </div>
</div>

        {/* ================= IMAGE PREVIEW ================= */}

        {frontendImage && (
          <div
            className="
              absolute
              bottom-[90px]
              right-[15px]
              sm:right-[20px]
              z-[60]
            "
          >
            <img
              src={frontendImage}
              alt=""
              className="
                w-[70px]
                h-[70px]
                sm:w-[80px]
                sm:h-[80px]
                object-cover
                rounded-xl
                shadow-xl
                border-2
                border-white
              "
            />
          </div>
        )}

        {/* ================= MESSAGE INPUT ================= */}

        <div
          className="
            w-full
            h-[80px]
            min-h-[80px]
            shrink-0
            bg-white
            border-t
            border-gray-200
            flex
            items-center
            px-[5px]
            sm:px-[20px]
            z-[50]
          "
        >
          <form
            onSubmit={handleSendMessage}
            className="
              w-full
              flex
              items-center
              gap-[3px]
              sm:gap-[8px]
            "
          >
            {/* EMOJI BUTTON */}

            <button
              type="button"
              onClick={() =>
                setShowPicker((prev) => !prev)
              }
              className="
                w-[42px]
                h-[42px]
                sm:w-[45px]
                sm:h-[45px]
                shrink-0
                rounded-full
                flex
                items-center
                justify-center
                text-gray-600
                hover:bg-gray-100
                hover:text-sky-500
                transition
              "
            >
              <RiEmojiStickerLine className="w-[23px] h-[23px]" />
            </button>

            {/* FILE INPUT */}

            <input
              type="file"
              ref={image}
              accept="image/*"
              hidden
              onChange={handleImage}
            />

            {/* INPUT BOX */}

            <div
              className="
                flex-1
                h-[50px]
                sm:h-[52px]
                min-w-0
                bg-gray-100
                rounded-full
                flex
                items-center
                px-[10px]
                sm:px-[15px]
                border
                border-transparent
                focus-within:border-sky-300
                focus-within:bg-white
                transition
              "
            >
              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                type="text"
                placeholder="Type a message..."
                className="
                  w-full
                  min-w-0
                  h-full
                  bg-transparent
                  outline-none
                  border-none
                  text-gray-700
                  text-[15px]
                  sm:text-[17px]
                "
              />

              {/* IMAGE */}

              <button
                type="button"
                onClick={() =>
                  image.current?.click()
                }
                className="
                  w-[38px]
                  h-[38px]
                  shrink-0
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  hover:bg-gray-200
                  hover:text-sky-500
                  transition
                "
              >
                <FaImages className="w-[20px] h-[20px]" />
              </button>
            </div>

            {/* SEND */}

            {(input.trim().length > 0 ||
              backendImage) && (
              <button
                type="submit"
                className="
                  w-[46px]
                  h-[46px]
                  sm:w-[50px]
                  sm:h-[50px]
                  shrink-0
                  rounded-full
                  bg-sky-500
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-md
                  hover:bg-sky-600
                  active:scale-95
                  transition-all
                "
              >
                <RiSendPlane2Fill className="w-[23px] h-[23px]" />
              </button>
            )}
          </form>
        </div>
      </>
    )}
  </div>
);
  
};

export default MessageArea;
