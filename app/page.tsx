import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          VogueVault
        </h1>

        <p className="text-muted-foreground text-lg">
          A clean dashboard for managing inventory, stock status, and insights —
          all in one place.
        </p>

        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
