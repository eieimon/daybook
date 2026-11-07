// import React from "react";
import { Outlet } from "react-router-dom";

const MainPanel = () => {
  return (
    <div className="flex-1 h-full bg-basic-theme py-9 px-[42px] overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default MainPanel;
