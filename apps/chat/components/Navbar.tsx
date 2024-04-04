import Heading from "./Heading";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  return (
    <div className="flex items-center md:p-1">
      <MobileSidebar />
      <div className="flex w-full justify-center md:justify-start">
        <Heading />
      </div>
    </div>
  );
};

export default Navbar;
