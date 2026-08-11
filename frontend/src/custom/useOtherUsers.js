import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useOtherUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return;

    const fetchUsers = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/user/others",
          {
            withCredentials: true,
          }
        );
          
         
        //  console.log("API Response:", result.data);
      
        console.log("Dispatched");
        dispatch(setOtherUsers(result.data));
         console.log("Payload:", result.data);
       
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [ userData]);
};

export default useOtherUsers;