import StoreSwitcher from "@components/ServiceSwitcher";
import MainNav from "@components/MainNav";
import { getCategories, getServices } from "@/actions/service";
import LogoutButton from "@components/LogoutButton";

interface Props {
  serviceName: string;
}

const Navbar = async ({ serviceName }: Props) => {
  const services = await getServices();
  const categories = await getCategories(serviceName);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={services} />
        <MainNav categories={categories} />
        <div className="ml-auto flex items-center space-x-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
