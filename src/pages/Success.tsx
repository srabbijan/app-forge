import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Check, GitBranch, Loader2, Mail, Smartphone, Sparkles } from "lucide-react";

interface BuildInfo {
  shopId: string;
  appName: string;
  appIcon?: string;
  color: string;
  builtAt: number;
}

const PIPELINE_STEPS = [
  { label: "Triggering Action", duration: 2500 },
  { label: "Setting up build environment", duration: 3000 },
  { label: "Compiling application", duration: 4000 },
  { label: "Running tests", duration: 2500 },
  { label: "Generating APK", duration: 3500 },
  { label: "Uploading artifacts", duration: 2000 },
  { label: "Sending download link to your email", duration: 2000 },
];

const Success = () => {
  const navigate = useNavigate();
  const [build, setBuild] = useState<BuildInfo | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("lastBuild");
    if (!raw) {
      navigate("/builder");
      return;
    }
    setBuild(JSON.parse(raw));
  }, [navigate]);

  // Simulate pipeline steps
  useEffect(() => {
    if (!build || done) return;

    if (currentStep >= PIPELINE_STEPS.length) {
      setDone(true);
      // Confetti on completion
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
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((s) => s + 1);
    }, PIPELINE_STEPS[currentStep].duration);

    return () => clearTimeout(timer);
  }, [build, currentStep, done]);

  if (!build) return null;

  const userEmail = sessionStorage.getItem("email") || "your registered email";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <header className="relative">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="container relative py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* Status badge */}
          <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-glow animate-scale-in">
            {done ? (
              <>
                <Check className="h-10 w-10 text-primary-foreground" strokeWidth={3} />
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
              </>
            ) : (
              <Loader2 className="h-10 w-10 text-primary-foreground animate-spin" />
            )}
          </div>

          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground animate-fade-in">
            {done ? (
              <>
                <Sparkles className="h-3 w-3" /> Build complete
              </>
            ) : (
              <>
                <GitBranch className="h-3 w-3" /> GitHub Action running
              </>
            )}
          </p>

          {done ? (
            <>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl animate-fade-in-up">
                Your app is{" "}
                <span className="text-gradient">ready!</span>
              </h1>
              <p
                className="mx-auto mt-4 max-w-md text-muted-foreground animate-fade-in-up"
                style={{ animationDelay: "120ms", animationFillMode: "backwards" }}
              >
                <span className="font-semibold text-foreground">{build.appName}</span> was built
                successfully. The download link has been sent to{" "}
                <span className="font-semibold text-foreground">{userEmail}</span>.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl animate-fade-in-up">
                Building{" "}
                <span className="text-gradient">{build.appName}</span>
              </h1>
              <p
                className="mx-auto mt-4 max-w-md text-muted-foreground animate-fade-in-up"
                style={{ animationDelay: "120ms", animationFillMode: "backwards" }}
              >
                A GitHub Action is running to compile your app. The download link will be sent to{" "}
                <span className="font-semibold text-foreground">{userEmail}</span> once complete.
              </p>
            </>
          )}

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
              <div
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  done
                    ? "bg-success/10 text-success"
                    : "bg-amber-500/10 text-amber-500"
                }`}
              >
                {done ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Complete
                  </>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Building
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Pipeline steps */}
          <div
            className="mt-8 rounded-3xl border border-border/60 bg-card/80 p-6 backdrop-blur-xl shadow-lg text-left animate-fade-in-up"
            style={{ animationDelay: "360ms", animationFillMode: "backwards" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Build Pipeline</span>
              {!done && (
                <span className="ml-auto text-xs text-muted-foreground">
                  Step {Math.min(currentStep + 1, PIPELINE_STEPS.length)} of {PIPELINE_STEPS.length}
                </span>
              )}
            </div>
            <div className="space-y-3">
              {PIPELINE_STEPS.map((step, i) => {
                const isComplete = i < currentStep;
                const isActive = i === currentStep && !done;

                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                      {isComplete ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15">
                          <Check className="h-3 w-3 text-success" strokeWidth={3} />
                        </div>
                      ) : isActive ? (
                        <Loader2 className="h-4 w-4 text-primary animate-spin" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        isComplete
                          ? "text-muted-foreground"
                          : isActive
                            ? "font-medium text-foreground"
                            : "text-muted-foreground/50"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Email notification card (shown when done) */}
          {done && (
            <div
              className="mt-6 rounded-2xl border border-success/30 bg-success/5 p-5 text-left animate-fade-in-up"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/15">
                  <Mail className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Download link sent!</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We've sent the APK download links to{" "}
                    <span className="font-medium text-foreground">{userEmail}</span>. Check your inbox
                    — it should arrive within a few minutes.
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button asChild variant="ghost" className="mt-10">
            <Link to="/builder">← Build another app</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Success;
