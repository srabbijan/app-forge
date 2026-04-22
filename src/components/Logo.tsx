import { Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
        <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
      </div>
      <span className="text-lg font-bold tracking-tight">Appforge</span>
    </div>
  );
};
