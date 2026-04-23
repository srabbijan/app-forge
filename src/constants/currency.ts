import { all_countries } from "./countries";

export const currencies = all_countries.map((country, index) => ({
  id: index + 1,
  name: country.currency,
  currency_bn: country.currency_bn,
  short: country.currency_code,
  country: country.country,
  flag: country.flag_url,
  mobile_code: country.phone_code,
  icon: country.currency_symbol,
}));

export const currency_obj = currencies.reduce(
  (acc, currency) => {
    acc[currency.short.toLowerCase()] = currency.icon;
    return acc;
  },
  {} as Record<string, string>,
);

// console.log(currency_obj);
export type ICurrencyObject = (typeof currencies)[0];
export type ICurrency = keyof typeof currency_obj;

// Phone validation regex patterns by country code (2-character ISO codes)
export const phone_validator = {
  AF: "^7\\d{8}$", // Afghanistan
  AL: "^6[689]\\d{7}$", // Albania
  AM: "^[3-9]\\d{7}$", // Armenia
  AD: "^[36]\\d{5,8}$", // Andorra
  AW: "^[57]\\d{6}$", // Aruba
  AT: "^[1-9]\\d{8,12}$", // Austria
  AG: "^[2457]\\d{9}$", // Antigua and Barbuda
  AO: "^9[1-9]\\d{7}$", // Angola
  AR: "^9\\d{9}$", // Argentina
  AU: "^4\\d{8}$", // Australia
  AZ: "^[4-5]\\d{8}$", // Azerbaijan
  DZ: "^[5-7]\\d{8}$", // Algeria
  BD: "^01[3-9]\\d{8}$", // Bangladesh
  BA: "^6[0-9]\\d{6}$", // Bosnia and Herzegovina
  BG: "^[89]\\d{8}$", // Bulgaria
  BH: "^[3679]\\d{7}$", // Bahrain
  BO: "^[67]\\d{7}$", // Bolivia
  BR: "^[1-9]\\d{9,10}$", // Brazil
  BN: "^[0-9]{7}$", // Brunei
  BT: "^[17]\\d{7}$", // Bhutan
  BW: "^7[1-8]\\d{5}$", // Botswana
  BY: "^[2-4]\\d{8}$", // Belarus
  BZ: "^[2-8]\\d{6}$", // Belize
  BB: "^[2-9]\\d{9}$", // Barbados
  BE: "^4[5-9]\\d{7}$", // Belgium
  BF: "^[67]\\d{7}$", // Burkina Faso
  CM: "^6[5-9]\\d{7}$", // Cameroon
  TD: "^[679]\\d{7}$", // Chad
  CY: "^9[4-9]\\d{6}$", // Cyprus
  CA: "^[2-9]\\d{9}$", // Canada
  CD: "^[89]\\d{8}$", // Democratic Republic of the Congo
  CL: "^9\\d{8}$", // Chile
  CN: "^1[3-9]\\d{9}$", // China
  CO: "^3[0-5]\\d{8}$", // Colombia
  CR: "^[5-8]\\d{7}$", // Costa Rica
  CU: "^5\\d{7}$", // Cuba
  CV: "^[59]\\d{6}$", // Cape Verde
  CZ: "^[6-7]\\d{8}$", // Czech Republic
  HR: "^9[1-8]\\d{7}$", // Croatia
  CF: "^7[0257]\\d{6}$", // Central African Republic
  KH: "^[1-9]\\d{7,8}$", // Cambodia
  KM: "^[3-9]\\d{6}$", // Comoros
  DJ: "^77\\d{6}$", // Djibouti
  DK: "^[2-9]\\d{7}$", // Denmark
  EC: "^9[2-9]\\d{7}$", // Ecuador
  EE: "^[3-9]\\d{6,7}$", // Estonia
  EG: "^1[0-2]\\d{8}$", // Egypt
  ER: "^[78]\\d{6}$", // Eritrea
  ET: "^9\\d{8}$", // Ethiopia
  SV: "^[67]\\d{7}$", // El Salvador
  FI: "^4[0-9]\\d{7,8}$", // Finland
  FR: "^[67]\\d{8}$", // France
  FJ: "^[789]\\d{6}$", // Fiji
  FK: "^[56]\\d{4}$", // Falkland Islands
  DE: "^1[5-7]\\d{8,9}$", // Germany
  GR: "^69\\d{8}$", // Greece
  GL: "^[2-9]\\d{5}$", // Greenland
  GE: "^[57]\\d{8}$", // Georgia
  GH: "^[25]\\d{8}$", // Ghana
  GI: "^[56]\\d{7}$", // Gibraltar
  GM: "^[3-9]\\d{6}$", // Gambia
  GN: "^[67]\\d{8}$", // Guinea
  GT: "^[345]\\d{7}$", // Guatemala
  GY: "^[26]\\d{6}$", // Guyana
  HK: "^[569]\\d{7}$", // Hong Kong
  HN: "^[389]\\d{7}$", // Honduras
  HT: "^[34]\\d{7}$", // Haiti
  HU: "^[237]0\\d{7}$", // Hungary
  IT: "^3[1-9]\\d{7,8}$", // Italy
  ID: "^8\\d{9,10}$", // Indonesia
  IL: "^5[0-9]\\d{7}$", // Israel
  IM: "^7[5-9]\\d{8}$", // Isle of Man
  IN: "^[6-9]\\d{9}$", // India
  IQ: "^7[3-9]\\d{8}$", // Iraq
  IR: "^9\\d{9}$", // Iran
  IS: "^[6-8]\\d{6}$", // Iceland
  JE: "^7[5-9]\\d{8}$", // Jersey
  JO: "^7[789]\\d{7}$", // Jordan
  JP: "^[7-9]0\\d{8}$", // Japan
  KW: "^[569]\\d{7}$", // Kuwait
  KZ: "^7\\d{9}$", // Kazakhstan
  KE: "^7\\d{8}$", // Kenya
  KG: "^[57]\\d{8}$", // Kyrgyzstan
  LA: "^20[2-9]\\d{6,7}$", // Laos
  LB: "^[3-9]\\d{6,7}$", // Lebanon
  LR: "^[4-9]\\d{6,7}$", // Liberia
  LS: "^[56]\\d{7}$", // Lesotho
  LT: "^6\\d{7}$", // Lithuania
  LY: "^9[1-6]\\d{8}$", // Libya
  LV: "^2\\d{7}$", // Latvia
  LI: "^[67]\\d{6}$", // Liechtenstein
  LU: "^6\\d{8}$", // Luxembourg
  MT: "^[79]\\d{7}$", // Malta
  MA: "^[5-7]\\d{8}$", // Morocco
  MD: "^[67]\\d{7}$", // Moldova
  MG: "^3[2-9]\\d{7}$", // Madagascar
  MM: "^9[0-9]\\d{7,8}$", // Myanmar
  MN: "^[89]\\d{7}$", // Mongolia
  MO: "^6\\d{7}$", // Macao
  MR: "^[2-4]\\d{7}$", // Mauritania
  MU: "^5\\d{6,7}$", // Mauritius
  MV: "^[79]\\d{6}$", // Maldives
  MW: "^[18]\\d{8}$", // Malawi
  MX: "^[1-9]\\d{9}$", // Mexico
  MY: "^1[0-9]\\d{7,8}$", // Malaysia
  MZ: "^8[2-7]\\d{7}$", // Mozambique
  NA: "^[68]\\d{7,8}$", // Namibia
  NL: "^6[1-9]\\d{7}$", // Netherlands
  NG: "^[789][01]\\d{8}$", // Nigeria
  NI: "^[578]\\d{7}$", // Nicaragua
  NO: "^[49]\\d{7}$", // Norway
  NP: "^9[78]\\d{8}$", // Nepal
  NZ: "^[2-9]\\d{7,9}$", // New Zealand
  MK: "^7[0-9]\\d{6}$", // North Macedonia
  NE: "^[89]\\d{7}$", // Niger
  RO: "^7[2-8]\\d{7}$", // Romania
  OM: "^[79]\\d{7}$", // Oman
  PS: "^5[69]\\d{7}$", // Palestine
  PE: "^9\\d{8}$", // Peru
  PT: "^9[1236]\\d{7}$", // Portugal
  PA: "^[46]\\d{7}$", // Panama
  PG: "^[7-9]\\d{7}$", // Papua New Guinea
  PH: "^9\\d{9}$", // Philippines
  PK: "^3\\d{9}$", // Pakistan
  PL: "^[4-8]\\d{8}$", // Poland
  PY: "^9[6-9]\\d{7}$", // Paraguay
  QA: "^[3-7]\\d{7}$", // Qatar
  RU: "^9\\d{9}$", // Russia
  RW: "^7[238]\\d{7}$", // Rwanda
  SN: "^7[0678]\\d{7}$", // Senegal
  SK: "^9[0-5]\\d{7}$", // Slovakia
  SI: "^[3-7]\\d{7}$", // Slovenia
  ES: "^[67]\\d{8}$", // Spain
  SA: "^5\\d{8}$", // Saudi Arabia
  SB: "^[7-9]\\d{6}$", // Solomon Islands
  SC: "^[24]\\d{6}$", // Seychelles
  SD: "^9[0-9]\\d{7}$", // Sudan
  SE: "^7[0-9]\\d{7}$", // Sweden
  SG: "^[89]\\d{7}$", // Singapore
  SL: "^[2378]\\d{7}$", // Sierra Leone
  LK: "^7[0-9]\\d{7}$", // Sri Lanka
  SO: "^[67]\\d{7,8}$", // Somalia
  SR: "^[6-8]\\d{6}$", // Suriname
  ST: "^9[89]\\d{5}$", // São Tomé and Príncipe
  CH: "^7[5-9]\\d{7}$", // Switzerland
  SY: "^9[3-9]\\d{7}$", // Syria
  RS: "^6[0-9]\\d{6,8}$", // Serbia
  ZA: "^[1-8]\\d{8}$", // South Africa
  WS: "^[27]\\d{4,6}$", // Samoa
  TG: "^9[0-9]\\d{6}$", // Togo
  TJ: "^[59]\\d{8}$", // Tajikistan
  TM: "^6\\d{7}$", // Turkmenistan
  TN: "^[2-9]\\d{7}$", // Tunisia
  TO: "^[7-9]\\d{4,6}$", // Tonga
  TR: "^5\\d{9}$", // Turkey
  TW: "^9\\d{8}$", // Taiwan
  TZ: "^[67]\\d{8}$", // Tanzania
  TH: "^[689]\\d{8}$", // Thailand
  UG: "^7[0-9]\\d{7}$", // Uganda
  GB: "^7[1-9]\\d{8}$", // United Kingdom
  KP: "^19[123]\\d{7}$", // North Korea
  KR: "^1[0-9]\\d{7,8}$", // South Korea
  UA: "^[3-9]\\d{8}$", // Ukraine
  US: "^[2-9]\\d{9}$", // United States
  UZ: "^9\\d{8}$", // Uzbekistan
  AE: "^5[024568]\\d{7}$", // United Arab Emirates
  VE: "^4[12]\\d{8}$", // Venezuela
  VN: "^[3-9]\\d{8,9}$", // Vietnam
  VU: "^[57]\\d{6}$", // Vanuatu
  YE: "^7[0137]\\d{7}$", // Yemen
  ZM: "^9[567]\\d{7}$", // Zambia
  ZW: "^7[1378]\\d{7}$", // Zimbabwe
} as const;

