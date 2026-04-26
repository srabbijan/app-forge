import { HeroSlider } from "@/components/HeroSlider";
import { Navbar } from "@/components/Navbar";
import SetGeoInfo from "@/components/SetGeoInfo";
import { Button } from "@/components/ui/button";
import { useUser } from "@/stores/store";
import {
  ArrowRight,
  Building2Icon,
  CircleUserRound,
  CreditCard,
  FileText,
  LogIn,
  MessageCircleMore,
  Package,
  Palette,
  Store,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const features = [
  {
    icon: Store,
    title: "হিসাবী স্টোরে আপনার অ্যাপ",
    desc: "আপনার ই-কমার্স অ্যাপ অটোমেটেড এবং আগের চেয়ে দ্রুত পাওয়া যাবে",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    icon: Palette,
    title: "কাস্টমাইজযোগ্য থিম",
    desc: "লোগো, অ্যাপের রং, থিম ইত্যাদি পরিবর্তন করে নিজের মতো করে নিন",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    icon: Package,
    title: "আনলিমিটেড পণ্য এবং ক্যাটাগরি",
    desc: "যতখুশি পণ্য যুক্ত করুন এবং ক্যাটাগরি সাজিয়ে দিন একদম সহজভাবে",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: CreditCard,
    title: "সংযুক্ত পেমেন্ট গেটওয়ে",
    desc: "যেকোনো মাধ্যমে পেমেন্ট নেওয়া যাবে এবং পেমেন্ট ট্র্যাক করাও সহজ",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    icon: MessageCircleMore,
    title: "লাইভ চ্যাট",
    desc: "গ্রাহকের প্রশ্নের উত্তর দিন সরাসরি অ্যাপ থেকেই এবং বিক্রি বাড়ান দ্রুত",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: CircleUserRound,
    title: "কাস্টমার প্রোফাইল",
    desc: "গ্রাহকের প্রোফাইল দেখুন, ক্রয় ইতিহাস জানুন এবং ব্যক্তিগত অফার দিন",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
];

const tutorialSteps = [
  {
    number: "1",
    icon: LogIn,
    title: "Sign in",
    description: "Secure phone + PIN — no passwords to remember.",
  },
  {
    number: "2",
    icon: FileText,
    title: "Customize",
    description: "Set your name, icon, and brand color. See it live.",
  },
  {
    number: "3",
    icon: Building2Icon,
    title: "Build",
    description: "One click. We compile, sign, and deliver your app.",
  },
];

const Landing = () => {
  const user = useUser();
  const [searchParam] = useSearchParams();
  const paramShopId = searchParam.get("shopId");

  useEffect(() => {
    if (paramShopId) return localStorage.setItem("paramShopId", paramShopId);
  }, [paramShopId]);

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <SetGeoInfo />

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
              <span className="font-semibold">
                v2.0 — Live preview & instant builds
              </span>
            </div>

            <h1 className="animate-fade-in-up text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Build Your Own{" "}
              <span className="text-gradient">E-commerce App</span> in One Click
            </h1>

            <p
              className="mx-auto mt-6 max-w-xl text-balance text-lg text-muted-foreground sm:text-xl animate-fade-in-up"
              style={{
                animationDelay: "120ms",
                animationFillMode: "backwards",
              }}
            >
              No coding. No delays. Your branded mobile app, instantly.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up"
              style={{
                animationDelay: "240ms",
                animationFillMode: "backwards",
              }}
            >
              <Button asChild variant="hero" size="xl">
                <Link to={paramShopId ? "/builder" : user ? "/shop" : "/login"}>
                  Build your app{" "}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-all duration-300" />
                </Link>
              </Button>
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
      <section
        id="features"
        className="relative border-t border-border/50 bg-[#f8f6ef] py-24"
      >
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              সব ফিচার এক জায়গায়
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              আপনার ব্যবসাকে অনন্য উচ্চতায় নিয়ে যেতে যা যা প্রয়োজন
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group rounded-3xl border border-border/60 bg-background px-6 py-9 text-center transition-smooth hover:-translate-y-1 hover:shadow-lg"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${f.iconBg}`}
                >
                  <f.icon className={`h-7 w-7 ${f.iconColor}`} />
                </div>
                <h3 className="mt-7 text-2xl font-extrabold leading-snug text-foreground">
                  {f.title}
                </h3>
                <p className="mx-auto mt-4 max-w-[34ch] text-base leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative border-t border-border/60 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Three steps. Sixty seconds.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {tutorialSteps.map((step, index) => (
              <div key={step.number} className="relative group">
                {index < tutorialSteps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 left-full right-0 w-full items-center justify-center -translate-x-[46%] z-10">
                    <ArrowRight className="w-10 h-10 text-primary" />
                  </div>
                )}
                <article
                  className="bg-card border-2 border-border rounded-xl p-6 relative hover:shadow-yellow hover:border-primary transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold shadow-yellow">
                    {step.number}
                  </div>
                  <div className="mt-8">
                    <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground text-center">
                      {step.description}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Hishabee. Build apps in seconds.</p>
          <div className="flex gap-6">
            <a
              href="https://app.hishabee.business/privacy-policy"
              className="hover:text-foreground transition-base"
            >
              Privacy
            </a>
            <a
              href="https://app.hishabee.business/general-terms-of-use"
              className="hover:text-foreground transition-base"
            >
              Terms
            </a>
            <a
              href="https://www.hishabee.io/"
              className="hover:text-foreground transition-base"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
