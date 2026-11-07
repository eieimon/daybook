import React from "react";
import GreetingHeader from "./GreetingHeader";

const Overview = () => {
  return (
    <div className="flex flex-col gap-y-7">
      <GreetingHeader />
      <div className="p-8 rounded-2xl bg-white"></div>
      <div className="grid grid-cols-3 gap-x-6">
        <div className="col-span-2 gap-y-7 flex flex-col">
          <section
            className="p-8 rounded-2xl bg-white"
            aria-labelledby="today-tasks"
          >
            <div className="flex flex-row justify-between items-center gap-y-2">
              <h2 id="today-tasks" className="font-bold text-xl text-title">
                Today’s tasks
              </h2>
              <p>2 tasks</p>
            </div>
            <div></div>
          </section>
          <div className="p-8 rounded-2xl bg-white"></div>
        </div>
        <div className="p-8 rounded-2xl bg-white"></div>
      </div>
    </div>
  );
};

export default Overview;
