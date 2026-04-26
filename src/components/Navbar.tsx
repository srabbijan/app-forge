import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/stores/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { Logo } from "./Logo";
import { LanguageToggle } from "./common/LanguageToggle";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useUser();
  const [searchParam] = useSearchParams();
  const paramShopId = searchParam.get("shopId");
  const { t } = useTranslation();

  useEffect(() => {
    if (paramShopId) return localStorage.setItem("paramShopId", paramShopId);
  }, [paramShopId]);

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
            {t("nav.features")}
          </a>
          <a
            href="#how"
            className="text-sm font-medium text-muted-foreground transition-base hover:text-foreground"
          >
            {t("nav.howItWorks")}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Button asChild variant="hero" size="sm">
            <Link to={paramShopId ? "/builder" : user ? "/shop" : "/login"}>
              {t("nav.buildApp")}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
