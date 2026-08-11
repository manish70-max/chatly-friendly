import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useCurrentUser = () => {

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {  

    const fetchUser = async () => {
      try {

        const result = await axios.get(
          "https://chatly-friendly-backend.onrender.com/api/user/current",
          {
            withCredentials: true,
          }
        );
            console.log("API Response:", result.data);
        dispatch(setUserData(result.data.user));
    // console.log("Dispatched:", result.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();

  }, [dispatch]);

  return { userData };
};

export default useCurrentUser;
