import useCommonStore from "@/stores/store";

const getToken = async () => {
  const store = await import("@/stores/store");
  // console.log('Token', store.useAuthStore.getState().token);
  return store.useCommonStore.getState().token;
};

export default getToken;

export const getContactCountryCode = (
  formCountryCode: string | undefined,
  user: string | undefined,
) => {
  const phoneCode = useCommonStore.getState().phoneCode;
  if (formCountryCode) {
    return formCountryCode;
  }
  // this case is when user type mobile number without country code
  else if (user && !formCountryCode) {
    return phoneCode?.phone_code;
  } else {
    return "";
  }
};
