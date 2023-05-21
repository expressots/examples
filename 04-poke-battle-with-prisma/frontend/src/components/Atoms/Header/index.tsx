import { THeaderProps } from "./types";

const Header = ({ children }: THeaderProps) => {
  return (
    <div className="shadow-sm z-40 fixed top-0 left-0 w-full bg-base-300/80 backdrop-blur-md py-2">
      <div className="container px-4 mx-auto w-full">{children}</div>
    </div>
  );
};

export default Header;
