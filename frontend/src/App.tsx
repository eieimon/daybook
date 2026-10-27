import MainPanel from "./components/layout/MainPanel";
import SidebarPanel from "./components/layout/SidebarPanel";

function App() {
  return (
    <div className="flex flex-row w-full h-screen">
      <SidebarPanel />
      <MainPanel />
    </div>
  );
}

export default App;
