import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Login = () => {
   
   const [email, Setemail] = useState("");
    const [password, Setpassword] = useState("");
     const[err,SetError]=useState(false)
     const[loading,Setloading]=useState(false)
    
     const dispatch=useDispatch()
  const {userData}=useSelector(state=>state.user)
  console.log("userdata",userData)
      const navigate = useNavigate()

//       const handlelogin=async(e)=>{
//             e.preventDefault();
//             SetError("")
//                   try {
//     const result = await axios.post(
//       "http://localhost:3000/api/auth/login",
//       { email, password },
//       { withCredentials: true }
//     );

//      dispatch(setUserData(result.data))
//     //  dispatch(setUserData(null))
//      navigate("/")
//      Setemail("")
//      Setpassword("")
//      Setloading(false)
//      SetError(" ")
//     console.log(result.data);
//   } catch (error) {
//     console.log(error.response.data);
//        Setloading(false)
//       SetError(error.response.data.message) // 👈 Ye print karo
//   }
// };






const handlelogin = async (e) => {
  e.preventDefault();

  Setloading(true);
  SetError("");

  try {
    const result = await axios.post(
      "https://chatly-friendly.onrender.com/api/auth/login",
      { email, password },
      { withCredentials: true }
    );

    console.log(result.data);

    dispatch(setUserData(result.data));

    navigate("/");

    Setemail("");
    Setpassword("");
  } catch (error) {
    console.log(error.response?.data);
    SetError(error.response?.data?.message || "Login failed");
  } finally {
    Setloading(false);
  }
};








          
         

      
  return (
     <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[10px]">
        <div className="w-full h-[200px]  bg-[#20c7ff]   rounded-b-[30%]  shadow-gray-400  font-bold shadow-lg flex items-center justify-center    ">
          <h1 className="text-gray-600  font-size-lg font-bold text-[19px] ">
            welcome to <span className="text-white">chatly</span>
          </h1>
        </div>
        <form  onSubmit={handlelogin} className="w-full flex flex-col gap-[20px] items-center ">
        
          <input value={email}  onChange={(e)=>{
                 Setemail(e.target.value)
          }} type="email" placeholder="email"   className="w-[90%] h-[60px] 
          outline-none border-2 boder-[aqwa] px-[10px]  py-[10px] bg-[white]  rounded-lg hadow-gray-400 shadaw-lg text-gray-700 text-[19px] " />
          <input    onChange={(e)=>{
            Setpassword(e.target.value)
          }}  value={password}  type="password" placeholder="password" className="w-[90%] h-[60px] 
          outline-none border-2 boder-[#20c7ff] px-[10px]  py-[10px] bg-[white]  rounded-lg hadow-gray-400 shadaw-lg text-gray-700 text-[19px] " />
        {err && <p className='text-red-500 ' >{err}</p> }
         <button className="px-[20px] py-[10px] bg-[green]  rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px]   hover:shadow-inner    " >{loading?"Loading..":"Login"}</button>
         <p  className="cursor-pointer  "  onClick={()=>navigate("/signup")}  >Already Have An Account ?  <span className="text-[#20c7ff] text-[bold]          "  > signup</span>  </p>
        </form>

      </div>
    </div>
  )
}

export default Login
