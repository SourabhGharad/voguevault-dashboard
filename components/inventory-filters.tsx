"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InventoryFiltersProps {
  search?: string;
  status?: string;
}

export default function InventoryFilters({
  search,
  status,
}: InventoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(search ?? "");
  const [statusValue, setStatusValue] = useState<string | undefined>(status);

  function updateUrl(next: {
    search?: string;
    status?: string;
  }) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.search) params.set("search", next.search);
    else params.delete("search");

    if (next.status) params.set("status", next.status);
    else params.delete("status");

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex gap-4 max-w-xl items-end">
      {/* Search */}
      <Input
        placeholder="Search products..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateUrl({ search: searchValue, status: statusValue });
          }
        }}
      />

      {/* Status */}
      <Select
        value={statusValue}
        onValueChange={(value) => {
          setStatusValue(value);
          updateUrl({ search: searchValue, status: value });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="In Stock">In Stock</SelectItem>
          <SelectItem value="Low Stock">Low Stock</SelectItem>
          <SelectItem value="Out of Stock">Out of Stock</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={() => {
          setSearchValue("");
          setStatusValue(undefined);
          router.push("/dashboard");
        }}
      >
        Clear filters
      </Button>
    </div>
  );
}
