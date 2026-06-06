import { Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

export function NewArrivals() {
  const items = [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Just Dropped</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">New Arrivals</h2>
          </div>
          <Link
            to="/shop"
            search={{ sort: "newest" }}
            className="hidden text-[11px] uppercase tracking-wide-luxe hover:opacity-60 sm:block"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}