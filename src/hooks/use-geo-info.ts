import { useCommonStore } from "@/stores/store";
import type { IGeoInfo } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export const useGeoInfo = () => {
  const setGeoInfo = useCommonStore((state) => state.setGeoInfo);

  const { data, isLoading, error } = useQuery<IGeoInfo, Error>({
    queryKey: ["geo-info"],
    queryFn: async () => {
      const response = await axios.get("https://ipinfo.io/json");
      return response.data as IGeoInfo;
    },
  });

  useEffect(() => {
    if (data) {
      setGeoInfo(data);

      localStorage.setItem("country", data.country);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { data, isLoading, error };
};
