import { auth, signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UserMenu() {
  const session = await auth();

  if (!session?.user) return null;

  const { name, image } = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={image ?? ""} alt={name ?? ""} />
            <AvatarFallback>
              {name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <span className="text-sm font-medium">
            {name}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <DropdownMenuItem asChild>
            <button className="w-full text-left">
              Log out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
