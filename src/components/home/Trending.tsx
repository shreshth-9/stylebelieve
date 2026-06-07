import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

const tabs = ["Best Sellers", "Trending This Week", "Staff Picks", "Limited Edition"] as const;
type Tab = (typeof tabs)[number];

const filterFor: Record<Tab, (typeof products)[number]["badge"][]> = {
  "Best Sellers": ["Best Seller"],
  "Trending This Week": ["Trending"],
  "Staff Picks": ["Staff Pick"],
  "Limited Edition": ["Limited"],
};

export function Trending() {
  const [tab, setTab] = useState<Tab>("Best Sellers");
  const filtered = products.filter((p) => filterFor[tab].includes(p.badge));
  const items = (filtered.length ? filtered : products).slice(0, 4);

  return (
    <section className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-28">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">The Edit</p>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">Trending Fashion</h2>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-[11px] uppercase tracking-wide-luxe transition-colors ${
              tab === t
                ? "bg-ink text-primary-foreground"
                : "border border-border hover:border-foreground hover:bg-secondary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4"
        >
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}