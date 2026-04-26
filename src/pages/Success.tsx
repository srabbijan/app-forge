import { LanguageToggle } from "@/components/common/LanguageToggle";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { Check, GitBranch, Mail, Smartphone, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

interface BuildInfo {
  shopId: string;
  appName: string;
  splashUrl?: string;
  primaryColor: string;
  email: string;
  builtAt: number;
}

const Success = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [build, setBuild] = useState<BuildInfo | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("lastBuild");
    if (!raw) {
      navigate("/builder");
      return;
    }
    setBuild(JSON.parse(raw));
  }, [navigate]);

  useEffect(() => {
    if (!build) return;
    const fire = (origin: { x: number; y: number }) =>
      confetti({
        particleCount: 80,
        spread: 70,
        origin,
        colors: ["#7c3aed", "#a78bfa", "#ec4899", "#10b981", "#f59e0b"],
      });
    setTimeout(() => fire({ x: 0.25, y: 0.4 }), 100);
    setTimeout(() => fire({ x: 0.75, y: 0.4 }), 350);
    setTimeout(() => fire({ x: 0.5, y: 0.3 }), 600);
  }, [build]);

  if (!build) return null;

  const userEmail =
    build.email || sessionStorage.getItem("email") || "your email";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <header className="relative">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <main className="container relative py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* Status icon */}
          <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-glow animate-scale-in">
            <Check
              className="h-10 w-10 text-primary-foreground"
              strokeWidth={3}
            />
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
          </div>

          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground animate-fade-in">
            <Sparkles className="h-3 w-3" /> {t("success.buildTriggered")}
          </p>

          <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl animate-fade-in-up">
            {t("success.title")}
          </h1>
          <p
            className="mx-auto mt-4 max-w-md text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "120ms", animationFillMode: "backwards" }}
          >
            <Trans
              i18nKey="success.description"
              values={{ appName: build.appName, userEmail }}
              components={[
                <span className="font-semibold text-foreground" key="0" />,
                <span className="font-semibold text-foreground" key="1" />,
              ]}
            />
          </p>

          {/* App card */}
          <div
            className="mt-10 rounded-3xl border border-border/60 bg-card/80 p-6 backdrop-blur-xl shadow-lg animate-fade-in-up"
            style={{ animationDelay: "240ms", animationFillMode: "backwards" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-md"
                style={{
                  background: `linear-gradient(135deg, hsl(${build.primaryColor}), hsl(${build.primaryColor} / 0.6))`,
                }}
              >
                {build.splashUrl ? (
                  <img
                    src={build.splashUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Smartphone className="h-7 w-7 text-white" />
                )}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="truncate text-lg font-bold">{build.appName}</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  {t("success.shop", { id: build.shopId })}
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                {t("success.building")}
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div
            className="mt-6 rounded-3xl border border-border/60 bg-card/80 p-6 backdrop-blur-xl shadow-lg text-left animate-fade-in-up"
            style={{ animationDelay: "360ms", animationFillMode: "backwards" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">
                {t("success.nextSteps.title")}
              </span>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: GitBranch,
                  text: t("success.nextSteps.step1"),
                },
                {
                  icon: Smartphone,
                  text: t("success.nextSteps.step2"),
                },
                {
                  icon: Mail,
                  text: t("success.nextSteps.step3", { email: userEmail }),
                },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="pt-0.5 text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Email reminder */}
          <div
            className="mt-6 rounded-2xl border border-success/30 bg-success/5 p-5 text-left animate-fade-in-up"
            style={{ animationDelay: "480ms", animationFillMode: "backwards" }}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/15">
                <Mail className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {t("success.emailReminder.title")}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  <Trans
                    i18nKey="success.emailReminder.desc"
                    values={{ email: userEmail }}
                    components={[
                      <span className="font-medium text-foreground" key="0" />,
                    ]}
                  />
                </p>
              </div>
            </div>
          </div>

          <Button asChild variant="ghost" className="mt-10">
            <Link to="/builder">{t("success.buildAnother")}</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Success;
