import { THeaderProps } from "./types";

const Header = ({ children }: THeaderProps) => {
  return (
    <div className="z-40 fixed top-0 left-0 w-full bg-base-300/90 backdrop-blur-md py-2">
      <div className="container px-4 mx-auto flex justify-between items-center">
        {children}
      </div>
    </div>
  );
};

export default Header;
