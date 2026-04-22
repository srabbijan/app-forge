import { ShoppingBag, Search, Heart, User, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhonePreviewProps {
  appName: string;
  appIcon?: string;
  primaryColor: string; // hsl string e.g. "250 84% 60%"
}

export const PhonePreview = ({ appName, appIcon, primaryColor }: PhonePreviewProps) => {
  const themeStyle = { ["--theme" as string]: primaryColor } as React.CSSProperties;

  return (
    <div className="relative" style={themeStyle}>
      {/* Glow behind phone */}
      <div
        className="absolute -inset-10 rounded-full opacity-60 blur-3xl animate-pulse-glow"
        style={{ background: `hsl(${primaryColor} / 0.35)` }}
      />

      {/* Phone frame */}
      <div className="relative mx-auto w-[280px] rounded-[3rem] border-[10px] border-foreground/90 bg-foreground/90 shadow-phone">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-foreground/90" />

        {/* Screen */}
        <div className="relative h-[560px] overflow-hidden rounded-[2.25rem] bg-background">
          {/* Top gradient header */}
          <div
            className="relative h-44 px-5 pt-10 transition-smooth"
            style={{
              background: `linear-gradient(135deg, hsl(${primaryColor}), hsl(${primaryColor} / 0.6))`,
            }}
          >
            <div className="flex items-center justify-between text-white/90">
              <div className="flex items-center gap-2.5">
                <div
                  key={appIcon}
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/20 backdrop-blur-md animate-scale-in"
                >
                  {appIcon ? (
                    <img src={appIcon} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <ShoppingBag className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider opacity-80">Welcome</p>
                  <p key={appName} className="truncate text-sm font-bold animate-fade-in">
                    {appName || "Your App"}
                  </p>
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <Search className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Search pill */}
            <div className="mt-4 flex h-10 items-center gap-2 rounded-full bg-white/95 px-4 shadow-md">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Search products...</span>
            </div>
          </div>

          {/* Categories */}
          <div className="px-5 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold">Categories</p>
              <span className="text-[10px]" style={{ color: `hsl(${primaryColor})` }}>
                See all
              </span>
            </div>
            <div className="flex gap-2">
              {["All", "New", "Hot", "Sale"].map((c, i) => (
                <div
                  key={c}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[10px] font-semibold transition-base",
                    i === 0 ? "text-white" : "bg-secondary text-foreground"
                  )}
                  style={i === 0 ? { background: `hsl(${primaryColor})` } : undefined}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-2.5 px-5 pt-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
                <div
                  className="aspect-square w-full"
                  style={{
                    background: `linear-gradient(135deg, hsl(${primaryColor} / 0.15), hsl(${primaryColor} / 0.4))`,
                  }}
                />
                <div className="p-2">
                  <div className="h-1.5 w-3/4 rounded bg-muted" />
                  <div className="mt-1.5 flex items-center justify-between">
                    <div
                      className="h-2 w-8 rounded font-bold"
                      style={{ background: `hsl(${primaryColor})` }}
                    />
                    <Heart className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-border/60 bg-card/95 px-4 py-3 backdrop-blur-xl">
            {[Home, Search, ShoppingBag, Heart, User].map((Icon, i) => (
              <Icon
                key={i}
                className="h-4 w-4"
                style={{ color: i === 0 ? `hsl(${primaryColor})` : "hsl(var(--muted-foreground))" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
