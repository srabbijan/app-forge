import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { PhonePreview } from "@/components/PhonePreview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ImagePlus, Loader2, Rocket, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const COLOR_PRESETS = [
  { name: "Indigo", hsl: "250 84% 60%" },
  { name: "Violet", hsl: "265 89% 65%" },
  { name: "Pink", hsl: "330 85% 60%" },
  { name: "Coral", hsl: "10 85% 62%" },
  { name: "Amber", hsl: "32 95% 55%" },
  { name: "Emerald", hsl: "152 70% 45%" },
  { name: "Teal", hsl: "180 70% 42%" },
  { name: "Sky", hsl: "205 90% 55%" },
];

const hexToHsl = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

const Builder = () => {
  const navigate = useNavigate();
  const [shopId, setShopId] = useState("");
  const [appName, setAppName] = useState("My Shop");
  const [appIcon, setAppIcon] = useState<string | undefined>();
  const [color, setColor] = useState(COLOR_PRESETS[0].hsl);
  const [building, setBuilding] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = sessionStorage.getItem("shopId");
    if (!id) {
      navigate("/login");
      return;
    }
    setShopId(id);
  }, [navigate]);

  const handleIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return toast.error("Max icon size: 2MB");
    const reader = new FileReader();
    reader.onload = (ev) => setAppIcon(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleBuild = () => {
    if (!appName.trim()) return toast.error("Give your app a name");
    setBuilding(true);
    sessionStorage.setItem(
      "lastBuild",
      JSON.stringify({ shopId, appName, appIcon, color, builtAt: Date.now() })
    );
    setTimeout(() => navigate("/success"), 2200);
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-base hover:bg-secondary hover:text-foreground"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Logo />
            <span className="hidden h-5 w-px bg-border sm:block" />
            <span className="hidden text-sm text-muted-foreground sm:block">App builder</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-muted-foreground">Connected to</span>
            <span className="font-mono font-semibold">{shopId}</span>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="mb-8 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Sparkles className="h-3 w-3" /> Step 1 of 1
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Customize your app</h1>
          <p className="mt-2 text-muted-foreground">
            Tweak the inputs on the left — watch your app come to life on the right.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* FORM */}
          <div className="space-y-6">
            {/* Shop ID */}
            <Field label="Shop ID" hint="Auto-filled from your account">
              <input
                value={shopId}
                disabled
                className="h-12 w-full cursor-not-allowed rounded-xl border border-input bg-secondary/50 px-4 font-mono text-sm text-muted-foreground"
              />
            </Field>

            {/* App Name */}
            <Field label="App name" hint="This appears on the home screen">
              <input
                value={appName}
                onChange={(e) => setAppName(e.target.value.slice(0, 30))}
                placeholder="e.g. Sunset Boutique"
                className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none transition-base focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
              <div className="mt-1 text-right text-xs text-muted-foreground">{appName.length}/30</div>
            </Field>

            {/* Icon */}
            <Field label="App icon" hint="Square image, at least 512×512px">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleIcon} />
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-dashed border-border bg-secondary/40">
                  {appIcon ? (
                    <>
                      <img src={appIcon} alt="App icon" className="h-full w-full object-cover" />
                      <button
                        onClick={() => setAppIcon(undefined)}
                        className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-base hover:scale-110"
                        aria-label="Remove icon"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <ImagePlus className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <Button variant="outline" onClick={() => fileRef.current?.click()}>
                  <ImagePlus className="h-4 w-4" />
                  {appIcon ? "Change icon" : "Upload icon"}
                </Button>
              </div>
            </Field>

            {/* Color */}
            <Field label="Primary color" hint="The accent used across your app">
              <div className="flex flex-wrap items-center gap-2.5">
                {COLOR_PRESETS.map((preset) => {
                  const active = preset.hsl === color;
                  return (
                    <button
                      key={preset.name}
                      onClick={() => setColor(preset.hsl)}
                      title={preset.name}
                      className={cn(
                        "h-10 w-10 rounded-full border-2 transition-bounce hover:scale-110",
                        active ? "border-foreground ring-4 ring-foreground/10" : "border-transparent"
                      )}
                      style={{ background: `hsl(${preset.hsl})` }}
                      aria-label={preset.name}
                    />
                  );
                })}
                <label className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-border transition-base hover:border-foreground">
                  <input
                    type="color"
                    onChange={(e) => setColor(hexToHsl(e.target.value))}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    aria-label="Custom color"
                  />
                  <span className="text-xs">+</span>
                </label>
              </div>
            </Field>

            {/* Build CTA */}
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-card to-secondary/40 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Rocket className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Ready to ship?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We'll compile your iOS and Android builds in about 60 seconds.
                  </p>
                </div>
              </div>
              <Button
                onClick={handleBuild}
                variant="hero"
                size="xl"
                className="mt-5 w-full"
                disabled={building}
              >
                {building ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Your app is being built... 🚀
                  </>
                ) : (
                  <>
                    Build my app <Rocket className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-secondary/60 via-card to-accent/40 p-8 sm:p-12">
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1 text-xs font-medium backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Live preview
              </div>
              <div className="flex justify-center pt-4">
                <PhonePreview appName={appName} appIcon={appIcon} primaryColor={color} />
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Updates instantly as you customize ✨
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const Field = ({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-border/60 bg-card p-5 transition-base hover:border-border">
    <div className="mb-3 flex items-baseline justify-between gap-2">
      <label className="text-sm font-semibold">{label}</label>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
    {children}
  </div>
);

export default Builder;
