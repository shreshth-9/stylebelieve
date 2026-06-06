import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/layout/InfoPage";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — STYLE BELIEVE" },
      { name: "description", content: "Join the STYLE BELIEVE team and help shape the future of fashion." },
    ],
  }),
  component: () => (
    <InfoPage
      eyebrow="Company"
      title="Careers"
      intro="We're a small team with big ambitions. Come build something with us."
      sections={[
        {
          heading: "Open Roles",
          body: [
            "Senior Apparel Designer — Remote / Studio",
            "E-Commerce Producer — Studio",
            "Customer Experience Lead — Remote",
          ],
        },
        {
          heading: "How We Work",
          body: ["Flat structure, high ownership and a deep respect for craft. We move fast but never at the cost of quality."],
        },
        {
          heading: "Apply",
          body: ["Don't see your role? Reach out via our Contact page — we love meeting talented people."],
        },
      ]}
    />
  ),
});