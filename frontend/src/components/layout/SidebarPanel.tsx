import { Link } from "react-router-dom";

const SidebarPanel = () => {
  return (
    <nav className="w-64 h-full bg-gray-200 flex space-x-[10px] flex-col p-4">
      <Link to="/">Overview</Link>
      <Link to="/my-diary">My Diary</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/notes">Notes</Link>
    </nav>
  );
};

export default SidebarPanel;
