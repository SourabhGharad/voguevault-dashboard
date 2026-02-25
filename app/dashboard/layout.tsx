import UserMenu from "@/components/user-menu";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <main>{children}</main>
    </div>
  );
}
