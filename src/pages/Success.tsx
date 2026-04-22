import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Apple, Check, Download, Smartphone, Sparkles } from "lucide-react";

interface BuildInfo {
  shopId: string;
  appName: string;
  appIcon?: string;
  color: string;
  builtAt: number;
}

const Success = () => {
  const navigate = useNavigate();
  const [build, setBuild] = useState<BuildInfo | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("lastBuild");
    if (!raw) {
      navigate("/builder");
      return;
    }
    setBuild(JSON.parse(raw));

    // Confetti
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
  }, [navigate]);

  if (!build) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <header className="relative">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link to="/builder">Build another</Link>
          </Button>
        </div>
      </header>

      <main className="container relative py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* Success badge */}
          <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-glow animate-scale-in">
            <Check className="h-10 w-10 text-primary-foreground" strokeWidth={3} />
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
          </div>

          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground animate-fade-in">
            <Sparkles className="h-3 w-3" /> Build complete
          </p>

          <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl animate-fade-in-up">
            Your app is{" "}
            <span className="text-gradient">ready to launch!</span>
          </h1>
          <p
            className="mx-auto mt-4 max-w-md text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "120ms", animationFillMode: "backwards" }}
          >
            <span className="font-semibold text-foreground">{build.appName}</span> was built successfully.
            Download below or share the install links with your team.
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
                  background: `linear-gradient(135deg, hsl(${build.color}), hsl(${build.color} / 0.6))`,
                }}
              >
                {build.appIcon ? (
                  <img src={build.appIcon} alt="" className="h-full w-full object-cover" />
                ) : (
                  <Smartphone className="h-7 w-7 text-white" />
                )}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="truncate text-lg font-bold">{build.appName}</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Build #{build.shopId} · v1.0.0
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Ready
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button variant="hero" size="lg">
                <Apple className="h-4 w-4" />
                Download iOS
              </Button>
              <Button variant="outline" size="lg">
                <Download className="h-4 w-4" />
                Download Android
              </Button>
            </div>
          </div>

          {/* Build stats */}
          <div
            className="mt-6 grid grid-cols-3 gap-3 animate-fade-in-up"
            style={{ animationDelay: "360ms", animationFillMode: "backwards" }}
          >
            {[
              { label: "Build time", value: "47s" },
              { label: "Platforms", value: "iOS + Android" },
              { label: "Status", value: "Deployed" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-md">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-sm font-bold">{s.value}</p>
              </div>
            ))}
          </div>

          <Button asChild variant="ghost" className="mt-10">
            <Link to="/builder">← Build another app</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Success;
