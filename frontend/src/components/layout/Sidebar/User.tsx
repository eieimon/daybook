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
      <div>
        <IoSettingsOutline className="text-white" />
      </div>
    </div>
  );
};

export default User;
