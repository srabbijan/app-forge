import logo from "/hishabee.webp";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logo}
        alt="Hishabee Logo"
        className=""
        width={150}
        height={44}
      />
    </div>
  );
};
