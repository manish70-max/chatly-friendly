import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useMessages = () => {
  const dispatch = useDispatch();
  const { userData, selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData || !selectedUser) return;

    const fetchMessage = async () => {
      try {
        const result = await axios.get(
          `https://chatly-friendly-backend.onrender.com/api/message/get/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );

        console.log("Messages:", result.data);

        dispatch(setMessages(result.data));

      } catch (error) {
        console.log(error);
      }
    };

    fetchMessage(); // ✅ yaha change
  }, [selectedUser, userData, dispatch]);
};

export default useMessages;
