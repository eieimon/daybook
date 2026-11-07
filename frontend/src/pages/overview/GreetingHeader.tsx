// import React from "react";
import AddNewTasks from "./AddNewTasks";

const GreetingHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center gap-y-2">
      <div>
        <p className="text-xs-custom text-subtitle">Wednesday, September 16</p>
        <h1 className="text-2xl font-bold text-title">Good morning, Maya</h1>
      </div>
      <AddNewTasks />
    </div>
  );
};

export default GreetingHeader;
