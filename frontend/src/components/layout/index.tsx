import SidebarPanel from "./SidebarPanel";
import MainPanel from "./MainPanel";

const AppLayoutComponent = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <SidebarPanel />
      <MainPanel />
    </div>
  );
};

export default AppLayoutComponent;
