import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/stores/store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useUser();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-smooth",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-base hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#how"
            className="text-sm font-medium text-muted-foreground transition-base hover:text-foreground"
          >
            How it works
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="sm">
            <Link to={user ? "/shop" : "/login"}>Build your app</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
