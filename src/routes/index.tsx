import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Trending } from "@/components/home/Trending";
import { Campaign } from "@/components/home/Campaign";
import { WhyChoose } from "@/components/home/WhyChoose";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STYLE BELIEVE — Wear Confidence. Believe in Style." },
      {
        name: "description",
        content:
          "Discover STYLE BELIEVE — premium fashion for the modern wardrobe. Shop new arrivals, trending edits, and curated collections for men and women.",
      },
      { property: "og:title", content: "STYLE BELIEVE — Premium Fashion" },
      {
        property: "og:description",
        content: "Fashion that speaks before you do. Shop new arrivals and curated collections.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCollections />
      <NewArrivals />
      <Trending />
      <Campaign />
      <WhyChoose />
    </>
  );
}
