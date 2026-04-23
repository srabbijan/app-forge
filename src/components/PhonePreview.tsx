import {
  Bell,
  Heart,
  Home,
  Layers,
  Monitor,
  Search,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sofa,
  User,
  Watch,
} from "lucide-react";

interface PhonePreviewProps {
  appName: string;
  appIcon?: string;
  primaryColor: string; // hsl string e.g. "250 84% 60%"
}

const CATEGORIES = [
  { name: "Electronics", Icon: Smartphone },
  { name: "Fashion", Icon: Shirt },
  { name: "Furniture", Icon: Sofa },
  { name: "Accessories", Icon: Watch },
];

const PRODUCTS = [
  { brand: "BASICS", name: "Classic White Sneakers", price: "$89.00" },
  { brand: "TECHGEAR", name: "Pro Series Smartwatch", price: "$199.99" },
];

const NAV_ITEMS = [
  { label: "Home", Icon: Home },
  { label: "Product", Icon: Layers },
  { label: "Wishlist", Icon: ShoppingCart },
  { label: "Profile", Icon: User },
];

export const PhonePreview = ({ appName, appIcon, primaryColor }: PhonePreviewProps) => {
  const accent = `hsl(${primaryColor})`;

  return (
    <div className="relative">
      {/* Glow behind phone */}
      <div
        className="absolute -inset-10 rounded-full opacity-60 blur-3xl animate-pulse-glow"
        style={{ background: `hsl(${primaryColor} / 0.35)` }}
      />

      {/* Phone frame */}
      <div className="relative mx-auto w-[280px] rounded-[3rem] border-[10px] border-foreground/90 bg-foreground/90 shadow-phone">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-foreground/90" />

        {/* Screen */}
        <div className="relative flex h-[560px] flex-col overflow-hidden rounded-[2.25rem] bg-white">
          {/* ── Top bar ── */}
          <div className="flex items-center justify-between px-4 pb-2 pt-9">
            <div className="flex items-center gap-2">
              <div
                key={appIcon}
                className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl animate-scale-in"
                style={{ background: appIcon ? undefined : accent }}
              >
                {appIcon ? (
                  <img src={appIcon} alt="" className="h-full w-full object-cover" />
                ) : (
                  <ShoppingBag className="h-4 w-4 text-white" />
                )}
              </div>
              <p
                key={appName}
                className="truncate text-sm font-bold text-gray-900 animate-fade-in"
              >
                {appName || "Your App"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-gray-600" />
              {/* <div className="relative">
                <ShoppingCart className="h-4 w-4 text-gray-600" />
                <span
                  className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[7px] font-bold text-white"
                  style={{ background: "hsl(0 80% 55%)" }}
                >
                  2
                </span>
              </div> */}
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto pb-14">
            {/* ── Search bar ── */}
            <div className="px-4 pb-3">
              <div className="flex h-9 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3">
                <Search className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-[10px] text-gray-400">Search products, brands...</span>
              </div>
            </div>

            {/* ── Banner ── */}
            <div className="px-4 pb-4">
              <div
                className="relative overflow-hidden rounded-2xl px-4 py-4"
                style={{
                  background: `linear-gradient(135deg, hsl(${primaryColor} / 0.85), hsl(${primaryColor} / 0.55))`,
                }}
              >
                <p className="text-[8px] font-semibold uppercase tracking-wider text-white/80">
                  New Collection
                </p>
                <p className="mt-0.5 text-sm font-extrabold leading-tight text-white">
                  Summer Vibes
                </p>
                <p className="text-sm font-extrabold leading-tight text-white">Sale 50% Off</p>
                <button
                  className="mt-2 rounded-lg px-3 py-1 text-[9px] font-bold text-white"
                  style={{ background: accent }}
                >
                  Shop Now
                </button>
                {/* decorative image placeholder */}
                <div className="absolute -right-2 bottom-0 top-0 flex w-20 items-center justify-center">
                  <Monitor className="h-10 w-10 text-white/30" />
                </div>
              </div>
            </div>

            {/* ── Categories ── */}
            <div className="px-4 pb-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-gray-900">Categories</p>
                <span className="text-[9px] font-semibold" style={{ color: accent }}>
                  See All
                </span>
              </div>
              <div className="flex gap-3">
                {CATEGORIES.map(({ name, Icon }) => (
                  <div key={name} className="flex flex-col items-center gap-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-100">
                      <Icon className="h-4 w-4" style={{ color: accent }} />
                    </div>
                    <span className="text-[8px] font-medium text-gray-600">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Featured ── */}
            <div className="px-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-gray-900">Featured</p>
                <span className="text-[9px] font-semibold" style={{ color: accent }}>
                  See All
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PRODUCTS.map((product, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                  >
                    {/* Product image placeholder */}
                    <div className="relative aspect-square w-full bg-gray-100">
                      <div
                        className="h-full w-full"
                        style={{
                          background: `linear-gradient(160deg, hsl(${primaryColor} / 0.08), hsl(${primaryColor} / 0.2))`,
                        }}
                      />
                      <button className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
                        <Heart className="h-2.5 w-2.5 text-gray-400" />
                      </button>
                    </div>
                    <div className="p-2">
                      <p className="text-[7px] font-semibold uppercase tracking-wider text-gray-400">
                        {product.brand}
                      </p>
                      <p className="mt-0.5 text-[9px] font-bold leading-tight text-gray-900">
                        {product.name}
                      </p>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-gray-900">
                          {product.price}
                        </span>
                        <div
                          className="flex h-5 w-5 items-center justify-center rounded-lg text-white"
                          style={{ background: accent }}
                        >
                          <span className="text-[10px] font-bold leading-none">+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom nav ── */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-gray-100 bg-white px-2 py-2">
            {NAV_ITEMS.map(({ label, Icon }, i) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <Icon
                  className="h-4 w-4"
                  style={{
                    color: i === 0 ? accent : "#9ca3af",
                  }}
                />
                <span
                  className="text-[7px] font-semibold"
                  style={{
                    color: i === 0 ? accent : "#9ca3af",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
