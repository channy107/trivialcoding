import { redirect } from "next/navigation";
import { STORE_ROUTES } from "@/routes";

const HomePage = () => {
  redirect(`${STORE_ROUTES.HOME}`);
};

export default HomePage;