export const phone_codes = all_countries.map((country, index) => ({
  id: index + 1,
  country: country.country,
  phone_code: country.phone_code,
  flag: country.flag_url,
  code: country.flag_code,
  validator: phone_validator[country.flag_code as keyof typeof phone_validator],
}));

export type IPhoneCode = (typeof phone_codes)[0];

// Function to validate phone number
export const validatePhoneNumber = (
  phoneNumber: string,
  validator: RegExp,
): boolean => {
  const regex = new RegExp(validator);
  return regex.test(phoneNumber);
};

// Improved function to extract maximum phone number length from regex pattern
export const getPhoneMaxLength = (regexPattern: string): number => {
  if (!regexPattern) return 15; // Default fallback

  // For patterns with explicit quantifiers like \d{8}, \d{9,10}
  const quantifierMatch = regexPattern.match(/\\d\{(\d+)(?:,(\d+))?\}/);
  if (quantifierMatch) {
    const minLength = parseInt(quantifierMatch[1]);
    const maxLength = quantifierMatch[2]
      ? parseInt(quantifierMatch[2])
      : minLength;

    // Count prefix digits/character classes before the quantifier
    const beforeQuantifier = regexPattern.substring(
      1,
      regexPattern.indexOf("\\d{"),
    );
    const prefixDigits = (beforeQuantifier.match(/\d|\[[^\]]+\]/g) || [])
      .length;

    return prefixDigits + maxLength;
  }

  // For simpler patterns, count all digit placeholders
  // Remove ^ and $ anchors first
  const pattern = regexPattern.replace(/^\^|\$$/g, "");
  const digitCount = (pattern.match(/\\d|\[[^\]]+\]|\d/g) || []).length;

  return digitCount > 0 ? digitCount : 15; // Fallback to 15 if unable to determine
};
