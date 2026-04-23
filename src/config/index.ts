export const config = {
  baseURL: "https://app.hishabee.business/api/V2",
  internationalBaseURL: "https://global.hishabee.business/api/V2",
  baseURLPayment: "https://payment.hishabee.business/api",
  onlineShopAdmin: "https://hishabee-market.netlify.app",
  admin_api_url_v3: "https://app.hishabee.business/api/V3",
  internationalAdmin_api_url_v3: "https://global.hishabee.business/api/V3",
};

export const axiosConfig = {
  timeout: 50000,
  withCredentials: true,
  maxRedirects: 5,
  maxContentLength: 10000,
  maxBodyLength: 10000,
  validateStatus: (status: number) => status >= 200 && status < 300,
  maxRetries: 3,
  retryDelay: 1000,
};
