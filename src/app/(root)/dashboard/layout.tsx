// Conditional routing
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Layout({
  nurse,
  patient,
}: {
  nurse: React.ReactNode;
  patient: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/auth/login");
  return <>{session.user.role === "patient" ? patient : nurse}</>;
}
