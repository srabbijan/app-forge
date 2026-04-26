import CountryCodeSelector from "@/components/CountryCodeSelector";
import { Navbar } from "@/components/Navbar";
import SetGeoInfo from "@/components/SetGeoInfo";
import GiveNumber from "@/components/auth/GiveNumber";
import GivePin from "@/components/auth/GivePin";
import useCommonStore from "@/stores/store";
import { useTranslation } from "react-i18next";

const Login = () => {
  const isNumberChecked = useCommonStore((state) => state.isNumberChecked);
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <SetGeoInfo />
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
        {/* Background mesh */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />

        <div className="relative w-full max-w-md animate-scale-in">
          <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-lg backdrop-blur-xl sm:p-10">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                {t("login.welcome")}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("login.subtitle")}
              </p>
            </div>
            {isNumberChecked ? (
              <>
                <GivePin />
              </>
            ) : (
              <>
                <GiveNumber />
              </>
            )}
          </div>
        </div>
      </div>

      <CountryCodeSelector />
    </>
  );
};

export default Login;
