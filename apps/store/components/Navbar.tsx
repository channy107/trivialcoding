import Link from "next/link";
import Container from "@components/Container";
import NavbarActions from "@components/NavActions";
import MainNav from "@components/MainNav";
import { getCategories } from "@actions/category";
import MobileSheet from "./MoblieSheet";
import { Separator } from "@repo/ui/components/ui/separator";
import { Menu, Plus } from "lucide-react";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories("large");

  return (
    <div className="border-b">
      <Container>
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/">
              <p className="font-bold text-xl">STORE</p>
            </Link>
            <div className="hidden lg:flex lg:ml-6">
              <MainNav data={categories} />
            </div>
          </div>
          <div className="flex">
            <div className="lg:hidden">
              <MobileSheet
                title="Store"
                triggerComponent={<Menu size={24} />}
                content={
                  <div className="flex flex-col items-center gap-4">
                    <MainNav data={categories} />
                    <Separator />
                    <NavbarActions />
                  </div>
                }
              />
            </div>
            <div className="hidden lg:block">
              <NavbarActions />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
