import { Link } from "react-router-dom";
import { CiGrid42 } from "react-icons/ci";
import { GoBook } from "react-icons/go";
import { GoTasklist } from "react-icons/go";
import { CiCalendarDate } from "react-icons/ci";
import { LuStickyNote } from "react-icons/lu";

const Navigation = () => {
  return (
    <nav className="flex flex-col gap-x-4 gap-y-2">
      <Link to="/" className="flex items-center p-3">
        <CiGrid42 className="mr-3" />
        <span>Overview</span>
      </Link>
      <Link to="/my-diary" className="flex items-center p-3 bg-white">
        <GoBook className="mr-3" />
        <span>My Diary</span>
      </Link>
      <Link to="/tasks" className="flex items-center p-3">
        <GoTasklist className="mr-3" />
        <span>Tasks</span>
      </Link>
      <Link to="/calendar" className="flex items-center p-3">
        <CiCalendarDate className="mr-3" />
        <span>Calendar</span>
      </Link>
      <Link to="/notes" className="flex items-center p-3">
        <LuStickyNote className="mr-3" />
        <span>Notes</span>
      </Link>
    </nav>
  );
};

export default Navigation;
