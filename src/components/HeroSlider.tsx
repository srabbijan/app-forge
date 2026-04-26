import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
// import heroApp from "@/assets/hero-app.jpg";
// import heroGrowth from "@/assets/hero-growth.jpg";
// import heroBrand from "@/assets/hero-brand.jpg";

import heroApp from "/online-shop-top-banner.webp";
import heroGrowth from "/app-store4.webp";
import heroBrand from "/app-forge-banner.png";
const slides = [
  {
    image: heroApp,
    title: "Premium app previews",
    subtitle: "Show off your shop in pixel-perfect detail",
  },
  {
    image: heroGrowth,
    title: "Built for growth",
    subtitle: "Real-time analytics & sales dashboards",
  },
  {
    image: heroBrand,
    title: "Your brand, everywhere",
    subtitle: "Fully white-labeled — colors, logo, identity",
  },
];

export const HeroSlider = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((p) => (p + 1) % slides.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-lg">
      <div className="relative aspect-[1920/560] w-full">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-smooth",
              i === active ? "opacity-100 scale-100" : "opacity-0 scale-105",
            )}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="aspect-[1920/560] object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              width={1280}
              height={896}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() =>
          setActive((p) => (p - 1 + slides.length) % slides.length)
        }
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur-md transition-base hover:bg-card hover:scale-110"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => setActive((p) => (p + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur-md transition-base hover:bg-card hover:scale-110"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-smooth",
              i === active
                ? "w-8 bg-primary"
                : "w-1.5 bg-foreground/30 hover:bg-foreground/50",
            )}
          />
        ))}
      </div>
    </div>
  );
};
