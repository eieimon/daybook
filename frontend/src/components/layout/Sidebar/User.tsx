import { IoSettingsOutline } from "react-icons/io5";

const User = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex gap-x-2 items-center">
        <div className="w-10 h-10 rounded-full bg-white"></div>
        <div>
          <p className="font-bold text-title">Maya</p>
          <p className="text-xs text-muted">Personal Space</p>
        </div>
      </div>
      <button
        type="button"
        aria-label="settings"
        className="cursor-pointer hover:text-primary ease-in-out duration-300"
      >
        <IoSettingsOutline className="text-white" />
      </button>
    </div>
  );
};

export default User;
