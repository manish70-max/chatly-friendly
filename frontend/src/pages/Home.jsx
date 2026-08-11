import React from "react";
import Siderbar from "../components/Siderbar";
import useMessages from "../custom/useMessage";
import MessageArea from "../components/MessageArea";

const Home = () => {
  useMessages();

  return (
    <div className="w-full h-[100vh] flex overflow-hidden">
      <Siderbar />
      <MessageArea />
    </div>
  );
};

export default Home;