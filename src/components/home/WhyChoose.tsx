import { motion } from "framer-motion";
import { Sparkles, TrendingUp, ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Premium Quality Fabrics", desc: "Sourced and finished to last for years, not seasons." },
  { icon: TrendingUp, title: "Latest Fashion Trends", desc: "New drops every week, curated by our style team." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "Encrypted checkout powered by industry-leading security." },
  { icon: Truck, title: "Fast Shipping", desc: "Express delivery worldwide. Free over $150." },
  { icon: RotateCcw, title: "Easy Returns", desc: "Changed your mind? 30-day hassle-free returns." },
  { icon: Headphones, title: "24/7 Customer Support", desc: "Real people, ready to help whenever you need." },
];

export function WhyChoose() {
  return (
    <section className="border-y border-border bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">The Difference</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Why Choose STYLE BELIEVE</h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group bg-background p-8 transition-colors duration-500 hover:bg-cream"
            >
              <div className="grid h-12 w-12 place-items-center border border-border bg-secondary transition-colors duration-500 group-hover:border-foreground group-hover:bg-ink">
                <f.icon className="h-6 w-6 stroke-1 text-foreground transition-colors duration-500 group-hover:text-primary-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}