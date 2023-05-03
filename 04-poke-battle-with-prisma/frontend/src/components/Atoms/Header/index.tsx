import { THeaderProps } from "./types";

const Header = ({ children }: THeaderProps) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-base-300/95 backdrop-blur-sm py-10">
      <div className="container px-4 mx-auto flex justify-between items-center">
        {children}
      </div>
    </div>
  );
};

export default Header;
