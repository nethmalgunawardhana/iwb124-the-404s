import React from "react";
import { useNavigate } from "react-router-dom";

const FullScreenComponent = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center h-screen w-screen"
      onClick={() => navigate("/")}
    >
      <div
        className="font-semibold text-purple-600 hover:cursor-pointer hover:scale-105 transition-transform duration-300"
        style={{ fontSize: "36vh" }} // Set font size to 75% of viewport height
      >
        EventUni™
      </div>
    </div>
  );
};

export default FullScreenComponent;
