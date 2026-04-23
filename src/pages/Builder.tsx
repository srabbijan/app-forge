import { Logo } from "@/components/Logo";
import { PhonePreview } from "@/components/PhonePreview";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadSingleImage } from "@/lib/uploadSingleImage";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Mail,
  Rocket,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

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

const hslToHex = (hsl: string): string => {
  const [h, s, l] = hsl.split(" ").map((v) => parseFloat(v));
  const sl = s / 100;
  const ll = l / 100;
  const a = sl * Math.min(ll, 1 - ll);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

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

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email address" }),
  appName: z.string().min(1, { message: "Give your app a name" }).max(30),
});

type FormValues = z.infer<typeof formSchema>;

const Builder = () => {
  const navigate = useNavigate();
  const [shopId, setShopId] = useState("");
  const [appIcon, setAppIcon] = useState<string | undefined>();
  const [iconFile, setIconFile] = useState<File | undefined>();
  const [color, setColor] = useState(COLOR_PRESETS[0].hsl);
  const [building, setBuilding] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const store = JSON.parse(localStorage.getItem("common-store") ?? "{}");
  const shop_id = store?.state?.shopId;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      appName: "",
    },
  });

  const appName = form.watch("appName");

  useEffect(() => {
    if (!shop_id) {
      navigate("/login");
      return;
    }
    setShopId(shop_id);
  }, [navigate, shop_id]);

  const handleIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return toast.error("Max icon size: 2MB");
    setIconFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAppIcon(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: FormValues) => {
    setBuilding(true);
    try {
      // 1. Upload icon if provided
      let splashUrl: string | null = null;
      if (iconFile) {
        splashUrl = await uploadSingleImage(iconFile);
        if (!splashUrl) {
          toast.error("Icon upload failed, please try again");
          setBuilding(false);
          return;
        }
      }

      // 2. Sanitize app name for use in build scripts (alphanumeric + spaces only)
      const appNameSafe = values.appName.replace(/[^a-zA-Z0-9 ]/g, "").trim();

      // 3. Convert HSL → HEX for Android (e.g. "FF6200EE")
      const primaryColor = hslToHex(color);

      // 4. Trigger GitHub Actions workflow
      const owner = import.meta.env.VITE_GH_REPO_OWNER;
      const repo = import.meta.env.VITE_GH_REPO_NAME;
      const token = import.meta.env.VITE_GH_TOKEN;
      const branch = import.meta.env.VITE_GH_BRANCH ?? "master";

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/actions/workflows/android.yml/dispatches`,
        {
          method: "POST",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ref: branch,
            inputs: {
              mail: values.email,
              shopId,
              appName: appNameSafe,
              primaryColor,
              splashUrl: splashUrl ?? "",
            },
          }),
        },
      );

      if (response.status !== 204) {
        const text = await response.text();
        console.error("Workflow dispatch failed:", text);
        toast.error("Failed to trigger build, please try again");
        setBuilding(false);
        return;
      }

      // 5. Persist for success page
      sessionStorage.setItem("email", values.email);
      sessionStorage.setItem(
        "lastBuild",
        JSON.stringify({
          shopId,
          appName: appNameSafe,
          email: values.email,
          splashUrl,
          primaryColor,
          builtAt: Date.now(),
        }),
      );

      navigate("/success");
    } catch {
      toast.error("Something went wrong, please try again");
      setBuilding(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-base hover:bg-secondary hover:text-foreground"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Logo />
            <span className="hidden h-5 w-px bg-border sm:block" />
            <span className="hidden text-sm text-muted-foreground sm:block">
              App builder
            </span>
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
        </div>

        <Form {...form}>
          <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
              {/* FORM */}
              <div className="space-y-6">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FieldCard
                      label="Email"
                      hint="We'll send the download link here"
                    >
                      <FormItem>
                        <FormLabel className="sr-only">Email</FormLabel>
                        <FormControl>
                          <div className="group relative">
                            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-base group-focus-within:text-primary" />
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              className="h-12 rounded-xl pl-11 focus:ring-4 focus:ring-primary/15"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FieldCard>
                  )}
                />

                {/* App Name */}
                <FormField
                  control={form.control}
                  name="appName"
                  render={({ field }) => (
                    <FieldCard label="App name" hint="This appears on app icon">
                      <FormItem>
                        <FormLabel className="sr-only">App name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Sunset Boutique"
                            className="h-12 rounded-xl px-3 focus:ring-4 focus:ring-primary/15"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value.slice(0, 30))
                            }
                          />
                        </FormControl>
                        <div className="text-right text-xs text-muted-foreground">
                          {field.value.length}/30
                        </div>
                        <FormMessage />
                      </FormItem>
                    </FieldCard>
                  )}
                />

                {/* Icon */}
                <FieldCard
                  label="App icon"
                  hint="Square image, at least 512×512px"
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleIcon}
                  />
                  <div className="flex items-center gap-4">
                    {/* Preview thumbnail */}
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary/40">
                      {appIcon ? (
                        <>
                          <img
                            src={appIcon}
                            alt="App icon preview"
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setAppIcon(undefined);
                              setIconFile(undefined);
                            }}
                            className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-base hover:scale-110"
                            aria-label="Remove icon"
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <ImagePlus className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileRef.current?.click()}
                    >
                      <ImagePlus className="h-4 w-4" />
                      {appIcon ? "Change icon" : "Upload icon"}
                    </Button>
                  </div>
                </FieldCard>

                {/* Color */}
                <FieldCard
                  label="Primary color"
                  hint="The accent used across your app"
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    {COLOR_PRESETS.map((preset) => {
                      const active = preset.hsl === color;
                      return (
                        <button
                          type="button"
                          key={preset.name}
                          onClick={() => setColor(preset.hsl)}
                          title={preset.name}
                          className={cn(
                            "h-10 w-10 rounded-full border-2 transition-bounce hover:scale-110",
                            active
                              ? "border-foreground ring-4 ring-foreground/10"
                              : "border-transparent",
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
                </FieldCard>

                {/* Build CTA */}
                <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-card to-secondary/40 p-6">
                  <Button
                    type="submit"
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
                        Build app <Rocket className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* PREVIEW */}
              <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
                {/* App Icon Preview */}
                <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-secondary/60 via-card to-accent/40 p-6">
                  <p className="mb-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    App Icon Preview
                  </p>
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-[18px] shadow-lg"
                        style={{
                          background: appIcon
                            ? undefined
                            : `linear-gradient(135deg, hsl(${color}), hsl(${color} / 0.7))`,
                        }}
                      >
                        {appIcon ? (
                          <img
                            src={appIcon}
                            alt="App icon"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ShoppingBag className="h-8 w-8 text-white" />
                        )}
                      </div>
                      <span className="max-w-[80px] truncate text-xs font-medium">
                        {appName || "Your App"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phone Preview */}
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-secondary/60 via-card to-accent/40 p-8 sm:p-12">
                  <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1 text-xs font-medium backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    Live preview
                  </div>
                  <div className="flex justify-center pt-4">
                    <PhonePreview
                      appName={appName}
                      appIcon={appIcon}
                      primaryColor={color}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

const FieldCard = ({
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
      <span className="text-sm font-semibold">{label}</span>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
    {children}
  </div>
);

export default Builder;
