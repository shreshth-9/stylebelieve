import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";

type ShopLink = { label: string; search: { gender?: string; category?: string; sort?: string } };
type PageLink = {
  label: string;
  to:
    | "/about"
    | "/contact"
    | "/shipping"
    | "/returns"
    | "/size-guide"
    | "/track-order"
    | "/faq"
    | "/sustainability"
    | "/careers"
    | "/press";
};
type FooterLink = ShopLink | PageLink;

const cols: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Men", search: { gender: "Men" } },
      { label: "Women", search: { gender: "Women" } },
      { label: "Accessories", search: { category: "Accessories" } },
      { label: "New Arrivals", search: { sort: "newest" } },
      { label: "Sale", search: { sort: "price-asc" } },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", to: "/shipping" },
      { label: "Returns", to: "/returns" },
      { label: "Size Guide", to: "/size-guide" },
      { label: "Track Order", to: "/track-order" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Sustainability", to: "/sustainability" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
      { label: "Contact", to: "/contact" },
    ],
  },
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
                    <li key={l.label}>
                      {"search" in l ? (
                        <Link
                          to="/shop"
                          search={l.search}
                          className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <Link
                          to={l.to}
                          className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                        >
                          {l.label}
                        </Link>
                      )}
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