import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/layout/InfoPage";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — STYLE BELIEVE" },
      { name: "description", content: "Answers to the most common questions about STYLE BELIEVE." },
    ],
  }),
  component: () => (
    <InfoPage
      eyebrow="Help"
      title="Frequently Asked"
      intro="Everything you need to know, in one place."
      sections={[
        {
          heading: "What payment methods do you accept?",
          body: ["All major cards, Apple Pay, Google Pay and Shop Pay. Checkout is fully encrypted."],
        },
        {
          heading: "Can I change or cancel my order?",
          body: ["Contact us within one hour of ordering and we'll do our best to amend it before it ships."],
        },
        {
          heading: "Are your materials sustainable?",
          body: ["Wherever possible, yes — read more on our Sustainability page about our fabrics and partners."],
        },
        {
          heading: "How do I track my order?",
          body: ["Head to the Track Order page and enter your order number to see live status."],
        },
      ]}
    />
  ),
});