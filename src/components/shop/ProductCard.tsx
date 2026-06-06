import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Eye, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useShop } from "@/store/useShop";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggleWishlist, wishlist, setQuickView, addToCart } = useShop();
  const wished = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <Link to="/product/$id" params={{ id: product.id }} aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
          />
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 bg-ink px-2.5 py-1 text-[10px] uppercase tracking-wide-luxe text-primary-foreground">
            {product.badge}
          </span>
        )}

        <button
          onClick={() => {
            toggleWishlist(product.id);
            toast(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          aria-label="Toggle wishlist"
          className="glass absolute right-3 top-3 grid h-9 w-9 place-items-center transition-transform hover:scale-110"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-ink text-ink")} />
        </button>

        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => addToCart(product, product.sizes[1] ?? product.sizes[0], product.colors[0].name)}
            className="flex-1 bg-ink py-2.5 text-[11px] uppercase tracking-wide-luxe text-primary-foreground transition-colors hover:bg-foreground/85"
          >
            Add to Cart
          </button>
          <button
            onClick={() => setQuickView(product)}
            aria-label="Quick view"
            className="glass grid w-11 place-items-center"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="truncate text-sm font-medium tracking-tight hover:underline"
          >
            {product.name}
          </Link>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            {product.rating}
          </span>
        </div>
        <p className="text-[11px] uppercase tracking-wide-luxe text-muted-foreground">
          {product.category}
        </p>
        <div className="flex items-center gap-2 pt-0.5">
          {product.salePrice ? (
            <>
              <span className="text-sm font-medium">{formatPrice(product.salePrice)}</span>
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}