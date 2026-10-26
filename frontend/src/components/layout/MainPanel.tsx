import React from "react";
import { Outlet } from "react-router-dom";

const MainPanel = () => {
  return (
    <div className="flex-1 h-full bg-white">
      <Outlet />
    </div>
  );
};

export default MainPanel;
