import ShopUi from "@/components/ShopUi";
import auth_http from "@/services/auth_http";
import { useUser } from "@/stores/store";
import type { IShop } from "@/types/shop";
import { useQuery } from "@tanstack/react-query";

function Shop() {
  const user = useUser();
  const { data: shop, isLoading } = useQuery<IShop[]>({
    queryKey: ["all_shops", String(user?.id || "")],
    queryFn: async () => {
      const url = "/shop/all";
      const response = await auth_http.get(url);
      // console.log({ response });
      return response.data;
    },
  });

  // console.log({ shop });

  return <ShopUi shops={shop || []} isLoading={isLoading} />;
}

export default Shop;
