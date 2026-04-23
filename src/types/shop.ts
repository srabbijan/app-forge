export interface IShop {
  id: number;
  name: string;
  address: string;
  active: number;
  sms_count: number;
  package: string;
  slug: string;
  subscription: {
    id: number;
    package: string;
    end_date: string;
    plus_package: string;
  };
  logo_url: string;
  public_number: string;
  public: boolean;
  facebook: string | null;
  tiktok: string | null;
  instagram: string | null;
  youtube: string | null;
  user_id: number;
  user: {
    mobile_number: string;
  };
  end_date: string;
  pricing_strategy: string | null;
  area: number;
  type: number;
  features: string[] | null;
  api_credit: number;
  due_reminder_credit: number;
  currency: string | null;
  shop_activation: number | null;
}

export interface IArea {
  id: number;
  name: string;
  bn_name: string;
  district_id: number;
}

export interface IDistrcits {
  name: string;
  id: number;
  division_id: number;
  areas: IArea[];
}

export interface IAllArea {
  name: string;
  id: number;
  districts: IDistrcits[];
}

export interface IShopTypes {
  id: number;
  name: string;
  bn_name: string;
}

export interface shopPayload {
  name: string;
  type: number;
  address: string;
  area: number;
  publicData?: number;
  shopId?: number;
  number?: string;
  shop_image?: string;
  logo_url?: string;
}

export type OverviewDef = {
  name: string;
  slug: string;
  address: string;
  active_order: number;
  online_product: number;
  total_earning: number;
  processing_orders: number;
  delivered_orders: number;
  logo_url?: string;
};

export type ShopDef = OverviewDef & {
  public_number: string;
  type: number;
  area: number;
};

export type GetShopInfoDataDef = {
  overview: OverviewDef;
  shop: ShopDef;
};

export interface IGetShopInfoResponse {
  data: GetShopInfoDataDef;
}

export type IOverviewOtherDef = {
  id: number;
  img: string;
  title: string;
  url: string;
  width?: number;
  height?: number;
};

export interface IShopMain {
  id: number;
  address: string;
  logo_url: string | null;
  name: string;
  number: string;
  sms_count: number;
  subscription: string;
  end_date: string;
  slug: string;
  features: string[] | null;
  ai_credit: number;
  due_remainder_minutes: number;
  currency: string | null;
  user_id: number | null;
  shop_activation: number | null;
}

export interface IShopUsage {
  purchase: number;
  sell: number;
  expense: number;
  expense_category: number;
  due: number;
  product_list: number;
  customer: number;
  supplier: number;
  employee: number;
}

export interface ISummary {
  total_purchase: number;
  total_sell: number;
  lend: number;
  due: number;
  expense: number;
  income: number;
  total_stock: number;
  total_stock_price: number;
}
