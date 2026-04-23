export interface IUser {
  id: number;
  user_type: string;
  name: string;
  brand_name: string;
  email: string;
  email_verified_at: string;
  verified_at: string;
  owner_name: string | null;
  mobile_number: string;
  website: string | null;
  logo_url: string | null;
  avatar: string;
  avatar_original: string | null;
  address: string;
  postal_code: string | null;
  balance: number;
  referral_code: string | null;
  customer_package_id: string | null;
  remaining_uploads: number;
  interest: string | null;
  verification_code: string | null;
  created_at: string;
  updated_at: string;
  trade_license: string | null;
  tin: string | null;
  nid_verified: number;
  nid_number: string;
  birthday: string;
  gender: string;
  verified_by: string | null;
  app_version: string;
  device_model: string;
  locked: number;
  locked_for: string;
  country_code: string | null;
}

export interface IGeoInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
  readme: string;
}
