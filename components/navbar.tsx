import Link from "next/link";
import { auth } from "@/auth";
import ThemeToggle from "@/components/theme-toggle";
import UserMenu from "@/components/user-menu";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b sticky top-0 z-50 border-b bg-background">
      <div className="flex h-14 items-center px-6">
        {/* Left: Logo (always visible) */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/favicon.svg"
            alt="VogueVault"
            className="h-10 w-10"
          />
          <span className="text-lg font-bold">VogueVault</span>
        </Link>

        <div className="flex-1" />

        {/* Right: ONLY when logged in */}
        <div className="flex items-center gap-3">
          {session && (
          <div >
            <UserMenu />
          </div>
        )}

        <ThemeToggle />
        </div>
      </div>
    </header>
  );
}