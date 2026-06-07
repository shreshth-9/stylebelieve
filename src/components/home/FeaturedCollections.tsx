import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import men from "@/assets/category-men.jpg";
import women from "@/assets/category-women.jpg";

const collections = [
  { title: "Men", subtitle: "Tailored & Street", image: men, search: { gender: "Men" } },
  { title: "Women", subtitle: "Effortless Elegance", image: women, search: { gender: "Women" } },
];

export function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-28">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Curated</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Featured Collections</h2>
        </div>
        <Link
          to="/shop"
          className="hidden text-[11px] uppercase tracking-wide-luxe hover:opacity-60 sm:block"
        >
          View All →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {collections.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/shop"
              search={c.search}
              className="group relative block aspect-[3/4] overflow-hidden"
            >
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-primary-foreground">
                <p className="text-[10px] uppercase tracking-wide-luxe text-primary-foreground/70">
                  {c.subtitle}
                </p>
                <h3 className="mt-1 font-display text-3xl">{c.title}</h3>
                <span className="mt-3 inline-block overflow-hidden">
                  <span className="inline-block translate-y-6 text-[11px] uppercase tracking-wide-luxe transition-transform duration-500 group-hover:translate-y-0">
                    Shop Now →
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}