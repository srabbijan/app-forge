import { IShopMain } from "@/types/shop";
import { all_countries } from "./../constants/countries";
// create a common for all common state and actions
import {
  phone_codes,
  phone_validator,
  validatePhoneNumber,
  type IPhoneCode,
} from "@/constants/currency";
import type { IGeoInfo, IUser } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CountryInfo = (typeof all_countries)[number];

const buildPhoneCodeFromCountry = (country_info: CountryInfo): IPhoneCode => ({
  id: 0,
  country: country_info.country,
  phone_code: country_info.phone_code,
  flag: country_info.flag_url,
  code: country_info.flag_code,
  validator:
    phone_validator[country_info.flag_code as keyof typeof phone_validator],
});

const getPhoneCodeFromCountry = (country_info: CountryInfo): IPhoneCode => {
  return (
    phone_codes.find((code) => code.code === country_info.flag_code) ||
    buildPhoneCodeFromCountry(country_info)
  );
};

type CommonState = {
  phoneCode: IPhoneCode;
  showCountryCodeSelector: boolean;
  geoInfo: IGeoInfo | null;
  country_code: string;
  totalShopCount: number;
  isNumberChecked: boolean;
  currentNumber: string;
  user: IUser;
  token: string;
  currentShop: IShopMain | null;
  currentShopId: string | null;
  signupData: {
    brand_name: string;
    address: string;
    intent: string; // BOOK_KEEPING, ONLINE_SELL, BOTH
  } | null;
};

type CommonActions = {
  logout: () => void;
  setShowCountryCodeSelector: (showCountryCodeSelector: boolean) => void;
  setPhoneCode: (phoneCode: IPhoneCode) => void;
  setGeoInfo: (geoInfo: IGeoInfo) => void;
  setCountryCode: (country_code: string) => void;
  setPhoneCodeByPhoneCode: (phoneCode: string) => void;
  setTotalShopCount: (totalShopCount: number) => void;
  setIsNumberChecked: (isNumberChecked: boolean) => void;
  setCurrentNumber: (currentNumber: string) => void;
  setUser: (user: IUser) => void;
  setToken: (token: string) => void;
  setCurrentShop: (shop: IShopMain) => void;
  setCurrentShopId: (shopId: string) => void;
  setSignupData: (signupData: {
    brand_name: string;
    address: string;
    intent: string;
  }) => void;
};

export const useCommonStore = create<CommonState & CommonActions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: IUser) => {
        set({ user });
      },
      token: null,
      setToken: (token: string) => {
        set({ token });
      },
      logout: () => {
        set({
          user: null,
          token: null,
          currentNumber: null,
        });
      },
      currentShop: null,
      setCurrentShop: (shop: IShopMain) => {
        set({
          currentShop: shop,
          currentShopId: shop.id.toString(),
          signupData: null,
        });
      },
      currentShopId: null,
      setCurrentShopId: (shopId: string) => {
        set({ currentShopId: shopId, signupData: null });
      },
      signupData: null,
      setSignupData: (signupData: {
        brand_name: string;
        address: string;
        intent: string;
      }) => {
        set({ signupData });
      },
      country_code: "88",
      setCountryCode: (country_code) => {
        set((state) => {
          const matchingCountries = all_countries.filter(
            (country) => country.phone_code === country_code,
          );

          if (!matchingCountries.length) {
            return { country_code };
          }

          const preferredCountry =
            matchingCountries.find(
              (country) => country.flag_code === state.phoneCode?.code,
            ) || matchingCountries[0];

          const phone_code = getPhoneCodeFromCountry(preferredCountry);

          return {
            phoneCode: phone_code,
            country_code: preferredCountry.phone_code,
          };
        });
      },
      phoneCode: phone_codes[0],
      setPhoneCode: (phoneCode: IPhoneCode) =>
        set(() => {
          return {
            phoneCode,
            country_code: phoneCode.phone_code,
          };
        }),
      setPhoneCodeByPhoneCode: (country_code: string) => {
        set((state) => {
          const matchingCodes = phone_codes.filter(
            (phoneCode) => phoneCode.phone_code === country_code,
          );

          if (!matchingCodes.length) {
            return state;
          }

          const preferredPhoneCode =
            matchingCodes.find((code) => code.code === state.phoneCode?.code) ||
            matchingCodes[0];

          const country_info = all_countries.find(
            (country) => country.flag_code === preferredPhoneCode.code,
          );

          return {
            phoneCode: preferredPhoneCode,
            country_code: preferredPhoneCode.phone_code,
          };
        });
      },
      showCountryCodeSelector: false,
      setShowCountryCodeSelector: (showCountryCodeSelector) =>
        set({ showCountryCodeSelector }),
      geoInfo: null,
      setGeoInfo: (geoInfo) => {
        const country_code = geoInfo.country;
        const country_info = all_countries.find(
          (country) => country.flag_code === country_code,
        );

        // console.log({ country_info });

        if (country_info) {
          const phone_code = getPhoneCodeFromCountry(country_info);
          set({
            geoInfo: geoInfo,
            phoneCode: phone_code,
          });
        } else {
          set({ geoInfo });
        }
      },

      totalShopCount: 0,
      setTotalShopCount: (totalShopCount) => set({ totalShopCount }),
      isNumberChecked: false,
      setIsNumberChecked: (isNumberChecked: boolean) => {
        set({ isNumberChecked });
      },
      currentNumber: null,
      setCurrentNumber: (currentNumber: string) => {
        set({ currentNumber });
      },
    }),
    {
      name: "common-store", // localStorage key
      partialize: (state) => ({
        country_code: state.country_code,
        phoneCode: state.phoneCode,
        totalShopCount: state.totalShopCount,
        isNumberChecked: state.isNumberChecked,
        user: state.user,
        shopId: state.currentShopId,
      }),
    },
  ),
);

export const useUser = () => useCommonStore((state) => state.user);
export const useCurrentNumber = () =>
  useCommonStore((state) => state.currentNumber);

export const useCurrentPhoneCode = () => {
  return useCommonStore((state) => state.phoneCode);
};

export const useShowCountryCodeSelector = () => {
  return useCommonStore((state) => state.showCountryCodeSelector);
};
export const useCurrentPhoneValidator = () => {
  return useCommonStore((state) => state.phoneCode.validator);
};

export const useIsGlobalUser = () => {
  return useCommonStore((state) =>
    state.country_code !== "88" ? true : false,
  );
};
export const useCurrentCountryCode = () => {
  return useCommonStore((state) => state.country_code);
};
export const useTotalShopCount = () => {
  return useCommonStore((state) => state.totalShopCount);
};
export const usePhoneValidator = () => {
  const validator = useCurrentPhoneValidator();
  const isPhoneNumberValid = (value: string) => {
    if (!validator) return true;
    return validatePhoneNumber(value, new RegExp(validator));
  };

  return isPhoneNumberValid;
};

export default useCommonStore;
