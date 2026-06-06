import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import campaign from "@/assets/campaign.jpg";

export function Campaign() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative h-[90vh] overflow-hidden bg-ink">
      <motion.img
        src={campaign}
        alt="STYLE BELIEVE editorial campaign"
        width={1600}
        height={1000}
        loading="lazy"
        style={{ y, scale: 1.2 }}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />
      <div className="relative z-10 flex h-full items-center px-5 lg:px-20">
        <div className="max-w-xl text-primary-foreground">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[11px] uppercase tracking-luxe text-primary-foreground/70"
          >
            The Campaign
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl"
          >
            Confidence, <span className="font-serif italic">tailored.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 max-w-md text-base text-primary-foreground/80"
          >
            An ode to modern minimalism. Pieces designed to move between the boardroom and the
            boulevard — without ever changing who you are.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link
              to="/shop"
              className="mt-8 inline-block bg-cream px-9 py-4 text-[11px] uppercase tracking-wide-luxe text-ink transition-transform hover:scale-[1.03]"
            >
              Discover the Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}