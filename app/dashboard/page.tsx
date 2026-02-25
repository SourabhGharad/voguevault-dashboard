// app/dashboard/page.tsx
import InventoryTable from "@/components/inventory-table";
import InventoryFilters from "@/components/inventory-filters";
import { getInventory, InventoryItem } from "@/lib/inventory";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    status?: string;
    sort?: "price" | "stock";
    order?: "asc" | "desc";
  };
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
   const param = await searchParams;
  
   const items: InventoryItem[] = await getInventory();

  const search = param.search?.toLowerCase() ?? "";
  const status = param.status ?? undefined;

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search);

    const matchesStatus = status
      ? item.status === status
      : true;

    return matchesSearch && matchesStatus;
  });

  const sortBy = param.sort;
  const order = param.order ?? "asc";

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortBy) return 0;

    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (valueA < valueB) return order === "asc" ? -1 : 1;
    if (valueA > valueB) return order === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Inventory</h1>

      <InventoryFilters search={search} status={status} />

      <InventoryTable
        filter={{ search, status }}
        items={sortedItems}
        sort={sortBy}
        order={order}
      />
    </div>
  );
}