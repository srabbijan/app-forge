import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import useCommonStore from "@/stores/store";
import type { IShop, IShopMain } from "@/types/shop";
import {
  ExternalLink,
  Loader2,
  Lock,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BeeLoader from "./common/BeeLoader";
import BrandingLogo from "./common/BrandingLogo";
import { CopyRight } from "./common/CopyRight";
import { PageSubTitle, Text } from "./common/Text";
import { Card } from "./ui/card";
import defaultShop from "/shop_view.svg";
import { toast } from "sonner";

const SUBSCRIPTION_URL = "https://web.hishabee.business/";

const PaywallDialog = ({
  shop,
  open,
  onClose,
}: {
  shop: IShop | null;
  open: boolean;
  onClose: () => void;
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-md overflow-hidden p-0">
      {/* Brand header */}
      <div className="bg-gradient-primary px-6 pb-6 pt-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black/10 backdrop-blur-sm">
          <Lock className="h-7 w-7 text-primary-foreground" />
        </div>
        <DialogTitle className="text-xl font-extrabold text-primary-foreground">
          Advanced Plan Required
        </DialogTitle>
        <DialogDescription className="mt-1.5 text-sm text-primary-foreground/80">
          {shop?.name
            ? `"${shop.name}" needs an Active Advanced subscription to build an app.`
            : "This shop needs an Active Advanced subscription to build an app."}
        </DialogDescription>
      </div>

      {/* Body */}
      <div className="space-y-4 p-6">
        <p className="text-sm text-muted-foreground">
          App building is available exclusively on the Advanced plan. Here's how
          to get started:
        </p>

        <div className="space-y-3">
          {[
            {
              icon: Smartphone,
              title: "Go to Hishabee web",
              desc: "Open your shop dashboard at web.hishabee.business",
            },
            {
              icon: Zap,
              title: "Upgrade to Advanced",
              desc: 'Navigate to Subscription and select the "Advanced" plan',
            },
            {
              icon: Sparkles,
              title: "Come back and build",
              desc: "Once upgraded, select this shop and build your app",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                <Icon className="h-4 w-4 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1 bg-gradient-primary font-semibold text-primary-foreground hover:opacity-90"
            onClick={() => window.open(SUBSCRIPTION_URL, "_blank")}
          >
            Upgrade now
            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const ShopUi = ({
  shops,
  isLoading,
}: {
  shops: IShop[];
  isLoading: boolean;
}) => {
  const navigate = useNavigate();
  const setCurrentShop = useCommonStore((state) => state.setCurrentShop);
  const currentShop = useCommonStore((state) => state.currentShop);
  const [loading, setLoading] = useState(false);
  // const [paywallShop, setPaywallShop] = useState<IShop | null>(null);

  const setTotalShopCount = useCommonStore((state) => state.setTotalShopCount);

  const handleContinue = (shop: IShop) => {
    // if (shop.package !== "ADVANCED") {
    //   // setPaywallShop(shop);

    //   return;
    // }
    setLoading(true);
    setTotalShopCount(shops.length);
    const shopData = {
      sms_count: shop.sms_count,
      subscription: shop.package,
      name: shop.name,
      number: shop.public_number,
      address: shop.address,
      logo_url: shop.logo_url,
      id: shop.id,
      end_date: shop.end_date,
      slug: shop.slug,
      ai_credit: shop.api_credit,
      due_remainder_minutes: shop.due_reminder_credit,
      features: shop.features,
    };
    setCurrentShop(shopData as IShopMain);
    void navigate("/builder");
    setLoading(false);
  };

  if (isLoading) {
    return (
      <div className="h-[700px] w-full flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary dark:text-primary-40" />
      </div>
    );
  }

  return (
    <div className="space-y-4 max-7xl mx-auto flex flex-col items-center justify-center py-8">
      {loading && <BeeLoader />}
      {/* <PaywallDialog
        shop={paywallShop}
        open={!!paywallShop}
        onClose={() => setPaywallShop(null)}
      /> */}
      <BrandingLogo />
      <PageSubTitle title={"Choose your Shop"} />
      <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
        {shops?.map((shop) => (
          <Card
            key={shop?.id + "shop"}
            className={`p-4 border-color bg-white relative flex w-full  flex-col items-center shadow-sm
                        ${currentShop?.id === shop.id ? "border-[.3rem] border-green-400" : "border"}
                        `}
          >
            <div className="mt-8 gap-3 flex flex-col items-center">
              <img
                src={
                  shop?.logo_url && shop?.logo_url !== "undefined"
                    ? shop?.logo_url
                    : defaultShop
                }
                alt={shop?.name}
                height={84}
                width={84}
              />

              <Text title={shop?.name} className="font-semibold" />
              <Text
                title={shop?.address}
                variant="secondary"
                className="text-sm"
              />

              <Button
                size={"sm"}
                variant="default"
                className="sm:px-6 p-5 gap-2"
                onClick={() => handleContinue(shop)}
              >
                <Text title={"Select Shop"} className="text-sm font-semibold" />
              </Button>
            </div>

            {/* <div className="absolute top-2 right-2">
              <button className="p-3" onClick={() => handleEditClick(shop)}>
                <Icon icon="mdi:store-edit-outline" height={24} width={24} />
              </button>
            </div> */}
          </Card>
        ))}
      </div>
      <CopyRight />
    </div>
  );
};

export default ShopUi;
