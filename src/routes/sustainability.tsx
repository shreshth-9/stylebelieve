import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/layout/InfoPage";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability — STYLE BELIEVE" },
      { name: "description", content: "Our commitment to responsible, considered fashion." },
    ],
  }),
  component: () => (
    <InfoPage
      eyebrow="Company"
      title="Sustainability"
      intro="Style that lasts. Fewer, better pieces — made responsibly."
      sections={[
        {
          heading: "Considered Materials",
          body: ["We prioritise organic cotton, recycled fibres and responsibly sourced wool, traceable back to the mill."],
        },
        {
          heading: "Ethical Production",
          body: ["Every partner factory is audited for fair wages and safe working conditions. We build long-term relationships, not one-off orders."],
        },
        {
          heading: "Built To Last",
          body: ["Our design philosophy is anti-disposable. We engineer garments to outlast trends and offer repairs to keep them in rotation longer."],
        },
      ]}
    />
  ),
});