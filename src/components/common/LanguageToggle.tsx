import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { toggleLanguage, isBengali, isEnglish } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="group relative flex h-8 w-16 items-center rounded-full bg-secondary/50 p-1 text-xs font-semibold text-muted-foreground shadow-inner border border-border/40 transition-colors hover:bg-secondary/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label="Toggle language"
    >
      {/* Sliding background pill */}
      <div
        className={cn(
          "absolute inset-y-1 w-7 rounded-full bg-background shadow-sm border border-border/60 transition-transform duration-300 ease-out",
          isBengali ? "translate-x-7" : "translate-x-0"
        )}
      />

      {/* EN Label */}
      <div className="relative z-10 flex w-1/2 items-center justify-center">
        <span
          className={cn(
            "transition-colors duration-300",
            isEnglish ? "text-foreground drop-shadow-sm" : "text-muted-foreground group-hover:text-foreground/80"
          )}
        >
          EN
        </span>
      </div>

      {/* BN Label */}
      <div className="relative z-10 flex w-1/2 items-center justify-center">
        <span
          className={cn(
            "mt-px transition-colors duration-300",
            isBengali ? "text-foreground drop-shadow-sm" : "text-muted-foreground group-hover:text-foreground/80"
          )}
        >
          বাং
        </span>
      </div>
    </button>
  );
}
