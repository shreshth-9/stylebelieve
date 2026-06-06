import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/layout/InfoPage";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Exchanges — STYLE BELIEVE" },
      { name: "description", content: "Our 30-day returns and exchanges policy for STYLE BELIEVE." },
    ],
  }),
  component: () => (
    <InfoPage
      eyebrow="Help"
      title="Returns & Exchanges"
      intro="Not quite right? Return or exchange any item within 30 days — on us."
      sections={[
        {
          heading: "30-Day Window",
          body: [
            "You have 30 days from delivery to request a return or exchange. Items must be unworn, unwashed and with original tags attached.",
          ],
        },
        {
          heading: "How To Return",
          body: [
            "Visit your Account, open the order and select the items you'd like to return.",
            "Print the prepaid label and drop the parcel at any carrier point.",
            "Refunds are issued to your original payment method within 5–7 business days of us receiving the parcel.",
          ],
        },
        {
          heading: "Exchanges",
          body: [
            "Need a different size or colour? Choose 'Exchange' at return and we'll ship the replacement as soon as your return is scanned.",
          ],
        },
      ]}
    />
  ),
});