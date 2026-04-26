import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { currentLanguage, toggleLanguage, isBengali, isEnglish } =
    useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="min-w-[60px] font-medium"
    >
      <span
        className={cn(
          "transition-opacity",
          isEnglish ? "opacity-100" : "opacity-50",
        )}
      >
        EN
      </span>
      <span className="text-muted-foreground mx-1">/</span>
      <span
        className={cn(
          "transition-opacity",
          isBengali ? "opacity-100" : "opacity-50",
        )}
      >
        বাং
      </span>
    </Button>
  );
}
