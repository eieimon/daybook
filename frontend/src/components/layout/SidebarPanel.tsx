import Navigation from "./Sidebar/Navigation";
import User from "./Sidebar/User";
import WeeklyIntention from "./Sidebar/WeeklyIntention";

const SidebarPanel = () => {
  return (
    <div className="w-64 h-full bg-primary flex flex-col px-[22px] gap-y-8">
      <img src="/assets/logo.svg" alt="daybook-logo" className="mt-8" />
      <Navigation />
      <WeeklyIntention />
      <User />
    </div>
  );
};

export default SidebarPanel;
