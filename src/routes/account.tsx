import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Heart, MapPin, Settings, RotateCcw, Truck } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { useShop } from "@/store/useShop";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — STYLE BELIEVE" },
      { name: "description", content: "Manage your STYLE BELIEVE orders, wishlist, addresses and account settings." },
    ],
  }),
  component: Account,
});

const tabs = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "tracking", label: "Tracking", icon: Truck },
  { id: "returns", label: "Returns", icon: RotateCcw },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

const orders = [
  { id: "SB-10421", date: "May 28, 2026", total: 156, status: "Delivered" },
  { id: "SB-10388", date: "May 9, 2026", total: 240, status: "In Transit" },
  { id: "SB-10302", date: "Apr 22, 2026", total: 88, status: "Delivered" },
];

function Account() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("orders");
  const wishlist = useShop((s) => s.wishlist);
  const wishedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="pt-16">
      <div className="border-b border-border bg-cream px-5 py-12 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Welcome back</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">My Account</h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-12 lg:grid-cols-[240px_1fr] lg:px-10">
        <aside className="flex gap-2 overflow-x-auto hide-scrollbar lg:flex-col">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 px-4 py-3 text-[11px] uppercase tracking-wide-luxe transition-colors",
                tab === t.id ? "bg-ink text-primary-foreground" : "hover:bg-secondary",
              )}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </aside>

        <div className="min-h-[40vh]">
          {tab === "orders" && (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 border border-border p-5">
                  <div>
                    <p className="text-sm font-medium">{o.id}</p>
                    <p className="text-xs text-muted-foreground">{o.date}</p>
                  </div>
                  <span className={cn("px-2.5 py-1 text-[10px] uppercase tracking-wide-luxe", o.status === "Delivered" ? "bg-secondary" : "bg-accent text-accent-foreground")}>
                    {o.status}
                  </span>
                  <span className="text-sm font-medium">{formatPrice(o.total)}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "wishlist" && (
            wishedProducts.length ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
                {wishedProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="font-serif text-2xl italic text-muted-foreground">Your wishlist is empty</p>
                <Link to="/shop" className="mt-4 inline-block text-[11px] uppercase tracking-wide-luxe underline">Discover pieces</Link>
              </div>
            )
          )}

          {tab === "tracking" && (
            <div className="border border-border p-6">
              <p className="text-sm font-medium">Order SB-10388 · In Transit</p>
              <div className="mt-6 space-y-5">
                {["Order placed", "Packed", "Shipped", "Out for delivery", "Delivered"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className={cn("h-2.5 w-2.5 rounded-full", i <= 2 ? "bg-ink" : "bg-border")} />
                    <span className={cn("text-sm", i <= 2 ? "text-foreground" : "text-muted-foreground")}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "returns" && (
            <div className="max-w-lg border border-border p-6">
              <h3 className="font-display text-2xl">Returns & Refunds</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Enjoy 30-day hassle-free returns on all unworn items. Select an order to start a return and we'll email you a prepaid label.
              </p>
              <button className="mt-5 bg-ink px-7 py-3 text-[11px] uppercase tracking-wide-luxe text-primary-foreground">Start a Return</button>
            </div>
          )}

          {tab === "addresses" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-border p-5">
                <p className="text-[11px] uppercase tracking-wide-luxe text-muted-foreground">Default</p>
                <p className="mt-2 text-sm">Alex Rivera</p>
                <p className="text-sm text-muted-foreground">120 Mercer Street<br />New York, NY 10012</p>
              </div>
              <button className="grid place-items-center border border-dashed border-border p-5 text-[11px] uppercase tracking-wide-luxe text-muted-foreground hover:bg-secondary">
                + Add Address
              </button>
            </div>
          )}

          {tab === "settings" && (
            <div className="max-w-lg space-y-3">
              <input defaultValue="Alex Rivera" className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground" />
              <input defaultValue="alex@stylebelieve.com" className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground" />
              <input type="password" defaultValue="password" className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground" />
              <button className="bg-ink px-7 py-3 text-[11px] uppercase tracking-wide-luxe text-primary-foreground">Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}