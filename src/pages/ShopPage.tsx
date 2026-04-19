import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ShopPageProps {
  onBack: () => void;
}

const tabs = ["Наборы", "Игроки", "Форма", "Монеты"] as const;
type Tab = (typeof tabs)[number];

const packs = [
  {
    id: 1,
    name: "Золотой набор",
    desc: "5 золотых игроков",
    price: 2000,
    currency: "coins",
    rating: null,
    badge: "ПОПУЛЯРНЫЙ",
    badgeColor: "bg-green-500 text-black",
    borderClass: "border-yellow-400/40",
    glowColor: "rgba(234,179,8,0.15)",
    iconName: "Package",
    iconColor: "#f59e0b",
    bgGrad: "from-yellow-500/15 to-yellow-900/5",
    stars: null,
  },
  {
    id: 2,
    name: "Легенда недели",
    desc: "Специальный игрок",
    price: 5000,
    currency: "coins",
    rating: 94,
    badge: "ЛЕГЕНДА",
    badgeColor: "bg-yellow-400 text-black",
    borderClass: "border-yellow-300/60",
    glowColor: "rgba(250,204,21,0.25)",
    iconName: "Crown",
    iconColor: "#fbbf24",
    bgGrad: "from-yellow-400/20 to-amber-900/10",
    stars: null,
  },
  {
    id: 3,
    name: "Премиум пакет",
    desc: "10 случайных карт",
    price: 500,
    currency: "gems",
    rating: null,
    badge: "ПРЕМИУМ",
    badgeColor: "bg-blue-500 text-white",
    borderClass: "border-blue-400/40",
    glowColor: "rgba(59,130,246,0.15)",
    iconName: "Gem",
    iconColor: "#60a5fa",
    bgGrad: "from-blue-500/15 to-blue-900/5",
    stars: null,
  },
  {
    id: 4,
    name: "Комплект формы",
    desc: "3 комплекта формы",
    price: 800,
    currency: "coins",
    rating: null,
    badge: null,
    badgeColor: "",
    borderClass: "border-white/10",
    glowColor: "transparent",
    iconName: "Shirt",
    iconColor: "#a78bfa",
    bgGrad: "from-purple-500/10 to-purple-900/5",
    stars: null,
  },
];

const moneyPackages = [
  { coins: 1000, gems: 0, price: "150 руб", popular: false },
  { coins: 5000, gems: 100, price: "350 руб", popular: true },
  { coins: 12000, gems: 300, price: "750 руб", popular: false },
];

