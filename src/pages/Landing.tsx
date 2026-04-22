import { Navbar } from "@/components/Navbar";
import { HeroSlider } from "@/components/HeroSlider";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Palette, Smartphone, ShieldCheck, Rocket, Code2 } from "lucide-react";

const features = [
  { icon: Zap, title: "Instant build", desc: "From form submit to download in under 60 seconds." },
  { icon: Palette, title: "Pixel-perfect branding", desc: "Your colors, your logo. No Appforge marks anywhere." },
  { icon: Smartphone, title: "iOS & Android", desc: "Native-grade apps generated for both stores." },
  { icon: ShieldCheck, title: "Offline first", desc: "Customers shop even without internet. Auto-sync later." },
  { icon: Rocket, title: "Push notifications", desc: "Drive sales with built-in campaign tooling." },
  { icon: Code2, title: "No code required", desc: "Skip developers. Skip delays. Just ship." },
];

const steps = [
  { n: "01", title: "Sign in", desc: "Secure phone + PIN — no passwords to remember." },
  { n: "02", title: "Customize", desc: "Set your name, icon, and brand color. See it live." },
  { n: "03", title: "Build", desc: "One click. We compile, sign, and deliver your app." },
];

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
        {/* Mesh background */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs font-medium backdrop-blur-md animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-muted-foreground">New</span>
              <span className="font-semibold">v2.0 — Live preview & instant builds</span>
            </div>

            <h1 className="animate-fade-in-up text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Build Your Own{" "}
              <span className="text-gradient">E-commerce App</span>{" "}
              in One Click
            </h1>

            <p
              className="mx-auto mt-6 max-w-xl text-balance text-lg text-muted-foreground sm:text-xl animate-fade-in-up"
              style={{ animationDelay: "120ms", animationFillMode: "backwards" }}
            >
              No coding. No delays. Your branded mobile app, instantly.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up"
              style={{ animationDelay: "240ms", animationFillMode: "backwards" }}
            >
              <Button asChild variant="hero" size="xl">
                <Link to="/login">
                  Build your app <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href="#features">See how it works</a>
              </Button>
            </div>

            {/* Trust */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span>✓ No credit card required</span>
              <span>✓ 60-second builds</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>

          {/* Slider */}
          <div
            className="mx-auto mt-16 max-w-5xl animate-fade-in-up"
            style={{ animationDelay: "360ms", animationFillMode: "backwards" }}
          >
            <HeroSlider />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative border-t border-border/60 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Features</p>
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Everything you need to launch
            </h2>
            <p className="mt-4 text-muted-foreground">
              A complete toolkit for going from idea to App Store — without writing a single line of code.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-smooth group-hover:bg-primary/15" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="relative mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative border-t border-border/60 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">How it works</p>
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Three steps. Sixty seconds.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.n} className="relative rounded-2xl border border-border/60 bg-card p-8">
                <span className="text-5xl font-extrabold text-gradient">{s.n}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground/40 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="relative py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-primary p-12 text-center shadow-glow sm:p-20">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
            <h2 className="relative text-balance text-4xl font-extrabold text-primary-foreground sm:text-5xl">
              Your app is one click away.
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-primary-foreground/80">
              Join thousands of merchants who launched in minutes, not months.
            </p>
            <Button asChild size="xl" variant="glass" className="relative mt-8 bg-white text-foreground hover:bg-white/90">
              <Link to="/login">
                Start building free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Appforge. Build apps in seconds.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-base">Privacy</a>
            <a href="#" className="hover:text-foreground transition-base">Terms</a>
            <a href="#" className="hover:text-foreground transition-base">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
