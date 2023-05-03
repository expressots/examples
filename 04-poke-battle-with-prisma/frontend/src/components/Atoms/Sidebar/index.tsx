import { TSidebarProps } from "./type";
import { twMerge } from "tailwind-merge";

const Sidebar = ({ children, className }: TSidebarProps) => {
  return (
    <div className="bg-base-100/90 fixed backdrop-blur-sm left-0 top-0 h-screen p-4 w-full sm:max-w-sm max-w-full shadow-[0px_0px_10px] shadow-black/80">
      <div className={twMerge("h-[95vh] overflow-auto", className)}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
