import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";

const cols = [
  { title: "Shop", links: ["Men", "Women", "Accessories", "New Arrivals", "Sale"] },
  { title: "Help", links: ["Shipping", "Returns", "Size Guide", "Track Order", "FAQ"] },
  { title: "Company", links: ["About", "Sustainability", "Careers", "Press", "Contact"] },
];

export function Footer() {
  return (
    <footer className="bg-ink text-primary-foreground">
      <div className="mx-auto max-w-[1500px] px-5 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="font-display text-2xl tracking-luxe">STYLE BELIEVE</p>
            <p className="mt-4 max-w-sm font-serif text-lg italic text-primary-foreground/70">
              Wear Confidence. Believe in Style.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex max-w-sm border-b border-primary-foreground/30 pb-2"
            >
              <input
                type="email"
                required
                placeholder="Email for early access"
                className="w-full bg-transparent text-sm outline-none placeholder:text-primary-foreground/40"
              />
              <button className="text-xs uppercase tracking-wide-luxe hover:opacity-60">Join</button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] uppercase tracking-wide-luxe text-primary-foreground/50">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        to="/shop"
                        className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-8 sm:flex-row">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} STYLE BELIEVE. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="text-primary-foreground/70 hover:text-primary-foreground">
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a href="#" aria-label="Pinterest" className="text-xs uppercase tracking-wide-luxe text-primary-foreground/70 hover:text-primary-foreground">
              Pinterest
            </a>
            <a href="#" aria-label="TikTok" className="text-xs uppercase tracking-wide-luxe text-primary-foreground/70 hover:text-primary-foreground">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}