export default function ShopPage({ onBack }: ShopPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Наборы");
  const [purchased, setPurchased] = useState<Set<number>>(new Set());

  const handleBuy = (id: number) => {
    setPurchased((prev) => new Set([...prev, id]));
    setTimeout(() => {
      setPurchased((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white overflow-y-auto">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-72 rounded-full bg-yellow-400/5 blur-3xl" />
        <div className="absolute bottom-10 -right-10 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-10">
        {/* Top bar */}
        <div className="flex items-center gap-3 pt-6 pb-2 animate-fade-in">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg glass border border-white/10 text-white/70 hover:text-white hover:border-white/25 transition-all active:scale-95"
          >
            <Icon name="ChevronLeft" size={20} fallback="Circle" />
          </button>
          {/* Currency balances */}
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-yellow-400/20">
              <Icon name="Coins" size={13} className="text-yellow-400" fallback="Circle" />
              <span className="text-yellow-400 text-sm font-['Bebas_Neue'] tracking-wider">
                12,450
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-blue-400/20">
              <Icon name="Gem" size={13} className="text-blue-400" fallback="Circle" />
              <span className="text-blue-400 text-sm font-['Bebas_Neue'] tracking-wider">
                340
              </span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mt-3 mb-5 animate-fade-in delay-100">
          <h1 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white leading-none">
            МАГАЗИН
          </h1>
          <p className="text-white/40 text-xs font-['Oswald'] uppercase tracking-widest mt-1">
            Улучшайте свою команду
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 p-1 glass border border-white/10 rounded-xl animate-fade-in delay-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg font-['Oswald'] text-xs uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-green-500 text-black font-semibold shadow-lg shadow-green-500/20"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Pack Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 animate-fade-in delay-200">
          {packs.map((pack) => {
            const isBought = purchased.has(pack.id);
            return (
              <div
                key={pack.id}
                className={`card-hover relative overflow-hidden rounded-xl glass border ${pack.borderClass} flex flex-col`}
                style={{ boxShadow: `0 0 24px ${pack.glowColor}` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pack.bgGrad} pointer-events-none`}
                />
                <div className="relative p-4 flex flex-col flex-1">
                  {/* Badge */}
                  {pack.badge && (
                    <div className="absolute top-3 right-3">
                      <span
                        className={`${pack.badgeColor} text-[9px] font-['Oswald'] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded`}
                      >
                        {pack.badge}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: `${pack.iconColor}20`,
                      border: `1px solid ${pack.iconColor}40`,
                    }}
                  >
                    {pack.rating ? (
                      <span className="font-['Bebas_Neue'] text-2xl" style={{ color: pack.iconColor }}>
                        {pack.rating}
                      </span>
                    ) : (
                      <Icon
                        name={pack.iconName}
                        size={22}
                        fallback="Circle"
                        style={{ color: pack.iconColor }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="font-['Bebas_Neue'] text-lg tracking-wider text-white leading-none mb-1">
                    {pack.name}
                  </div>
                  <div className="text-white/50 text-xs font-['Oswald'] mb-auto pb-3">
                    {pack.desc}
                  </div>

                  {/* Price + Buy */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      {pack.currency === "coins" ? (
                        <Icon name="Coins" size={12} className="text-yellow-400" fallback="Circle" />
                      ) : (
                        <Icon name="Gem" size={12} className="text-blue-400" fallback="Circle" />
                      )}
                      <span
                        className={`font-['Bebas_Neue'] text-base tracking-wider ${pack.currency === "coins" ? "text-yellow-400" : "text-blue-400"}`}
                      >
                        {pack.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleBuy(pack.id)}
                      className={`px-3 py-1.5 rounded-lg font-['Oswald'] text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 ${
                        isBought
                          ? "bg-green-500/20 border border-green-500/40 text-green-400"
                          : "bg-white/10 border border-white/15 text-white hover:bg-white/15"
                      }`}
                    >
                      {isBought ? (
                        <span className="flex items-center gap-1">
                          <Icon name="Check" size={11} fallback="Circle" />
                          OK
                        </span>
                      ) : (
                        "Купить"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buy Coins Section */}
        <div className="animate-fade-in delay-300">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="CreditCard" size={14} className="text-white/40" fallback="Circle" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              Купить монеты
            </span>
          </div>
          <div className="glass border border-white/10 rounded-xl overflow-hidden divide-y divide-white/10">
            {moneyPackages.map((pkg, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-4 py-3.5 hover:bg-white/3 transition-colors relative ${pkg.popular ? "bg-green-500/5" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-green-500 text-black text-[9px] font-['Oswald'] font-bold uppercase tracking-widest px-2 py-0.5 rounded-bl">
                      Лучшее
                    </div>
                  </div>
                )}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${pkg.popular ? "bg-green-500/20 border border-green-500/30" : "bg-yellow-400/10 border border-yellow-400/20"}`}
                >
                  <Icon
                    name="Coins"
                    size={18}
                    className={pkg.popular ? "text-green-400" : "text-yellow-400"}
                    fallback="Circle"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-['Bebas_Neue'] text-lg text-yellow-400 tracking-wider">
                      {pkg.coins.toLocaleString()}
                    </span>
                    <span className="text-yellow-400/60 text-xs font-['Oswald'] uppercase">
                      монет
                    </span>
                    {pkg.gems > 0 && (
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-400/25">
                        <Icon name="Gem" size={9} className="text-blue-400" fallback="Circle" />
                        <span className="text-blue-400 text-[10px] font-['Bebas_Neue'] tracking-wider">
                          +{pkg.gems}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className={`shrink-0 px-4 py-2 rounded-lg font-['Bebas_Neue'] text-base tracking-wider transition-all active:scale-95 ${
                    pkg.popular
                      ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                      : "glass border border-white/15 text-white hover:border-white/30"
                  }`}
                >
                  {pkg.price}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
