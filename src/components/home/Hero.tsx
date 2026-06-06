import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-ink">
      <motion.img
        src={hero}
        alt="STYLE BELIEVE campaign — model in neutral designer streetwear"
        width={1280}
        height={1600}
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center text-primary-foreground"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[11px] uppercase tracking-luxe text-primary-foreground/80"
        >
          Autumn / Winter Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-[14vw] font-extralight leading-[0.9] tracking-tight md:text-[9vw] lg:text-[8rem]"
        >
          STYLE BELIEVE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-3 font-serif text-xl italic text-primary-foreground/90 md:text-2xl"
        >
          Fashion that speaks before you do.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/shop"
            search={{ sort: "newest" }}
            className="bg-cream px-9 py-4 text-[11px] uppercase tracking-wide-luxe text-ink transition-transform hover:scale-[1.03]"
          >
            Shop New Arrivals
          </Link>
          <Link
            to="/shop"
            className="glass-dark px-9 py-4 text-[11px] uppercase tracking-wide-luxe text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Explore Collections
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-primary-foreground/70"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.div>
    </section>
  );
}