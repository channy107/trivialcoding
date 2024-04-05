import Heading from "./Heading";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  return (
    <div className="py-2 fixed top-0 w-full bg-white z-10">
      <div className="flex items-center md:p-1">
        <MobileSidebar />
        <div className="flex w-full justify-center md:justify-start">
          <Heading />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
