import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";
import { products, ALL_SIZES, formatPrice } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

interface ShopSearch {
  category?: string;
  gender?: string;
  sort?: string;
  q?: string;
}

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
    gender: typeof search.gender === "string" ? search.gender : undefined,
    sort: typeof search.sort === "string" ? search.sort : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All — STYLE BELIEVE" },
      { name: "description", content: "Browse the full STYLE BELIEVE collection. Filter by category, color, size and price." },
      { property: "og:title", content: "Shop All — STYLE BELIEVE" },
      { property: "og:description", content: "Browse the full STYLE BELIEVE collection." },
    ],
  }),
  component: Shop,
});

const CATEGORIES = ["T-Shirts", "Shirts", "Hoodies", "Jackets", "Jeans", "Dresses", "Tops", "Activewear"];
const COLORS = ["Black", "Sand", "Ivory", "Slate", "Indigo"];
const SORTS = [
  { value: "popular", label: "Popularity" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selCats, setSelCats] = useState<string[]>(search.category ? [search.category] : []);
  const [selColors, setSelColors] = useState<string[]>([]);
  const [selSizes, setSelSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(260);
  const sort = search.sort ?? "popular";

  // Keep the category filter in sync when navigating between category links
  // while already on the shop page (e.g. via the navbar mega menu).
  useEffect(() => {
    setSelCats(search.category ? [search.category] : []);
  }, [search.category]);

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((a) => a !== val) : [...arr, val]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.gender) list = list.filter((p) => p.gender === search.gender || p.gender === "Unisex");
    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      );
    }
    if (selCats.length) list = list.filter((p) => selCats.includes(p.category));
    if (selColors.length) list = list.filter((p) => p.colors.some((c) => selColors.includes(c.name)));
    if (selSizes.length) list = list.filter((p) => p.sizes.some((s) => selSizes.includes(s)));
    list = list.filter((p) => (p.salePrice ?? p.price) <= maxPrice);

    switch (sort) {
      case "newest":
        list.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "price-asc":
        list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      default:
        list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [search.gender, search.q, selCats, selColors, selSizes, maxPrice, sort]);

  const clearAll = () => {
    setSelCats([]);
    setSelColors([]);
    setSelSizes([]);
    setMaxPrice(260);
  };

  const FilterPanel = () => (
    <div className="space-y-8">
      <FilterGroup title="Category">
        {CATEGORIES.map((c) => (
          <Checkbox key={c} label={c} checked={selCats.includes(c)} onChange={() => toggle(selCats, setSelCats, c)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Color">
        {COLORS.map((c) => (
          <Checkbox key={c} label={c} checked={selColors.includes(c)} onChange={() => toggle(selColors, setSelColors, c)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggle(selSizes, setSelSizes, s)}
              className={cn(
                "h-9 min-w-9 border px-2 text-xs transition-colors",
                selSizes.includes(s) ? "border-foreground bg-ink text-primary-foreground" : "border-border hover:border-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title={`Max Price · ${formatPrice(maxPrice)}`}>
        <input
          type="range"
          min={36}
          max={260}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--ink)]"
        />
      </FilterGroup>
      <button onClick={clearAll} className="text-[11px] uppercase tracking-wide-luxe underline hover:opacity-60">
        Clear All
      </button>
    </div>
  );

  return (
    <div className="pt-16">
      <div className="border-b border-border bg-cream px-5 py-12 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">
            {search.q ? "Results" : "Collection"}
          </p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">
            {search.q ? `“${search.q}”` : search.gender ? `${search.gender}` : "Shop All"}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="hidden w-60 shrink-0 lg:block">
            <FilterPanel />
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-2 border border-border px-3 py-2 text-[11px] uppercase tracking-wide-luxe lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <p className="text-xs text-muted-foreground">{filtered.length} products</p>
              <div className="flex items-center gap-3">
                <select
                  value={sort}
                  onChange={(e) => navigate({ search: (p: ShopSearch) => ({ ...p, sort: e.target.value }) })}
                  className="border border-border bg-background px-3 py-2 text-xs outline-none"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      Sort: {s.label}
                    </option>
                  ))}
                </select>
                <div className="hidden border border-border sm:flex">
                  <button onClick={() => setView("grid")} aria-label="Grid view" className={cn("grid h-9 w-9 place-items-center", view === "grid" && "bg-ink text-primary-foreground")}>
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button onClick={() => setView("list")} aria-label="List view" className={cn("grid h-9 w-9 place-items-center", view === "list" && "bg-ink text-primary-foreground")}>
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="py-20 text-center font-serif text-2xl italic text-muted-foreground">
                No products match your filters.
              </p>
            ) : (
              <div
                className={cn(
                  view === "grid"
                    ? "grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3"
                    : "grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2",
                )}
              >
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setFiltersOpen(false)} />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-background p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[12px] uppercase tracking-wide-luxe">Filters</p>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-8 w-full bg-ink py-3 text-[11px] uppercase tracking-wide-luxe text-primary-foreground"
            >
              Show {filtered.length} Results
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-wide-luxe">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="flex items-center gap-2.5 text-sm">
      <span className={cn("grid h-4 w-4 place-items-center border", checked ? "border-foreground bg-ink" : "border-border")}>
        {checked && <span className="h-2 w-2 bg-primary-foreground" />}
      </span>
      <span className={cn(checked ? "text-foreground" : "text-muted-foreground")}>{label}</span>
    </button>
  );
}