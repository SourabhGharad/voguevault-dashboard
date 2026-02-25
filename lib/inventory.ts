// src/lib/inventory.ts
export type SortBy = "price" | "stock" | undefined;
export type Order = "asc" | "desc";

export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock" | string;
  // add other fields as needed
}

export type InventoryFilters = {
  /** user-entered search string (trimmed & lowercase will be used) */
  search?: string | null;
  /** exact status string, e.g. "In Stock" */
  status?: string | null;
};

/**
 * Normalizes a search string: trim + lowercase; returns undefined for empty strings.
 */
export function normalizeSearch(s?: string | null): string | undefined {
  if (!s) return undefined;
  const t = s.trim();
  return t === "" ? undefined : t.toLowerCase();
}

/**
 * Normalizes status: trim; returns undefined for empty.
 */
export function normalizeStatus(s?: string | null): string | undefined {
  if (!s) return undefined;
  const t = s.trim();
  return t === "" ? undefined : t;
}

/**
 * Pure filter function implementing the four cases you asked for:
 * - no search & no status => all items
 * - search only => items matching search (name includes)
 * - status only => items matching status
 * - both => items matching both
 */
export function filterItems(
  items: InventoryItem[],
  filters: InventoryFilters
): InventoryItem[] {
  const search = normalizeSearch(filters.search);
  const status = normalizeStatus(filters.status);

  // If neither filter, return original array (shallow copy to avoid accidental mutation)
  if (!search && !status) return [...items];

  return items.filter((item) => {
    // search match (if provided)
    if (search) {
      if (!item.name.toLowerCase().includes(search)) return false;
    }

    // status match (if provided)
    if (status) {
      if (item.status !== status) return false;
    }

    return true;
  });
}

/**
 * Sort items by a numeric key (price or stock).
 * If sortBy is undefined, returns a shallow copy of items (unchanged order).
 */
export function sortItems(
  items: InventoryItem[],
  sortBy: SortBy,
  order: Order = "asc"
): InventoryItem[] {
  if (!sortBy) return [...items];

  const copy = [...items];
  copy.sort((a, b) => {
    const aVal = (a as any)[sortBy] as number | undefined;
    const bVal = (b as any)[sortBy] as number | undefined;

    // Handle undefined gracefully
    if (aVal === undefined && bVal === undefined) return 0;
    if (aVal === undefined) return order === "asc" ? 1 : -1;
    if (bVal === undefined) return order === "asc" ? -1 : 1;

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });

  return copy;
}

/**
 * Convenience: apply filter first, then sort.
 */
export function applyFiltersAndSort(
  items: InventoryItem[],
  filters: InventoryFilters,
  sortBy?: SortBy,
  order: Order = "asc"
): InventoryItem[] {
  const filtered = filterItems(items, filters);
  const sorted = sortItems(filtered, sortBy, order);
  return sorted;
}
