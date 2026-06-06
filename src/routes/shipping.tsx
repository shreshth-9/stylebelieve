import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/layout/InfoPage";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping — STYLE BELIEVE" },
      { name: "description", content: "Shipping options, delivery times and costs for STYLE BELIEVE orders." },
    ],
  }),
  component: () => (
    <InfoPage
      eyebrow="Help"
      title="Shipping"
      intro="Fast, tracked delivery on every STYLE BELIEVE order — wherever you are."
      sections={[
        {
          heading: "Delivery Options",
          body: [
            "Standard (3–5 business days) — free on orders over $150, otherwise $8.",
            "Express (1–2 business days) — $18 flat rate.",
            "Same-day delivery is available in select metro areas at checkout.",
          ],
        },
        {
          heading: "Processing Time",
          body: [
            "Orders placed before 1pm local time ship the same business day. Orders placed on weekends or holidays ship the next business day.",
          ],
        },
        {
          heading: "International",
          body: [
            "We ship to over 60 countries. Duties and taxes are calculated at checkout so there are no surprises on delivery.",
          ],
        },
      ]}
    />
  ),
});