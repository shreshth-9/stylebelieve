import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star } from "lucide-react";
import { toast } from "sonner";
import { useShop } from "@/store/useShop";
import { formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

export function QuickViewModal() {
  const { quickView, setQuickView, addToCart } = useShop();
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    if (quickView) {
      setSize(quickView.sizes[1] ?? quickView.sizes[0]);
      setColor(quickView.colors[0].name);
    }
  }, [quickView]);

  return (
    <AnimatePresence>
      {quickView && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickView(null)}
            className="fixed inset-0 z-[80] bg-foreground/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[90] grid w-[92%] max-w-3xl -translate-x-1/2 -translate-y-1/2 grid-cols-1 overflow-hidden bg-background shadow-luxe md:grid-cols-2"
          >
            <img
              src={quickView.image}
              alt={quickView.name}
              className="hidden h-full max-h-[560px] w-full object-cover md:block"
            />
            <div className="relative p-7">
              <button
                onClick={() => setQuickView(null)}
                aria-label="Close quick view"
                className="absolute right-4 top-4"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="text-[11px] uppercase tracking-wide-luxe text-muted-foreground">
                {quickView.category}
              </p>
              <h3 className="mt-1 font-display text-2xl">{quickView.name}</h3>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {quickView.rating}
                <span className="text-muted-foreground">({quickView.reviews})</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {quickView.salePrice ? (
                  <>
                    <span className="text-lg font-medium">{formatPrice(quickView.salePrice)}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(quickView.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-medium">{formatPrice(quickView.price)}</span>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {quickView.description}
              </p>

              <div className="mt-5">
                <p className="text-[11px] uppercase tracking-wide-luxe">Color · {color}</p>
                <div className="mt-2 flex gap-2">
                  {quickView.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      aria-label={c.name}
                      style={{ background: c.hex }}
                      className={cn(
                        "h-7 w-7 rounded-full border transition-all",
                        color === c.name ? "ring-2 ring-foreground ring-offset-2" : "border-border",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[11px] uppercase tracking-wide-luxe">Size</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {quickView.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={cn(
                        "h-9 min-w-9 border px-2 text-xs transition-colors",
                        size === s ? "border-foreground bg-ink text-primary-foreground" : "border-border hover:border-foreground",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => {
                    addToCart(quickView, size, color);
                    setQuickView(null);
                  }}
                  className="flex-1 bg-ink py-3 text-[11px] uppercase tracking-wide-luxe text-primary-foreground hover:bg-foreground/85"
                >
                  Add to Cart
                </button>
                <Link
                  to="/product/$id"
                  params={{ id: quickView.id }}
                  onClick={() => {
                    toast("Opening product");
                    setQuickView(null);
                  }}
                  className="grid place-items-center border border-foreground px-5 text-[11px] uppercase tracking-wide-luxe hover:bg-secondary"
                >
                  Details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}