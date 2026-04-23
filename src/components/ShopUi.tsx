import { Button } from "@/components/ui/button";
import useCommonStore from "@/stores/store";
import type { IShop, IShopMain } from "@/types/shop";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BeeLoader from "./common/BeeLoader";
import BrandingLogo from "./common/BrandingLogo";
import { CopyRight } from "./common/CopyRight";
import { PageSubTitle, Text } from "./common/Text";
import { Card } from "./ui/card";

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
  console.log({ shops });

  const setTotalShopCount = useCommonStore((state) => state.setTotalShopCount);

  const handleContinue = (shop: IShop) => {
    if (shop.package !== "ADVANCED")
      return toast.warning(
        "You have to buy subscription for this Shop to Build your App",
      );
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
        <Loader2 className="h-16 w-16 animate-spin text-primary dark:text-primary-40" />{" "}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-7xl mx-auto flex flex-col items-center justify-center py-8">
      {loading && <BeeLoader />}
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
                    : `/shop_view.svg`
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
