import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";
import { useShop, cartSubtotal, COUPONS } from "@/store/useShop";
import { formatPrice, products } from "@/data/products";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    coupon,
    applyCoupon,
  } = useShop();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const subtotal = cartSubtotal(cart);
  const discount = coupon ? subtotal * COUPONS[coupon] : 0;
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 9;
  const total = subtotal - discount + shipping;
  const suggestions = products.filter((p) => !cart.some((c) => c.product.id === p.id)).slice(0, 3);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-foreground/40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-background"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <p className="text-[12px] uppercase tracking-wide-luxe">
                Your Bag ({cart.length})
              </p>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                <X className="h-5 w-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-serif text-2xl italic text-muted-foreground">Your bag is empty</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="bg-ink px-8 py-3 text-[11px] uppercase tracking-wide-luxe text-primary-foreground"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {cart.map((item) => {
                    const price = item.product.salePrice ?? item.product.price;
                    return (
                      <div key={item.id} className="flex gap-4 border-b border-border py-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-28 w-20 object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">{item.product.name}</p>
                            <button onClick={() => removeFromCart(item.id)} aria-label="Remove">
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.color} · {item.size}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-border">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="grid h-8 w-8 place-items-center hover:bg-secondary"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="grid h-8 w-8 place-items-center hover:bg-secondary"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-medium">
                              {formatPrice(price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {suggestions.length > 0 && (
                    <div className="pt-6">
                      <p className="text-[11px] uppercase tracking-wide-luxe text-muted-foreground">
                        You may also like
                      </p>
                      <div className="mt-3 flex gap-3 overflow-x-auto hide-scrollbar">
                        {suggestions.map((p) => (
                          <Link
                            key={p.id}
                            to="/product/$id"
                            params={{ id: p.id }}
                            onClick={() => setCartOpen(false)}
                            className="w-24 shrink-0"
                          >
                            <img src={p.image} alt={p.name} className="h-28 w-24 object-cover" />
                            <p className="mt-1 truncate text-[11px]">{p.name}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-border px-6 py-5">
                  <div className="flex items-center gap-2 border border-border px-3 py-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Coupon code (try BELIEVE10)"
                      className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                    />
                    <button
                      onClick={() => {
                        if (applyCoupon(code)) toast.success("Coupon applied");
                        else toast.error("Invalid coupon");
                      }}
                      className="text-[11px] uppercase tracking-wide-luxe hover:opacity-60"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="mt-4 space-y-1.5 text-sm">
                    <Row label="Subtotal" value={formatPrice(subtotal)} />
                    {discount > 0 && (
                      <Row label={`Discount (${coupon})`} value={`-${formatPrice(discount)}`} />
                    )}
                    <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
                    <div className="flex justify-between border-t border-border pt-2 text-base font-medium">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate({ to: "/checkout" });
                    }}
                    className="mt-4 w-full bg-ink py-3.5 text-[11px] uppercase tracking-wide-luxe text-primary-foreground transition-colors hover:bg-foreground/85"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}