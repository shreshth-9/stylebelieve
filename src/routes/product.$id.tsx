import { useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Minus,
  Plus,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { getProduct, products, formatPrice } from "@/data/products";
import { useShop } from "@/store/useShop";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — STYLE BELIEVE` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — STYLE BELIEVE` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
          { name: "twitter:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center pt-16 text-center">
      <div>
        <p className="font-serif text-3xl italic">Product not found</p>
        <Link to="/shop" className="mt-4 inline-block text-[11px] uppercase tracking-wide-luxe underline">
          Back to shop
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="grid min-h-screen place-items-center pt-16">
      <p className="font-serif text-2xl italic">Something went wrong.</p>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, setCartOpen } = useShop();
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const wished = wishlist.includes(product.id);
  const gallery = [product.image, product.hoverImage, product.image];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fallbackRelated = related.length ? related : products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = (buyNow = false) => {
    addToCart(product, size, color, qty);
    if (buyNow) {
      setCartOpen(false);
      navigate({ to: "/checkout" });
    }
  };

  return (
    <div className="pt-16">
      <nav className="mx-auto flex max-w-[1500px] items-center gap-1.5 px-5 py-5 text-[11px] uppercase tracking-wide-luxe text-muted-foreground lg:px-10">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 pb-20 lg:grid-cols-2 lg:px-10">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          <div className="flex gap-3 lg:flex-col">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "aspect-[3/4] w-16 overflow-hidden border lg:w-20",
                  activeImg === i ? "border-foreground" : "border-border",
                )}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="group relative aspect-[3/4] flex-1 overflow-hidden bg-secondary"
          >
            <img
              src={gallery[activeImg]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-150"
            />
            <span className="glass absolute bottom-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-wide-luxe">
              Hover to zoom
            </span>
          </motion.div>
        </div>

        {/* Info */}
        <div className="lg:py-2">
          {product.badge && (
            <span className="bg-ink px-2.5 py-1 text-[10px] uppercase tracking-wide-luxe text-primary-foreground">
              {product.badge}
            </span>
          )}
          <h1 className="mt-4 font-display text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              {product.rating}
            </span>
            <span className="text-muted-foreground">{product.reviews} reviews</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            {product.salePrice ? (
              <>
                <span className="text-2xl font-medium">{formatPrice(product.salePrice)}</span>
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
                <span className="bg-accent px-2 py-0.5 text-[10px] uppercase tracking-wide-luxe text-accent-foreground">
                  Save {Math.round((1 - product.salePrice / product.price) * 100)}%
                </span>
              </>
            ) : (
              <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Color */}
          <div className="mt-7">
            <p className="text-[11px] uppercase tracking-wide-luxe">Color · {color}</p>
            <div className="mt-2.5 flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  style={{ background: c.hex }}
                  className={cn(
                    "h-8 w-8 rounded-full border transition-all",
                    color === c.name ? "ring-2 ring-foreground ring-offset-2" : "border-border",
                  )}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-wide-luxe">Size</p>
              <button className="text-[11px] uppercase tracking-wide-luxe text-muted-foreground underline">
                Size Guide
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "h-11 min-w-11 border px-3 text-sm transition-colors",
                    size === s ? "border-foreground bg-ink text-primary-foreground" : "border-border hover:border-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-11 w-11 place-items-center hover:bg-secondary" aria-label="Decrease">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="grid h-11 w-11 place-items-center hover:bg-secondary" aria-label="Increase">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => handleAdd(false)}
              className="flex-1 bg-ink py-3.5 text-[11px] uppercase tracking-wide-luxe text-primary-foreground transition-colors hover:bg-foreground/85"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                toggleWishlist(product.id);
                toast(wished ? "Removed from wishlist" : "Added to wishlist");
              }}
              aria-label="Wishlist"
              className="grid h-[50px] w-[50px] place-items-center border border-foreground hover:bg-secondary"
            >
              <Heart className={cn("h-5 w-5", wished && "fill-ink")} />
            </button>
          </div>
          <button
            onClick={() => handleAdd(true)}
            className="mt-3 w-full border border-foreground py-3.5 text-[11px] uppercase tracking-wide-luxe transition-colors hover:bg-secondary"
          >
            Buy Now
          </button>

          {product.stock < 15 && (
            <p className="mt-4 text-xs text-destructive">
              Only {product.stock} left in stock — order soon.
            </p>
          )}

          {/* Trust */}
          <div className="mt-7 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-3">
            <Trust icon={Truck} label="Free shipping over $150" />
            <Trust icon={RotateCcw} label="30-day easy returns" />
            <Trust icon={ShieldCheck} label="Secure checkout" />
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-border bg-cream py-16">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          <h2 className="mb-8 font-display text-3xl">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {fallbackRelated.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Trust({ icon: Icon, label }: { icon: typeof Truck; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Icon className="h-4 w-4 stroke-1 text-foreground" />
      {label}
    </div>
  );
}