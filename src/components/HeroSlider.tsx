import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import heroApp from "@/assets/hero-app.jpg";
import heroGrowth from "@/assets/hero-growth.jpg";
import heroBrand from "@/assets/hero-brand.jpg";

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
    const id = setInterval(() => setActive((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-lg">
      <div className="relative aspect-[16/9] w-full">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-smooth",
              i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
            )}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              width={1280}
              height={896}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </p>
              <h3 className="text-2xl font-bold sm:text-3xl">{slide.title}</h3>
              <p className="mt-1 max-w-md text-sm text-muted-foreground sm:text-base">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() => setActive((p) => (p - 1 + slides.length) % slides.length)}
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
      <div className="absolute bottom-6 right-6 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-smooth",
              i === active ? "w-8 bg-primary" : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};
