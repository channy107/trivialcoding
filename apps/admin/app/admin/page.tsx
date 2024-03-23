import { redirect } from "next/navigation";
import { ADMIN_ROUTES } from "@/routes";

export default function Home() {
  redirect(`${ADMIN_ROUTES.COMMON}`);
}
