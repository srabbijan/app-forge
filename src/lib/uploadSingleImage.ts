import { config } from "@/config";
import useCommonStore from "@/stores/store";
import axios from "axios";

export const uploadShopLogo = async (file: File) => {
  const token = useCommonStore.getState().token;
  const body = new FormData();
  body.set("image", file);
  const countryCode = useCommonStore.getState().country_code;

  const baseURL =
    countryCode === "88" ? config.baseURL : config.internationalBaseURL;
  try {
    const response = await axios.post(baseURL + "/upload", body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.url as string;
    } else {
      return null;
    }
  } catch (error) {
    // need to send sentry error
    console.log("error", error);
    return null;
  }
};

export const uploadSingleImage = uploadShopLogo;
