import { Link } from "@tanstack/react-router";

interface InfoSection {
  heading: string;
  body: string[];
}

interface InfoPageProps {
  eyebrow: string;
  title: string;
  intro?: string;
  sections: InfoSection[];
}

export function InfoPage({ eyebrow, title, intro, sections }: InfoPageProps) {
  return (
    <div className="pt-16">
      <div className="border-b border-border bg-cream px-5 py-16 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">{eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-16 lg:px-10">
        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl">{s.heading}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            to="/contact"
            className="text-[11px] uppercase tracking-wide-luxe underline hover:opacity-60"
          >
            Still need help? Contact us →
          </Link>
        </div>
      </div>
    </div>
  );
}