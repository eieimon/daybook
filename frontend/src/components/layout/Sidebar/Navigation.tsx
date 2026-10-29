import { Link } from "react-router-dom";
import { CiGrid42 } from "react-icons/ci";
import { GoBook } from "react-icons/go";
import { GoTasklist } from "react-icons/go";
import { CiCalendarDate } from "react-icons/ci";
import { LuStickyNote } from "react-icons/lu";

const Navigation = () => {
  return (
    <div>
      <p className="text-2xs text-muted font-bold uppercase mb-2">Workspace</p>
      <nav className="flex flex-col gap-x-4 gap-y-2">
        <Link to="/" className="flex items-center p-3">
          <CiGrid42 className="mr-3" />
          <span className="text-sm-custom text-muted">Overview</span>
        </Link>
        <Link to="/my-diary" className="flex items-center p-3 bg-white">
          <GoBook className="mr-3" />
          <span className="text-sm-custom text-title">My Diary</span>
        </Link>
        <Link to="/tasks" className="flex items-center p-3">
          <GoTasklist className="mr-3" />
          <span className="text-sm-custom text-muted">Tasks</span>
        </Link>
        <Link to="/calendar" className="flex items-center p-3">
          <CiCalendarDate className="mr-3" />
          <span className="text-sm-custom text-muted">Calendar</span>
        </Link>
        <Link to="/notes" className="flex items-center p-3">
          <LuStickyNote className="mr-3" />
          <span className="text-sm-custom text-muted">Notes</span>
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
