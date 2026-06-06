import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PackageCheck, Truck, Home, ClipboardCheck } from "lucide-react";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track Order — STYLE BELIEVE" },
      { name: "description", content: "Track the status of your STYLE BELIEVE order in real time." },
    ],
  }),
  component: TrackOrder,
});

const steps = [
  { icon: ClipboardCheck, label: "Order Confirmed", note: "We've received your order" },
  { icon: PackageCheck, label: "Packed", note: "Your items are on their way to the carrier" },
  { icon: Truck, label: "Out for Delivery", note: "Your parcel is on the road" },
  { icon: Home, label: "Delivered", note: "Enjoy your STYLE BELIEVE pieces" },
];

function TrackOrder() {
  const [order, setOrder] = useState("");
  const [tracked, setTracked] = useState<string | null>(null);
  const activeStep = 2;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (order.trim()) setTracked(order.trim().toUpperCase());
  };

  return (
    <div className="pt-16">
      <div className="border-b border-border bg-cream px-5 py-16 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Help</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Track Your Order</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Enter your order number (found in your confirmation email) to see live delivery status.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 py-16 lg:px-10">
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
          <input
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="e.g. SB-10293"
            className="flex-1 border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
          />
          <button
            type="submit"
            className="bg-ink px-6 py-3 text-[11px] uppercase tracking-wide-luxe text-primary-foreground hover:opacity-90"
          >
            Track Order
          </button>
        </form>

        {tracked && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-12"
          >
            <div className="mb-8 flex items-baseline justify-between border-b border-border pb-4">
              <p className="text-sm text-muted-foreground">Order</p>
              <p className="font-display text-lg">{tracked}</p>
            </div>
            <ol className="space-y-6">
              {steps.map((s, i) => {
                const done = i <= activeStep;
                const Icon = s.icon;
                return (
                  <li key={s.label} className="flex items-start gap-4">
                    <span
                      className={
                        "grid h-10 w-10 shrink-0 place-items-center rounded-full border " +
                        (done
                          ? "border-foreground bg-ink text-primary-foreground"
                          : "border-border text-muted-foreground")
                      }
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="pt-1">
                      <p className={done ? "font-medium" : "text-muted-foreground"}>{s.label}</p>
                      <p className="text-sm text-muted-foreground">{s.note}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-10 text-sm text-muted-foreground">
              Estimated delivery: 1–2 business days. You'll receive an email the moment it's delivered.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}