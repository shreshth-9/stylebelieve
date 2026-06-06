import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MessageCircle, Instagram, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — STYLE BELIEVE" },
      { name: "description", content: "Get in touch with STYLE BELIEVE. Email, WhatsApp, and social support — we're here 24/7." },
      { property: "og:title", content: "Contact — STYLE BELIEVE" },
      { property: "og:description", content: "We're here to help, 24/7." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    toast.success("Message sent — we'll be in touch shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-16">
      <div className="border-b border-border bg-cream px-5 py-12 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Get in touch</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Contact Us</h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Questions about sizing, an order, or a collaboration? Our team is here around the clock.
          </p>
          <div className="mt-8 space-y-5">
            <Item icon={Mail} label="Email" value="support@stylebelieve.com" href="mailto:support@stylebelieve.com" />
            <Item icon={MessageCircle} label="WhatsApp" value="+1 (555) 012-3456" href="https://wa.me/15550123456" />
            <Item icon={Instagram} label="Instagram" value="@stylebelieve" href="#" />
            <Item icon={MapPin} label="Flagship Store" value="120 Mercer Street, New York, NY" />
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Field label="Name">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
            />
          </Field>
          <Field label="Message">
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              rows={5}
              className="w-full resize-none border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
            />
          </Field>
          <button className="w-full bg-ink py-3.5 text-[11px] uppercase tracking-wide-luxe text-primary-foreground transition-colors hover:bg-foreground/85">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

function Item({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-4">
      <span className="grid h-11 w-11 place-items-center border border-border">
        <Icon className="h-5 w-5 stroke-1" />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wide-luxe text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-70">
      {content}
    </a>
  ) : (
    content
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-wide-luxe">{label}</span>
      {children}
    </label>
  );
}