import ShopUi from "@/components/ShopUi";
import auth_http from "@/services/auth_http";
import useCommonStore, { useUser } from "@/stores/store";
import type { IShop } from "@/types/shop";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Shop() {
  const user = useUser();
  const navigate = useNavigate();
  const setIsNumberChecked = useCommonStore(
    (state) => state.setIsNumberChecked,
  );

  useEffect(() => {
    if (!user) {
      setIsNumberChecked(false);
      navigate("/login", { replace: true });
    }
  }, [user, navigate, setIsNumberChecked]);

  const { data: shop, isLoading } = useQuery<IShop[]>({
    queryKey: ["all_shops", String(user?.id || "")],
    queryFn: async () => {
      const url = "/shop/all";
      const response = await auth_http.get(url);
      // console.log({ response });
      return response.data;
    },
    enabled: !!user,
  });

  if (!user) {
    return null;
  }

  // console.log({ shop });

  return <ShopUi shops={shop || []} isLoading={isLoading} />;
}

export default Shop;
