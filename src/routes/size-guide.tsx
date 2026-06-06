import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/layout/InfoPage";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide — STYLE BELIEVE" },
      { name: "description", content: "Find your perfect fit with the STYLE BELIEVE size guide." },
    ],
  }),
  component: () => (
    <InfoPage
      eyebrow="Help"
      title="Size Guide"
      intro="Designed for a considered, contemporary fit. When in doubt, size down for a sharper line."
      sections={[
        {
          heading: "Tops & Outerwear",
          body: [
            "XS — Chest 34\" · S — 36–38\" · M — 39–41\" · L — 42–44\" · XL — 45–47\" · XXL — 48–50\".",
            "Our oversized styles are cut generously — take your usual size for the intended relaxed drape.",
          ],
        },
        {
          heading: "Bottoms",
          body: [
            "S — Waist 28–30\" · M — 31–33\" · L — 34–36\" · XL — 37–39\".",
            "Denim is rigid and will mould to the body over the first few wears.",
          ],
        },
        {
          heading: "How To Measure",
          body: [
            "Chest: measure around the fullest part, keeping the tape level.",
            "Waist: measure around your natural waistline, where you'd normally fasten a belt.",
          ],
        },
      ]}
    />
  ),
});