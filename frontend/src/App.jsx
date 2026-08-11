import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import SignUP from "./pages/SignUP";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import useCurrentUser from "./custom/useCurrentUser";
import useOtherUsers from "./custom/useOtherUsers";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setOnlineUser} from "./redux/userSlice";
import { socket } from "./socket/socket";

function App() {

  useCurrentUser();
  useOtherUsers();

  
  const { userData ,onlineUser } = useSelector((state) => state.user);

    console.log("onlineuser", onlineUser)
  
  const dispatch = useDispatch();

// useEffect(() => {
//   if (!userData) return;

//   socket.io.opts.query = {
//     userId: userData._id,
//   };

//   socket.connect();

//   socket.on("connect", () => {
//     console.log("✅ Connected");
//     console.log("Socket ID:", socket.id);
//     console.log("Connected:", socket.connected);
//   });


//   socket.on("connect_error", (err) => {
//     console.log("Connect Error:", err);
//   });

//   return () => {
//     socket.off("connect");
//     socket.off("connect_error");
//   };
// }, [userData]);


  useEffect(() => {
  if (!userData) {
    socket.disconnect();
    return;
  }

  socket.io.opts.query = {
    userId: userData._id,
  };

  

  socket.connect();

console.log("Socket Connected:", socket.id);


  socket.on("getOnlineUsers", (users) => {


         
    console.log("✅ Connected");
    console.log("Socket ID:", socket.id);
    console.log("Connected:", socket.connected);
    dispatch(setOnlineUser(users));
    


  });

  return () => {
    socket.off("getOnlineUsers");
    socket.disconnect();
  };
}, [userData, dispatch]);



  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUP /> : <Navigate to="/profile" />}
      />

      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/profile" />}
      />

      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />

      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
