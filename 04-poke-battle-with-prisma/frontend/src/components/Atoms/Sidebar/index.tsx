import { TSidebarProps } from "./type";
import { twMerge } from "tailwind-merge";

const Sidebar = ({ children, className }: TSidebarProps) => {
  return (
    <div className="bg-base-100 fixed backdrop-blur-sm left-0 top-0 h-screen p-4 w-full sm:max-w-sm max-w-full shadow-[0px_0px_10px] shadow-black/80">
      <div
        className={twMerge("animate-fadeIn h-[95vh] overflow-auto", className)}
      >
        {children}
      </div>
      <div className="font-thin flex justify-center items-start w-full ">
        <p>
          This app made with{" "}
          <a
            href="https://github.com/expressots/expressots"
            target="_blank"
            className="border-b-2 border-b-primary"
          >
            ExpressoTS
          </a>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
