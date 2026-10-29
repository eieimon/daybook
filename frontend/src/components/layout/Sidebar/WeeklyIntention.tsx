import React from "react";

const WeeklyIntention = () => {
  return (
    <div className="p-4 bg-secondary rounded-lg">
      <h6 className="uppercase font-bold text-2xs text-title mb-2">
        Weekly Intention
      </h6>
      <h4 className="text-lg font-bold text-title">
        Make room for what matters.
      </h4>
      <div>
        <div className="w-full h-2 bg-progress rounded-full overflow-hidden">
          <div className="w-[66.67%] h-full bg-muted rounded-full"></div>
        </div>
        <p className="text-sm text-muted text-2xs pt-2.5">
          4 of 6 habits complete
        </p>
      </div>
    </div>
  );
};

export default WeeklyIntention;
