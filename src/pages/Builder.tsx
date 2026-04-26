import { LanguageToggle } from "@/components/common/LanguageToggle";
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
  SlidersHorizontal,
  Smartphone,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
    .min(1, { message: "builder.form.emailRequired" })
    .email({ message: "builder.form.emailInvalid" }),
  appName: z
    .string()
    .min(1, { message: "builder.form.appNameRequired" })
    .max(30),
});

type FormValues = z.infer<typeof formSchema>;
type Tab = "details" | "preview";

const Builder = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [shopId, setShopId] = useState("");
  const [appIcon, setAppIcon] = useState<string | undefined>();
  const [iconFile, setIconFile] = useState<File | undefined>();
  const [color, setColor] = useState(COLOR_PRESETS[0].hsl);
  const [building, setBuilding] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const fileRef = useRef<HTMLInputElement>(null);
  const store = JSON.parse(localStorage.getItem("common-store") ?? "{}");
  const shop_id = store?.state?.shopId;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", appName: "" },
  });

  const appName = form.watch("appName");

  useEffect(() => {
    const paramShopId = localStorage.getItem("paramShopId");
    if (!paramShopId && !shop_id) {
      navigate("/login");
      return;
    }
    setShopId(paramShopId ?? shop_id);
  }, [navigate, shop_id]);

  const handleIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024)
      return toast.error(t("builder.errors.maxIconSize"));
    setIconFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAppIcon(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: FormValues) => {
    setBuilding(true);
    try {
      let splashUrl: string | null = null;
      if (iconFile) {
        splashUrl = await uploadSingleImage(iconFile);
        if (!splashUrl) {
          toast.error(t("builder.errors.iconUploadFailed"));
          setBuilding(false);
          return;
        }
      }

      const appNameSafe = values.appName.replace(/[^a-zA-Z0-9 ]/g, "").trim();
      const primaryColor = hslToHex(color);

      const response = await fetch(
        `https://app.hishabee.business/white-label/dispatch`,
        {
          method: "POST",
          headers: {
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail: values.email,
            shopId,
            appName: appNameSafe,
            primaryColor: `0xFF${primaryColor.toUpperCase()}`,
            splashUrl: splashUrl ?? "",
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.message ?? t("builder.errors.buildFailed");
        console.error("Workflow dispatch failed:", data);
        toast.error(message);
        setBuilding(false);
        return;
      }

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
      toast.error(t("builder.errors.somethingWrong"));
      setBuilding(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
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
              {t("builder.header.appBuilder")}
            </span>
          </div>
          <LanguageToggle />
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="hidden text-muted-foreground sm:inline">
              {t("builder.header.connectedTo")}
            </span>
            <span className="font-mono font-semibold">{shopId}</span>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Mobile tabs */}
        <div className="mb-6 flex rounded-xl border border-border/60 bg-card p-1 lg:hidden">
          <TabButton
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
            icon={<SlidersHorizontal className="h-3.5 w-3.5" />}
            label={t("builder.tabs.details")}
          />
          <TabButton
            active={activeTab === "preview"}
            onClick={() => setActiveTab("preview")}
            icon={<Smartphone className="h-3.5 w-3.5" />}
            label={t("builder.tabs.preview")}
          />
        </div>

        <Form {...form}>
          <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
              {/* FORM — hidden on mobile when preview tab is active */}
              <div
                className={cn(
                  "space-y-4",
                  activeTab === "preview" && "hidden lg:block",
                )}
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FieldCard
                      label={t("builder.form.email.label")}
                      hint={t("builder.form.email.hint")}
                    >
                      <FormItem>
                        <FormLabel className="sr-only">
                          {t("builder.form.email.label")}
                        </FormLabel>
                        <FormControl>
                          <div className="group relative">
                            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-base group-focus-within:text-primary" />
                            <Input
                              type="email"
                              placeholder={t("builder.form.email.placeholder")}
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
                    <FieldCard
                      label={t("builder.form.appName.label")}
                      hint={t("builder.form.appName.hint")}
                    >
                      <FormItem>
                        <FormLabel className="sr-only">
                          {t("builder.form.appName.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("builder.form.appName.placeholder")}
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
                  label={t("builder.form.appIcon.label")}
                  hint={t("builder.form.appIcon.hint")}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleIcon}
                  />
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary/40">
                      {appIcon ? (
                        <>
                          <img
                            src={appIcon}
                            alt={t("builder.form.appIcon.altPreview")}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setAppIcon(undefined);
                              setIconFile(undefined);
                            }}
                            className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-base hover:scale-110"
                            aria-label={t("builder.form.appIcon.remove")}
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
                      {appIcon
                        ? t("builder.form.appIcon.change")
                        : t("builder.form.appIcon.upload")}
                    </Button>
                  </div>
                </FieldCard>

                {/* Color */}
                <FieldCard
                  label={t("builder.form.primaryColor.label")}
                  hint={t("builder.form.primaryColor.hint")}
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
                            "h-9 w-9 rounded-full border-2 transition-bounce hover:scale-110",
                            active
                              ? "border-foreground ring-4 ring-foreground/10"
                              : "border-transparent",
                          )}
                          style={{ background: `hsl(${preset.hsl})` }}
                          aria-label={preset.name}
                        />
                      );
                    })}
                    <label className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-border transition-base hover:border-foreground">
                      <input
                        type="color"
                        onChange={(e) => setColor(hexToHsl(e.target.value))}
                        className="absolute inset-0 cursor-pointer opacity-0"
                        aria-label={t("builder.form.primaryColor.custom")}
                      />
                      <span className="text-xs font-semibold">+</span>
                    </label>
                  </div>
                </FieldCard>

                {/* Build CTA */}
                <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-card to-secondary/40 p-5">
                  <p className="text-sm font-semibold">
                    {t("builder.build.title")}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t("builder.build.desc")}
                  </p>
                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="mt-4 w-full"
                    disabled={building}
                  >
                    {building ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("builder.build.building")}
                      </>
                    ) : (
                      <>
                        {t("builder.build.button")}{" "}
                        <Rocket className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* PREVIEW — hidden on mobile when details tab is active */}
              <div
                className={cn(
                  "space-y-5 lg:sticky lg:top-24 lg:self-start",
                  activeTab === "details" && "hidden lg:block",
                )}
              >
                {/* App icon chip */}
                <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/60 via-card to-accent/40 p-5">
                  <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("builder.preview.appIcon")}
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
                        {appName || t("builder.preview.yourApp")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phone preview */}
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-secondary/60 via-card to-accent/40 p-8 sm:p-12">
                  <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1 text-xs font-medium backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    {t("builder.preview.livePreview")}
                  </div>
                  <div className="flex justify-center pt-4">
                    <PhonePreview
                      appName={appName}
                      appIcon={appIcon}
                      primaryColor={color}
                    />
                  </div>
                </div>

                {/* Mobile: build button shortcut in preview tab */}
                <div className="lg:hidden">
                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={building}
                    onClick={() => {
                      form.handleSubmit(onSubmit, () => {
                        // validation failed — take user to where the errors are
                        setActiveTab("details");
                      })();
                    }}
                  >
                    {building ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("builder.build.building")}
                      </>
                    ) : (
                      <>
                        {t("builder.build.button")}{" "}
                        <Rocket className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

const TabButton = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all",
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground",
    )}
  >
    {icon}
    {label}
  </button>
);

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
