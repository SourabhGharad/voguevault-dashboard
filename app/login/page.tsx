import { auth,signIn } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            VogueVault
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Sign in to access the operations dashboard
          </p>
        <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
        >
          <Button className="w-full">
            Sign in with Google
          </Button>
        </form>
        </CardContent>
      </Card>
    </div>
  );
}
