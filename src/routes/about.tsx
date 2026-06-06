import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import campaign from "@/assets/campaign.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — STYLE BELIEVE" },
      { name: "description", content: "STYLE BELIEVE was created for people who express themselves through fashion. Discover our mission, vision and philosophy." },
      { property: "og:title", content: "About — STYLE BELIEVE" },
      { property: "og:description", content: "Clothing is more than fabric — it is confidence, identity, and self-expression." },
      { property: "og:image", content: campaign },
    ],
  }),
  component: About,
});

const values = [
  { title: "Mission", body: "To craft fashion that empowers everyone to express their truest self — confidently, unapologetically." },
  { title: "Vision", body: "A world where what you wear is an extension of who you are, not a uniform you conform to." },
  { title: "Values", body: "Quality without compromise, design with intention, and a relentless commitment to those who wear us." },
  { title: "Philosophy", body: "Less, but better. Timeless silhouettes, considered materials, and details that reveal themselves over time." },
];

function About() {
  return (
    <div className="pt-16">
      <section className="relative h-[70vh] overflow-hidden bg-ink">
        <img src={campaign} alt="STYLE BELIEVE editorial" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center text-primary-foreground">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-[11px] uppercase tracking-luxe text-primary-foreground/70">
            Our Story
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="mt-3 max-w-3xl font-display text-5xl md:text-7xl">
            We believe in style
          </motion.h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="font-serif text-2xl italic leading-relaxed text-foreground md:text-3xl">
          “STYLE BELIEVE was created for people who express themselves through fashion. We believe
          clothing is more than fabric — it is confidence, identity, and self-expression.”
        </p>
      </section>

      <section className="border-y border-border bg-secondary py-20">
        <div className="mx-auto grid max-w-[1500px] gap-px overflow-hidden border border-border bg-border px-0 sm:grid-cols-2 lg:px-10">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="bg-background p-10"
            >
              <p className="font-serif text-3xl italic text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-20 text-center lg:px-10">
        <h2 className="font-display text-4xl">Ready to believe?</h2>
        <Link to="/shop" className="mt-6 inline-block bg-ink px-9 py-4 text-[11px] uppercase tracking-wide-luxe text-primary-foreground transition-transform hover:scale-[1.03]">
          Shop the Collection
        </Link>
      </section>
    </div>
  );
}