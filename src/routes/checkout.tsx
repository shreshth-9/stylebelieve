import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useShop, cartSubtotal, COUPONS } from "@/store/useShop";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — STYLE BELIEVE" },
      { name: "description", content: "Secure checkout at STYLE BELIEVE." },
    ],
  }),
  component: Checkout,
});

const steps = ["Information", "Shipping", "Payment", "Review"];

function Checkout() {
  const { cart, coupon, clearCart } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);

  const subtotal = cartSubtotal(cart);
  const discount = coupon ? subtotal * COUPONS[coupon] : 0;
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 9;
  const total = subtotal - discount + shipping;

  const placeOrder = () => {
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="grid min-h-screen place-items-center px-5 pt-16 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink text-primary-foreground">
            <Check className="h-7 w-7" />
          </span>
          <h1 className="mt-6 font-display text-4xl">Order Confirmed</h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Thank you for believing in style. A confirmation and tracking link are on their way to
            your inbox.
          </p>
          <Link to="/shop" className="mt-8 inline-block bg-ink px-9 py-4 text-[11px] uppercase tracking-wide-luxe text-primary-foreground">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="grid min-h-screen place-items-center px-5 pt-16 text-center">
        <div>
          <p className="font-serif text-3xl italic text-muted-foreground">Your bag is empty</p>
          <Link to="/shop" className="mt-5 inline-block bg-ink px-9 py-4 text-[11px] uppercase tracking-wide-luxe text-primary-foreground">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-20 pt-24 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {/* Stepper */}
          <div className="mb-10 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs ${
                    i <= step ? "bg-ink text-primary-foreground" : "border border-border text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className={`hidden text-[11px] uppercase tracking-wide-luxe sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
                  {s}
                </span>
                {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <Section title="Customer Information">
                  <Input placeholder="Email address" type="email" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="First name" />
                    <Input placeholder="Last name" />
                  </div>
                  <Input placeholder="Phone number" />
                </Section>
              )}
              {step === 1 && (
                <Section title="Shipping Address">
                  <Input placeholder="Street address" />
                  <Input placeholder="Apartment, suite (optional)" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="City" />
                    <Input placeholder="Postal code" />
                  </div>
                  <Input placeholder="Country" />
                </Section>
              )}
              {step === 2 && (
                <Section title="Payment Method">
                  <div className="flex items-center gap-2 rounded-sm border border-border bg-secondary px-4 py-3 text-xs text-muted-foreground">
                    <Lock className="h-4 w-4" /> Payments are encrypted and secure.
                  </div>
                  <Input placeholder="Card number" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="MM / YY" />
                    <Input placeholder="CVC" />
                  </div>
                  <Input placeholder="Name on card" />
                </Section>
              )}
              {step === 3 && (
                <Section title="Review Your Order">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-border py-3">
                      <img src={item.product.image} alt={item.product.name} className="h-16 w-12 object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.color} · {item.size} · Qty {item.quantity}</p>
                      </div>
                      <span className="text-sm">{formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}</span>
                    </div>
                  ))}
                </Section>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-[11px] uppercase tracking-wide-luxe hover:opacity-60">
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <button onClick={() => navigate({ to: "/shop" })} className="text-[11px] uppercase tracking-wide-luxe hover:opacity-60">
                Continue Shopping
              </button>
            )}
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="bg-ink px-9 py-3.5 text-[11px] uppercase tracking-wide-luxe text-primary-foreground hover:bg-foreground/85">
                Continue
              </button>
            ) : (
              <button onClick={() => { placeOrder(); toast.success("Order placed"); }} className="bg-ink px-9 py-3.5 text-[11px] uppercase tracking-wide-luxe text-primary-foreground hover:bg-foreground/85">
                Place Order
              </button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="h-fit border border-border bg-cream p-6 lg:sticky lg:top-24">
          <p className="text-[11px] uppercase tracking-wide-luxe">Order Summary</p>
          <div className="mt-4 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.product.image} alt={item.product.name} className="h-16 w-12 object-cover" />
                <div className="flex-1">
                  <p className="text-xs font-medium">{item.product.name}</p>
                  <p className="text-[11px] text-muted-foreground">{item.size} · {item.quantity}</p>
                </div>
                <span className="text-xs">{formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-1.5 border-t border-border pt-4 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            {discount > 0 && <Row label={`Discount (${coupon})`} value={`-${formatPrice(discount)}`} />}
            <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
            <div className="flex justify-between border-t border-border pt-2 text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 font-display text-2xl">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
    />
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