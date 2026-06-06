import { useEffect, useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useShop, cartCount } from "@/store/useShop";
import { cn } from "@/lib/utils";

const MENS = ["T-Shirts", "Shirts", "Hoodies", "Jackets", "Jeans"];
const WOMENS = ["Dresses", "Tops", "Hoodies", "Jackets", "Activewear"];
const ACCESSORIES = ["Bags", "Caps", "Sunglasses", "Watches"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const cart = useShop((s) => s.cart);
  const wishlist = useShop((s) => s.wishlist);
  const setCartOpen = useShop((s) => s.setCartOpen);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  const transparent = onHome && !scrolled && !mega;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
    setMega(null);
  }, [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate({ to: "/shop", search: { q: query } });
  };

  const linkColor = transparent ? "text-primary-foreground" : "text-foreground";

  const megaData: Record<string, string[]> = {
    Men: MENS,
    Women: WOMENS,
    Accessories: ACCESSORIES,
  };

  return (
    <header
      onMouseLeave={() => setMega(null)}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        transparent ? "bg-transparent" : "glass border-b border-border",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 lg:px-10">
        <div className="flex items-center gap-8">
          <button
            className={cn("lg:hidden", linkColor)}
            onClick={() => setMobile(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <nav className="hidden items-center gap-7 lg:flex">
            {Object.keys(megaData).map((m) => (
              <button
                key={m}
                onMouseEnter={() => setMega(m)}
                className={cn(
                  "text-[12px] uppercase tracking-wide-luxe transition-colors hover:opacity-60",
                  linkColor,
                )}
              >
                {m}
              </button>
            ))}
            <Link
              to="/shop"
              className={cn("text-[12px] uppercase tracking-wide-luxe hover:opacity-60", linkColor)}
            >
              Shop All
            </Link>
          </nav>
        </div>

        <Link
          to="/"
          className={cn(
            "absolute left-1/2 -translate-x-1/2 font-display text-lg font-medium tracking-luxe lg:text-xl",
            linkColor,
          )}
        >
          STYLE BELIEVE
        </Link>

        <div className={cn("flex items-center gap-4", linkColor)}>
          <button onClick={() => setSearchOpen(true)} aria-label="Search" className="hover:opacity-60">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link to="/account" aria-label="Wishlist" className="relative hidden hover:opacity-60 sm:block">
            <Heart className="h-[18px] w-[18px]" />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-accent text-[9px] text-accent-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative hover:opacity-60">
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cartCount(cart) > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-ink text-[9px] text-primary-foreground">
                {cartCount(cart)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {mega && megaData[mega] && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="hidden border-t border-border bg-background lg:block"
          >
            <div className="mx-auto grid max-w-[1500px] grid-cols-4 gap-8 px-10 py-10">
              <div className="col-span-1">
                <p className="font-serif text-2xl italic text-muted-foreground">{mega}</p>
                <p className="mt-2 text-sm text-muted-foreground">Explore the {mega.toLowerCase()} collection</p>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-3">
                {megaData[mega].map((c) => (
                  <Link
                    key={c}
                    to="/shop"
                    search={{ category: c }}
                    className="text-sm text-foreground transition-colors hover:text-accent-foreground hover:underline"
                  >
                    {c}
                  </Link>
                ))}
              </div>
              <Link
                to="/shop"
                search={{ sort: "newest" }}
                className="col-span-1 flex items-end bg-secondary p-6 text-sm uppercase tracking-wide-luxe transition-colors hover:bg-sand"
              >
                New Arrivals →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
          >
            <div className="mx-auto max-w-2xl px-5 pt-32">
              <div className="flex items-center justify-between">
                <p className="text-[12px] uppercase tracking-wide-luxe text-muted-foreground">Search</p>
                <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={submitSearch} className="mt-6 border-b border-foreground pb-4">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-muted-foreground"
                />
              </form>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Hoodies", "Dresses", "Jackets", "Jeans"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      navigate({ to: "/shop", search: { category: t } });
                      setSearchOpen(false);
                    }}
                    className="border border-border px-3 py-1.5 text-xs uppercase tracking-wide-luxe hover:bg-secondary"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobile(false)}
              className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 w-[82%] max-w-sm bg-background p-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display tracking-luxe">STYLE BELIEVE</span>
                <button onClick={() => setMobile(false)} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-8 space-y-6">
                {Object.entries(megaData).map(([group, items]) => (
                  <div key={group}>
                    <p className="font-serif text-xl italic">{group}</p>
                    <div className="mt-2 flex flex-col gap-1.5 pl-1">
                      {items.map((c) => (
                        <Link
                          key={c}
                          to="/shop"
                          search={{ category: c }}
                          className="text-sm text-muted-foreground"
                        >
                          {c}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm uppercase tracking-wide-luxe">
                  <Link to="/shop">Shop All</Link>
                  <Link to="/about">About</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/account">Account</Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}