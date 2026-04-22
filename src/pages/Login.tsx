import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Phone } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    const next = [...pin];
    next[i] = digit;
    setPin(next);
    if (digit && i < 3) inputs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[i] && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 3) inputs.current[i + 1]?.focus();
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!data) return;
    const next = ["", "", "", ""];
    data.split("").forEach((d, i) => (next[i] = d));
    setPin(next);
    inputs.current[Math.min(data.length, 3)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pinValue = pin.join("");
    if (phone.length < 8) return toast.error("Enter a valid phone number");
    if (pinValue.length < 4) return toast.error("Enter your 4-digit PIN");

    setLoading(true);
    setTimeout(() => {
      // Mock shopId from "API"
      sessionStorage.setItem("shopId", "SHOP_" + Math.random().toString(36).slice(2, 8).toUpperCase());
      sessionStorage.setItem("phone", phone);
      toast.success("Welcome back! 👋");
      navigate("/builder");
    }, 900);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <Link
        to="/"
        className="absolute left-6 top-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-base hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="relative w-full max-w-md animate-scale-in">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-lg backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue building
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Phone number
              </label>
              <div className="group relative">
                <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-base group-focus-within:text-primary" />
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s]/g, ""))}
                  placeholder="+1 555 000 0000"
                  className="h-12 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-base outline-none transition-base placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15"
                />
              </div>
            </div>

            {/* PIN */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                4-digit PIN
              </label>
              <div className="flex gap-3">
                {pin.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputs.current[i] = el)}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => onKey(i, e)}
                    onPaste={onPaste}
                    className="h-14 flex-1 rounded-xl border border-input bg-background text-center text-2xl font-bold outline-none transition-base focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                ))}
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
                </>
              ) : (
                "Continue"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By continuing you agree to our{" "}
              <a href="#" className="font-medium text-foreground underline-offset-2 hover:underline">
                Terms
              </a>{" "}
              &{" "}
              <a href="#" className="font-medium text-foreground underline-offset-2 hover:underline">
                Privacy
              </a>
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Hint: any phone (8+ digits) and any 4-digit PIN works for the demo.
        </p>
      </div>
    </div>
  );
};

export default Login;
