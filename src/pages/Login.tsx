import CountryCodeSelector from "@/components/CountryCodeSelector";
import { Logo } from "@/components/Logo";
import GiveNumber from "@/components/auth/GiveNumber";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
        {/* Background mesh */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />

        <div className="relative w-full max-w-md animate-scale-in">
          <Link
            to="/"
            className="absolute top-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-base hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-lg backdrop-blur-xl sm:p-10">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to continue building
              </p>
            </div>

            <GiveNumber />
          </div>
        </div>
      </div>

      <CountryCodeSelector />
    </>
  );
};

export default Login;
