import { redirect } from "next/navigation";
import { ADMIN_ROUTES } from "@/routes";

const Home = () => {
  redirect(`${ADMIN_ROUTES.COMMON}`);
};

export default Home;
