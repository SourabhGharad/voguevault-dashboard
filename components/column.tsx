import { ColumnDef } from "@tanstack/react-table";
import { InventoryItem } from "@/lib/inventory";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";

export const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatCurrency(row.original.price),
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "Out of Stock"
              ? "destructive"
              : status === "Low Stock"
              ? "secondary"
              : "default"
          }
        >
          {status}
        </Badge>
      );
    },
  },
];