import Navigation from "./Sidebar/Navigation";
import User from "./Sidebar/User";
import WeeklyIntention from "./Sidebar/WeeklyIntention";

const SidebarPanel = () => {
  return (
    <div className="w-64 h-full bg-primary flex flex-col p-4 gap-y-12">
      <Navigation />
      <WeeklyIntention />
      <User />
    </div>
  );
};

export default SidebarPanel;
