import React, { useEffect, useState } from "react";
import dp from "../assets/user.png";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";

import axios from "axios";
import {
  setOtherUsers,
  SetSearchData,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";

import { useNavigate } from "react-router-dom";

const Siderbar = () => {
  console.log("Sidebar Render");
  const { userData, otherUsers, selectedUser, onlineUser, searchData } =
    useSelector((state) => state.user);

  console.log("online user", onlineUser);
  console.log("otherUsers:", otherUsers);
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");
  console.log("searchData:", searchData);

  let dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get("https://chatly-friendly-backend.onrender.com/api/auth/logout", {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      dispatch(setOtherUsers([]));

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handlesearch = async () => {
    try {
      const result = await axios.get(
        `https://chatly-friendly-backend.onrender.com/api/user/search?query=${input}`,
        {
          withCredentials: true,
        },
      );

       

      console.log("Result:", result);
      console.log("Result.data:", result.data);
      console.log("Length:", result.data.length);

      dispatch(SetSearchData(result.data));
      dispatch(SetSearchData(result.data));
     
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input) {
      handlesearch();
    }
  }, [input]);

 return (
  <div
    className={`relative w-full lg:w-[30%] h-full bg-slate-100 overflow-hidden ${
      !selectedUser ? "block" : "hidden lg:block"
    }`}
  >
    {/* Back Button */}
{/* 
  <button
  type="button"
  onClick={() => dispatch(setSelectedUser(null))}
  className="
    lg:hidden
    absolute
    top-4
    left-4
    z-[200]
    w-10
    h-10
    rounded-full
    bg-white
    shadow-lg
    flex
    items-center
    justify-center
    text-slate-700
    hover:bg-sky-50
    hover:text-sky-500
    active:scale-95
    transition-all
    duration-200
  "
>
  <BiLogOutCircle className="w-6 h-6" />
 
</button> */}

{/* Mobile: Back Button */}
<button
  type="button"
  onClick={() => dispatch(setSelectedUser(null))}
  className="
    lg:hidden
    absolute
    top-4
    left-4
    z-[200]
    w-10
    h-10
    rounded-full
    bg-white
    shadow-lg
    flex
    items-center
    justify-center
    text-slate-700
    hover:bg-sky-50
    hover:text-sky-500
    active:scale-95
    transition-all
    duration-200
  "
>
  <BiLogOutCircle className="w-6 h-6" />
  
</button>


{/* Laptop/Desktop: Logout Button */}
<button
  type="button"
  onClick={handleLogout}
  className="
    hidden
    lg:flex
    absolute
    top-4
    right-4
    z-[200]
    w-11
    h-11
    rounded-full
    bg-white
    shadow-lg
    items-center
    justify-center
    text-slate-600
    hover:bg-red-50
    hover:text-red-500
    active:scale-95
    transition-all
    duration-200
  "
  title="Logout"
>
  <BiLogOutCircle className="w-6 h-6" />
</button>

    {/* ================================================= */}
    {/* SEARCH RESULTS DROPDOWN */}
    {/* ================================================= */}

    {input.length > 0 && search && (
      <div className="absolute top-[155px] left-3 right-3 z-[150] max-h-[320px] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-2">
        {searchData?.length > 0 ? (
          searchData.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                dispatch(setSelectedUser(user));
                setInput("");
                setSearch(false);
              }}
              className="w-full min-h-[65px] px-3 py-2 flex items-center gap-3 rounded-xl cursor-pointer hover:bg-slate-100 active:bg-slate-200 transition-all duration-200"
            >
              {/* Profile */}
              <div className="relative shrink-0">
                <div className="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img
                    src={user.image || dp}
                    alt={user.userName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {onlineUser?.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-[13px] h-[13px] rounded-full bg-green-500 border-2 border-white shadow-sm" />
                )}
              </div>

              {/* Name */}
              <div className="min-w-0">
                <h1 className="text-[16px] font-semibold text-slate-800 truncate">
                  {user.name || user.userName}
                </h1>

                <p className="text-[12px] text-slate-400">
                  {onlineUser?.includes(user._id) ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-slate-400 text-sm">
              No users found
            </p>
          </div>
        )}
      </div>
    )}

    {/* ================================================= */}
    {/* SIDEBAR HEADER */}
    {/* ================================================= */}

    <div
      className="
        w-full
        min-h-[280px]
        bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500
        rounded-b-[45px]
        shadow-lg
        px-5
        pt-5
        pb-6
        flex
        flex-col
        justify-between
      "
    >
      {/* Logo */}
      <div className="flex justify-center">
        <h1 className="text-white font-extrabold text-[22px] tracking-wide">
          Chatly
        </h1>
      </div>

      {/* User Info */}
      <div className="w-full flex items-center justify-between gap-3 mt-5">
        <div className="min-w-0">
          <p className="text-white/80 text-[13px] font-medium">
            Welcome back
          </p>

          <h1 className="text-white font-bold text-[21px] truncate">
            Hi, {userData?.name || userData?.userName || "User"} 👋
          </h1>
        </div>

        {/* Profile */}
        <div
          onClick={() => navigate("/profile")}
          className="
            shrink-0
            w-[58px]
            h-[58px]
            rounded-full
            overflow-hidden
            border-[3px]
            border-white/80
            shadow-lg
            cursor-pointer
            hover:scale-105
            transition-transform
            duration-200
          "
        >
          <img
            src={userData?.image || dp}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* SEARCH + ONLINE USERS */}
      {/* ================================================= */}

      <div className="w-full flex items-center gap-3 mt-5">
        {!search ? (
          <>
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setSearch(true)}
              className="
                shrink-0
                w-[55px]
                h-[55px]
                rounded-full
                bg-white
                flex
                items-center
                justify-center
                shadow-lg
                hover:bg-slate-50
                hover:scale-105
                transition-all
                duration-200
              "
            >
              <IoSearchSharp className="w-6 h-6 text-slate-600" />
            </button>

            {/* Online Users */}
            <div className="flex-1 flex items-center gap-3 overflow-x-auto scrollbar-hide py-1">
              {otherUsers?.map((user) => {
                if (!onlineUser?.includes(user._id)) return null;

                return (
                  <div
                    key={user._id}
                    onClick={() => dispatch(setSelectedUser(user))}
                    className="relative shrink-0 cursor-pointer group"
                  >
                    <div
                      className="
                        w-[55px]
                        h-[55px]
                        rounded-full
                        overflow-hidden
                        border-[3px]
                        border-white
                        shadow-lg
                        group-hover:scale-105
                        transition-transform
                        duration-200
                      "
                    >
                      <img
                        src={user.image || dp}
                        alt={user.userName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Online Dot */}
                    <span
                      className="
                        absolute
                        bottom-0
                        right-0
                        w-[15px]
                        h-[15px]
                        bg-green-500
                        rounded-full
                        border-[2px]
                        border-white
                        shadow-sm
                      "
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Search Input */
          <form
            onSubmit={(e) => e.preventDefault()}
            className="
              w-full
              h-[55px]
              bg-white
              rounded-full
              shadow-lg
              flex
              items-center
              gap-3
              px-4
            "
          >
            <IoSearchSharp className="w-6 h-6 text-slate-500 shrink-0" />

            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Search user..."
              autoFocus
              className="
                w-full
                h-full
                outline-none
                border-none
                bg-transparent
                text-[15px]
                text-slate-700
                placeholder:text-slate-400
              "
            />

            <button
              type="button"
              onClick={() => {
                setSearch(false);
                setInput("");
              }}
              className="
                shrink-0
                w-8
                h-8
                rounded-full
                flex
                items-center
                justify-center
                hover:bg-slate-100
                transition
              "
            >
              <RxCross2 className="w-5 h-5 text-slate-500" />
            </button>
          </form>
        )}
      </div>
    </div>

    {/* ================================================= */}
    {/* ALL USERS / CHAT LIST */}
    {/* ================================================= */}

    <div
      className="
        w-full
        h-[calc(100%-280px)]
        overflow-y-auto
        px-3
        py-4
        flex
        flex-col
        gap-2
        scrollbar-thin
      "
    >
      {otherUsers?.length > 0 ? (
        otherUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className="
              w-full
              min-h-[70px]
              px-3
              flex
              items-center
              gap-3
              bg-white
              rounded-2xl
              border
              border-slate-100
              shadow-sm
              cursor-pointer
              hover:bg-sky-50
              hover:border-sky-100
              hover:shadow-md
              active:scale-[0.99]
              transition-all
              duration-200
            "
          >
            {/* Profile */}
            <div className="relative shrink-0">
              <div
                className="
                  w-[48px]
                  h-[48px]
                  rounded-full
                  overflow-hidden
                  border-2
                  border-slate-100
                  shadow-sm
                "
              >
                <img
                  src={user.image || dp}
                  alt={user.userName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Online */}
              {onlineUser?.includes(user._id) && (
                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-[13px]
                    h-[13px]
                    bg-green-500
                    rounded-full
                    border-2
                    border-white
                  "
                />
              )}
            </div>

            {/* User Name */}
            <div className="flex-1 min-w-0">
              <h1 className="text-[16px] font-semibold text-slate-800 truncate">
                {user.name || user.userName}
              </h1>

              <p className="text-[12px] text-slate-400 mt-[2px]">
                {onlineUser?.includes(user._id)
                  ? "Online"
                  : "Offline"}
              </p>
            </div>

            {/* Online indicator text */}
            {onlineUser?.includes(user._id) && (
              <span className="text-[11px] font-medium text-green-500">
                ●
              </span>
            )}
          </div>
        ))
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400 text-sm">
            No users available
          </p>
        </div>
      )}
    </div>
  </div>
);
};

export default Siderbar;
