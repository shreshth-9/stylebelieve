const items = [
  "Free Shipping Over $150",
  "Premium Fabrics",
  "Easy 30-Day Returns",
  "Limited Edition Drops",
  "Secure Checkout",
  "Crafted to Last",
];

export function Marquee() {
  return (
    <div className="border-y border-border bg-ink py-3.5 text-primary-foreground">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center px-8 text-[11px] uppercase tracking-luxe">
            {t}
            <span className="ml-8 text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}