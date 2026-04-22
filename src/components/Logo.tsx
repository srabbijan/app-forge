import appIcon from "@/assets/app-icon.png";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src={appIcon} alt="Hishabee" className="h-8 w-8 rounded-xl" />

      <span className="text-lg font-bold tracking-tight">Hishabee</span>
    </div>
  );
};
