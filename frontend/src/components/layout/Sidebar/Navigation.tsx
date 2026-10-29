import { NavLink } from "react-router-dom";
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
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${
              isActive
                ? "bg-secondary text-title"
                : "text-muted hover:bg-secondary/50 hover:text-primary group"
            }`
          }
        >
          <CiGrid42 className="mr-3" aria-hidden="true" focusable="false" />
          <span className="text-sm-custom group-hover:text-primary">
            Overview
          </span>
        </NavLink>
        <NavLink
          to="/my-diary"
          end
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${
              isActive
                ? "bg-secondary text-title"
                : "text-muted hover:bg-secondary/50 hover:text-primary group"
            }`
          }
        >
          <GoBook className="mr-3" aria-hidden="true" focusable="false" />
          <span className="text-sm-custom group-hover:text-primary">
            My Diary
          </span>
        </NavLink>
        <NavLink
          to="/tasks"
          end
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${
              isActive
                ? "bg-secondary text-title"
                : "text-muted hover:bg-secondary/50 hover:text-primary group"
            }`
          }
        >
          <GoTasklist className="mr-3" aria-hidden="true" focusable="false" />
          <span className="text-sm-custom group-hover:text-primary">Tasks</span>
        </NavLink>
        <NavLink
          to="/calendar"
          end
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${
              isActive
                ? "bg-secondary text-title"
                : "text-muted hover:bg-secondary/50 hover:text-primary group"
            }`
          }
        >
          <CiCalendarDate
            className="mr-3"
            aria-hidden="true"
            focusable="false"
          />
          <span className="text-sm-custom group-hover:text-primary">
            Calendar
          </span>
        </NavLink>
        <NavLink
          to="/notes"
          end
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${
              isActive
                ? "bg-secondary text-title"
                : "text-muted hover:bg-secondary/50 hover:text-primary group"
            }`
          }
        >
          <LuStickyNote className="mr-3" aria-hidden="true" focusable="false" />
          <span className="text-sm-custom group-hover:text-primary">Notes</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
