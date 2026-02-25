"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { InventoryItem } from "@/app/api/inventory/route";
import { ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";



interface InventoryTableProps {
  items: InventoryItem[];
  filter: {
    status?: string;
    search?: string;
  }
  sort?: "price" | "stock";
  order?: "asc" | "desc";
}

function getStatusVariant(
  status: InventoryItem["status"]
) {
  switch (status) {
    case "Out of Stock":
      return "destructive";
    case "Low Stock":
      return "secondary";
    default:
      return "default";
  }
}

function getNextOrder(
  currentSort: string | undefined,
  currentOrder: string | undefined,
  column: "price" | "stock"
) {
  if (currentSort !== column) return "asc";
  return currentOrder === "asc" ? "desc" : "asc";
}

function getSortHref(filter:{search?: string; status?: string},sort:string | undefined,order:string | undefined,column:"price" | "stock") {
  const params = new URLSearchParams({
    search: filter.search ?? "",
    status: filter.status ?? "",
    sort: column,
    order: getNextOrder(sort, order, column),
  });
  return `?${params.toString()}`;
}

export default function InventoryTable({ filter, items, sort, order }: InventoryTableProps) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>
            <Link
              href={getSortHref(filter, sort, order, "price")}
              className="flex items-center gap-1"
            >
              Price
              {sort === "price" &&
                (order === "asc" ? (
                  <ArrowUp size={14} />
                ) : (
                  <ArrowDown size={14} />
                ))}
            </Link>
          </TableHead>

          <TableHead>
            <Link
              href={getSortHref(filter, sort, order, "stock")}
              className="flex items-center gap-1"
            >
              Stock
              {sort === "stock" &&
                (order === "asc" ? (
                  <ArrowUp size={14} />
                ) : (
                  <ArrowDown size={14} />
                ))}
            </Link>
          </TableHead>

          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>
              {formatCurrency(item.price)}
            </TableCell>
            <TableCell>{item.stock}</TableCell>
            <TableCell>
            <Badge variant={getStatusVariant(item.status)}>
              {item.status}
            </Badge>
          </TableCell>

            <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded hover:bg-muted">
                <MoreHorizontal size={16} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                Edit Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
