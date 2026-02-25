// app/api/inventory/route.ts
import { getInventory } from "@/lib/inventory";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const items = await getInventory({
    search: searchParams.get("search") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    sort: searchParams.get("sort") as "price" | "stock" | undefined,
    order: searchParams.get("order") as "asc" | "desc" | undefined,
  });

  return NextResponse.json(items);
}