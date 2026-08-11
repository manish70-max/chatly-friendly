import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const SignUP = () => {
  const [userName, SetuserName] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const[loading,Setloading]=useState(false)
  const[error,SetError]=useState(false)
 const dispatch=useDispatch()
  const {userData} =useSelector(state=>state.user)
  console.log(userData)
  const navigate = useNavigate();




  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   Setloading(true)
    
  //   try {
  //     const result = await axios.post(
  //       "http://localhost:3000/api/auth/signup",
  //       {
  //         userName,
  //         email,
  //         password,
  //       },
  //       {
  //         withCredentials: true,
  //       },
  //     );

  //      dispatch(setUserData(result.data))
  //     // console.log(result);
  //     Setemail("")
  //     SetuserName("")
  //     Setpassword("")
  //     SetError("")
  //   } catch (error) {

  //     Setloading(false)
  //     SetError(false)
  //   }
  // };
  const handleSignUp = async (e) => {
  e.preventDefault();

  Setloading(true);
  SetError("");

  try {
    const result = await axios.post(
      "http://localhost:3000/api/auth/signup",
      {
        userName,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    dispatch(setUserData(result.data.user));

    SetuserName("");
    Setemail("");
    Setpassword("");

    navigate("/profile");
  } catch (error) {
    console.log(error.response?.data);

    SetError(error.response?.data?.message || "Signup failed");
  } finally {
    Setloading(false);
  }
};

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[10px]">
        <div className="w-full h-[200px]  bg-[#20c7ff]   rounded-b-[30%]  shadow-gray-400  font-bold shadow-lg flex items-center justify-center    ">
          <h1 className="text-gray-600  font-size-lg font-bold text-[19px">
            welcome to <span className="text-white">chatly</span>
          </h1>
        </div>
        <form
          className="w-full flex flex-col gap-[20px] items-center "
          onSubmit={handleSignUp}
        >
          <input
            value={userName}
            onChange={(e) => SetuserName(e.target.value)}
            type="text"
            placeholder="username"
            className="w-[90%] h-[60px] 
          outline-none border-2 boder-[#20c7ff] px-[10px]  py-[10px] bg-[white]  rounded-lg hadow-gray-400 shadaw-lg text-gray-700 text-[19px] "
          />
          <input
            value={email}
            onChange={(e) => Setemail(e.target.value)}
            type="email"
            placeholder="email"
            className="w-[90%] h-[60px] 
          outline-none border-2 boder-[aqwa] px-[10px]  py-[10px] bg-[white]  rounded-lg hadow-gray-400 shadaw-lg text-gray-700 text-[19px] "
          />
          <input
            value={password}
            onChange={(e) => Setpassword(e.target.value)}
            type="password"
            placeholder="password"
            className="w-[90%] h-[60px] 
          outline-none border-2 boder-[#20c7ff] px-[10px]  py-[10px] bg-[white]  rounded-lg hadow-gray-400 shadaw-lg text-gray-700 text-[19px] "
          />

          <button className="px-[20px] py-[10px] bg-[green]  rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px]   hover:shadow-inner    ">
             Sign up  {/* Sign up {loading?"Loading..":"login"} */}
          </button>
          <p className="cursor-pointer  " onClick={() => navigate("/login")}>
            Already Have An Account ?{" "}
            <span className="text-[#20c7ff] text-[bold]">
              {" "}
              Login{" "}
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUP;
