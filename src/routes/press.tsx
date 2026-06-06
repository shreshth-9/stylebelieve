import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/layout/InfoPage";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press — STYLE BELIEVE" },
      { name: "description", content: "Press enquiries, brand assets and media coverage for STYLE BELIEVE." },
    ],
  }),
  component: () => (
    <InfoPage
      eyebrow="Company"
      title="Press"
      intro="For interviews, features and brand assets, we'd love to hear from you."
      sections={[
        {
          heading: "Media Enquiries",
          body: ["Email press@stylebelieve.com and our team will respond within two business days."],
        },
        {
          heading: "Brand Assets",
          body: ["Logos, lookbooks and campaign imagery are available on request for accredited media."],
        },
        {
          heading: "Recent Coverage",
          body: ["Featured in Vogue, Hypebeast and GQ as one of the defining new names in modern essentials."],
        },
      ]}
    />
  ),
});