// Conditional routing
import { auth } from "@/auth";
import { ApolloIndicator } from "@/components/ui/apollo-indicator";
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
  return (
    // We use a provider so that all react components can access the session without needing to pass it down
    // <SessionProvider session={session}>
    <>
      {session.user.role === "patient" ? patient : nurse}
      <ApolloIndicator />
    </>
    // </SessionProvider>
  );
}
