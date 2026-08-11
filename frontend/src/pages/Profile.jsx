import React, { useRef, useState } from "react";
import dp from "../assets/user.png";
import { IoCamera } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);

  const [name, setName] = useState(userData?.userName || "");
  const [frontendImage, setFrontendImage] = useState(userData?.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const image = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", name);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.put(
        "http://localhost:3000/api/user/profile",
        formData,
        {
          withCredentials: true,
        },
      );

      dispatch(setUserData(result.data.user));
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setSaving(false);
    }
  };
return (
  <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center px-4 py-6">
    {/* Profile Card */}
    <div
      className="
        w-full
        max-w-[500px]
        bg-white
        rounded-2xl
        shadow-xl
        border
        border-slate-200
        px-5
        sm:px-7
        py-5
        flex
        flex-col
        items-center
      "
    >
      {/* Heading */}
      <div className="text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          Edit Profile
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Update your profile information
        </p>
      </div>

      {/* Profile Image */}
      <div className="relative mb-5">
        <div
          onClick={() => image.current?.click()}
          className="
            w-28
            h-28
            sm:w-32
            sm:h-32
            rounded-full
            overflow-hidden
            border-4
            border-sky-400
            shadow-md
            cursor-pointer
            hover:opacity-90
            transition-all
            duration-200
          "
        >
          <img
            src={frontendImage || dp}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Camera Button */}
        <button
          type="button"
          onClick={() => image.current?.click()}
          className="
            absolute
            bottom-0
            right-0
            w-9
            h-9
            rounded-full
            bg-sky-500
            border-[3px]
            border-white
            shadow-md
            flex
            items-center
            justify-center
            text-white
            hover:bg-sky-600
            hover:scale-105
            transition-all
            duration-200
          "
        >
          <IoCamera className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleProfile}
        className="w-full flex flex-col gap-3"
      >
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={image}
          hidden
          onChange={handleImage}
        />

        {/* Name */}
        <div className="w-full">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full
              h-[45px]
              px-4
              rounded-lg
              border
              border-slate-300
              outline-none
              text-sm
              text-slate-700
              bg-white
              focus:border-sky-400
              focus:ring-2
              focus:ring-sky-100
              transition-all
              duration-200
            "
          />
        </div>

        {/* Username */}
        <div className="w-full">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Username
          </label>

          <input
            type="text"
            value={userData?.userName || ""}
            readOnly
            className="
              w-full
              h-[45px]
              px-4
              rounded-lg
              border
              border-slate-200
              outline-none
              text-sm
              text-slate-500
              font-medium
              bg-slate-100
              cursor-not-allowed
            "
          />
        </div>

        {/* Email */}
        <div className="w-full">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Email
          </label>

          <input
            type="email"
            value={userData?.email || ""}
            readOnly
            className="
              w-full
              h-[45px]
              px-4
              rounded-lg
              border
              border-slate-200
              outline-none
              text-sm
              text-slate-500
              font-medium
              bg-slate-100
              cursor-not-allowed
            "
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="
            w-full
            h-[45px]
            mt-2
            rounded-lg
            bg-gradient-to-r
            from-sky-500
            to-cyan-500
            text-white
            font-semibold
            text-sm
            shadow-md
            hover:from-sky-600
            hover:to-cyan-600
            hover:shadow-lg
            active:scale-[0.98]
            disabled:opacity-60
            disabled:cursor-not-allowed
            transition-all
            duration-200
          "
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  </div>
);
 
};

export default Profile;
