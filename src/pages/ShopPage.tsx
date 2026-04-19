import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ShopPageProps {
  onBack: () => void;
}

type ActiveTab = "packs" | "players" | "kits" | "coins";
type OpenPhase = "closed" | "opening" | "revealing";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const PACKS = [
  {
    id: "gold",
    name: "Золотой набор",
    desc: "5 карточек · Мин. 1 золотой",
    price: "2,000",
    currency: "coins" as const,
    badge: "ХИТ",
    badgeColor: "bg-green-500 text-black",
    border: "border-yellow-400/50",
    glow: "rgba(251,191,36,0.22)",
    bg: "from-yellow-500/20 via-yellow-900/10 to-transparent",
    iconBg: "rgba(251,191,36,0.12)",
    iconBorder: "rgba(251,191,36,0.4)",
    iconColor: "#fbbf24",
    iconName: "Package",
    cardCount: 5,
  },
  {
    id: "legend",
    name: "Легенда недели",
    desc: "Гарантированная звезда · 1 карточка",
    price: "5,000",
    currency: "coins" as const,
    badge: "ОСОБЫЙ",
    badgeColor: "bg-purple-500 text-white",
    border: "border-purple-400/50",
    glow: "rgba(168,85,247,0.22)",
    bg: "from-purple-600/20 via-purple-900/10 to-transparent",
    iconBg: "rgba(168,85,247,0.12)",
    iconBorder: "rgba(168,85,247,0.4)",
    iconColor: "#a855f7",
    iconName: "Crown",
    rating: "94",
    cardCount: 1,
  },
  {
    id: "premium",
    name: "Премиум пакет",
    desc: "10 карточек · Мин. 3 золотых",
    price: "500",
    currency: "gems" as const,
    badge: "ЛУЧШАЯ СТОИМОСТЬ",
    badgeColor: "bg-blue-500 text-white",
    border: "border-blue-400/50",
    glow: "rgba(59,130,246,0.22)",
    bg: "from-blue-600/20 via-blue-900/10 to-transparent",
    iconBg: "rgba(59,130,246,0.12)",
    iconBorder: "rgba(59,130,246,0.4)",
    iconColor: "#60a5fa",
    iconName: "Gem",
    cardCount: 5,
  },
  {
    id: "kit",
    name: "Набор формы",
    desc: "3 комплекта · Уникальный дизайн",
    price: "800",
    currency: "coins" as const,
    badge: null,
    badgeColor: "",
    border: "border-orange-400/35",
    glow: "rgba(249,115,22,0.15)",
    bg: "from-orange-500/15 via-orange-900/5 to-transparent",
    iconBg: "rgba(249,115,22,0.12)",
    iconBorder: "rgba(249,115,22,0.35)",
    iconColor: "#fb923c",
    iconName: "Shirt",
    cardCount: 5,
  },
];

const COIN_PACKAGES = [
  {
    id: "starter",
    label: "Стартовый",
    coins: "1,500",
    gems: 50,
    price: "149 ₽",
    badge: null,
    badgeColor: "",
    accent: "#22c55e",
  },
  {
    id: "popular",
    label: "Популярный",
    coins: "4,000",
    gems: 150,
    price: "349 ₽",
    badge: "ВЫГОДНО",
    badgeColor: "bg-green-500 text-black",
    accent: "#22c55e",
  },
  {
    id: "pro",
    label: "Профи",
    coins: "10,000",
    gems: 400,
    price: "749 ₽",
    badge: "ЛУЧШИЙ ВЫБОР",
    badgeColor: "bg-[#FFD700] text-black",
    accent: "#FFD700",
  },
];

const REVEALED_CARDS = [
  { name: "Волков",   pos: "ПАП", rating: 87, flag: "🇷🇺", rarity: "gold",    stars: 4, special: false },
  { name: "Промес",   pos: "ЛП",  rating: 84, flag: "🇷🇺", rarity: "silver",  stars: 4, special: false },
  { name: "Тюкавин", pos: "НАП", rating: 79, flag: "🇷🇺", rarity: "bronze",  stars: 3, special: false },
  { name: "Захарян", pos: "ЦП",  rating: 76, flag: "🇷🇺", rarity: "bronze",  stars: 3, special: false },
  { name: "Мирлас",  pos: "ВР",  rating: 92, flag: "🇷🇺", rarity: "special", stars: 5, special: true  },
];

const RARITY_STYLES: Record<string, { bg: string; border: string; ratingColor: string; nameColor: string; glow: string }> = {
  gold: {
    bg: "from-yellow-700 via-yellow-500 to-yellow-600",
    border: "border-yellow-400/60",
    ratingColor: "#FFD700",
    nameColor: "text-yellow-100",
    glow: "rgba(251,191,36,0.25)",
  },
  silver: {
    bg: "from-slate-600 via-slate-400 to-slate-500",
    border: "border-slate-300/50",
    ratingColor: "#e2e8f0",
    nameColor: "text-slate-100",
    glow: "rgba(148,163,184,0.2)",
  },
  bronze: {
    bg: "from-amber-900 via-amber-700 to-amber-800",
    border: "border-amber-600/50",
    ratingColor: "#fbbf24",
    nameColor: "text-amber-100",
    glow: "rgba(180,83,9,0.2)",
  },
  special: {
    bg: "from-purple-900 via-purple-600 to-indigo-700",
    border: "border-purple-300/70",
    ratingColor: "#e879f9",
    nameColor: "text-purple-100",
    glow: "rgba(168,85,247,0.45)",
  },
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function StarDots({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: i < count ? color : "rgba(255,255,255,0.15)" }}
        />
      ))}
    </div>
  );
}

function RevealedCard({ card, index }: { card: (typeof REVEALED_CARDS)[number]; index: number }) {
  const s = RARITY_STYLES[card.rarity];
  return (
    <div
      className="relative overflow-hidden rounded-2xl border flex flex-col items-center pt-4 pb-3 px-2 gap-1"
      style={{
        background: `linear-gradient(160deg, ${s.bg.replace("from-", "").replace(" via-", ", ").replace(" to-", ", ")})`,
        borderColor: s.border.replace("border-", ""),
        boxShadow: card.special
          ? `0 0 30px ${s.glow}, 0 0 60px ${s.glow}`
          : `0 0 16px ${s.glow}`,
        animationDelay: `${index * 120}ms`,
      }}
    >
      {/* Shimmer overlay for special card */}
      {card.special && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-[shimmer_2s_infinite]" />
      )}

      {/* Special badge */}
      {card.special && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <span className="text-[7px] font-['Bebas_Neue'] tracking-[0.15em] bg-purple-400/30 border border-purple-300/40 text-purple-200 px-1.5 py-0.5 rounded-full whitespace-nowrap">
            ОСОБЫЙ
          </span>
        </div>
      )}

      {/* Rating */}
      <div
        className="font-['Bebas_Neue'] text-4xl tracking-wider leading-none mt-3"
        style={{ color: s.ratingColor, textShadow: `0 0 20px ${s.ratingColor}` }}
      >
        {card.rating}
      </div>

      {/* Position pill */}
      <div className="glass rounded-full px-2 py-0.5 border border-white/15">
        <span className="text-white/70 text-[9px] font-['Oswald'] uppercase tracking-widest">{card.pos}</span>
      </div>

      {/* Player silhouette placeholder */}
      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center my-0.5">
        <Icon name="User" size={18} fallback="Circle" className="text-white/30" />
      </div>

      {/* Name */}
      <div className={`text-[11px] font-['Oswald'] tracking-wide font-semibold ${s.nameColor}`}>
        {card.name}
      </div>

      {/* Flag + stars */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs leading-none">{card.flag}</span>
        <StarDots count={card.stars} color={s.ratingColor} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Pack opening screen
// ─────────────────────────────────────────────

function PackOpeningScreen({
  packId,
  phase,
  onTap,
  onAddToClub,
  onSellAll,
  onBackToShop,
}: {
  packId: string;
  phase: OpenPhase;
  onTap: () => void;
  onAddToClub: () => void;
  onSellAll: () => void;
  onBackToShop: () => void;
}) {
  const pack = PACKS.find((p) => p.id === packId);
  if (!pack) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-[#030407]" />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${pack.glow.replace("0.22", "0.35")} 0%, transparent 70%)`,
          animation: phase === "opening" ? "pulse 2s ease-in-out infinite" : "none",
        }}
      />
      {/* Particle lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] bg-gradient-to-b from-transparent to-transparent"
            style={{
              left: `${10 + i * 12}%`,
              top: 0,
              bottom: 0,
              background: `linear-gradient(to bottom, transparent, ${pack.iconColor}30, transparent)`,
              animationDelay: `${i * 200}ms`,
              opacity: phase === "revealing" ? 0 : 0.4,
              transition: "opacity 0.5s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-4">
        {/* Phase: opening */}
        {(phase === "closed" || phase === "opening") && (
          <button
            onClick={onTap}
            className="flex flex-col items-center gap-6 active:scale-95 transition-transform"
          >
            {/* Pack name */}
            <div className="text-center">
              <div className="text-white/40 text-[10px] font-['Oswald'] uppercase tracking-[0.3em] mb-1">
                Открытие набора
              </div>
              <div
                className="font-['Bebas_Neue'] text-3xl tracking-[0.15em]"
                style={{ color: pack.iconColor }}
              >
                {pack.name}
              </div>
            </div>

            {/* Glowing pack card */}
            <div className="relative">
              {/* Outer glow rings */}
              <div
                className="absolute inset-[-20px] rounded-3xl"
                style={{
                  background: `radial-gradient(ellipse at center, ${pack.glow.replace("0.22", "0.5")} 0%, transparent 70%)`,
                  animation: "pulse 1.8s ease-in-out infinite",
                }}
              />
              <div
                className="absolute inset-[-8px] rounded-3xl border opacity-40"
                style={{ borderColor: pack.iconColor, animation: "pulse 2.2s ease-in-out infinite" }}
              />

              {/* Card face */}
              <div
                className={`relative w-44 h-64 rounded-2xl border-2 flex flex-col items-center justify-center gap-4 overflow-hidden`}
                style={{
                  borderColor: pack.iconColor,
                  background: `linear-gradient(135deg, ${pack.iconBg}, rgba(0,0,0,0.8))`,
                  boxShadow: `0 0 40px ${pack.glow}, 0 0 80px ${pack.glow}`,
                }}
              >
                {/* Inner glow */}
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at 50% 30%, ${pack.iconColor}20 0%, transparent 60%)` }}
                />

                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
                  style={{ background: pack.iconBg, border: `2px solid ${pack.iconBorder}` }}
                >
                  {pack.rating ? (
                    <span
                      className="font-['Bebas_Neue'] text-5xl tracking-wider"
                      style={{ color: pack.iconColor, textShadow: `0 0 20px ${pack.iconColor}` }}
                    >
                      {pack.rating}
                    </span>
                  ) : (
                    <Icon name={pack.iconName} size={40} fallback="Circle" style={{ color: pack.iconColor }} />
                  )}
                </div>

                <div className="text-center px-3">
                  <div
                    className="font-['Bebas_Neue'] text-lg tracking-wider leading-none"
                    style={{ color: pack.iconColor }}
                  >
                    {pack.name}
                  </div>
                  <div className="text-white/40 text-[10px] font-['Oswald'] mt-1 uppercase tracking-wider">
                    {pack.desc}
                  </div>
                </div>

                {/* Card count badge */}
                <div
                  className="px-3 py-1 rounded-full text-[10px] font-['Oswald'] uppercase tracking-widest"
                  style={{ background: pack.iconBg, border: `1px solid ${pack.iconBorder}`, color: pack.iconColor }}
                >
                  {pack.cardCount} карточек
                </div>
              </div>
            </div>

            {/* Tap hint */}
            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border"
              style={{ borderColor: `${pack.iconColor}40`, background: `${pack.iconColor}10` }}
            >
              <Icon name="Hand" size={14} fallback="Circle" style={{ color: pack.iconColor }} />
              <span className="text-[11px] font-['Oswald'] uppercase tracking-[0.2em]" style={{ color: pack.iconColor }}>
                Нажми чтобы открыть
              </span>
            </div>
          </button>
        )}

        {/* Phase: revealing */}
        {phase === "revealing" && (
          <div className="w-full flex flex-col items-center gap-5">
            <div className="text-center">
              <div className="text-white/35 text-[10px] font-['Oswald'] uppercase tracking-[0.3em] mb-1">Ваши карточки</div>
              <div className="font-['Bebas_Neue'] text-2xl tracking-[0.15em] text-white">
                {pack.name.toUpperCase()}
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-3 gap-2 w-full">
              {REVEALED_CARDS.slice(0, pack.cardCount === 1 ? 1 : 5).map((card, i) => (
                <RevealedCard key={card.name} card={card} index={i} />
              ))}
            </div>

            {/* Action buttons */}
            <div className="w-full space-y-2.5 mt-1">
              <button
                onClick={onAddToClub}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-black font-['Bebas_Neue'] text-lg tracking-[0.2em] hover:from-green-500 hover:to-green-400 transition-all active:scale-[0.98] shadow-[0_4px_24px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2"
              >
                <Icon name="Plus" size={18} fallback="Circle" />
                ДОБАВИТЬ В КЛУБ
              </button>
              <button
                onClick={onSellAll}
                className="w-full py-3 rounded-xl border border-red-500/40 text-red-400 font-['Bebas_Neue'] text-base tracking-[0.15em] hover:bg-red-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Icon name="Coins" size={16} fallback="Circle" />
                ПРОДАТЬ ВСЁ
              </button>
              <button
                onClick={onBackToShop}
                className="w-full py-2 text-white/35 font-['Oswald'] text-xs uppercase tracking-[0.2em] hover:text-white/60 transition-colors active:scale-[0.98]"
              >
                В Магазин
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Tab: Наборы
// ─────────────────────────────────────────────

function PacksTab({ onOpenPack }: { onOpenPack: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 animate-fade-in">
      {PACKS.map((pack) => (
        <div
          key={pack.id}
          className={`card-hover relative overflow-hidden rounded-2xl border flex flex-col`}
          style={{
            borderColor: pack.border.replace("border-", ""),
            boxShadow: `0 0 28px ${pack.glow}`,
          }}
        >
          {/* Bg gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${pack.bg} pointer-events-none`} />

          <div className="relative flex flex-col flex-1 p-3.5">
            {/* Badge */}
            {pack.badge && (
              <div className="absolute top-3 right-3">
                <span className={`${pack.badgeColor} text-[8px] font-['Bebas_Neue'] tracking-[0.12em] px-1.5 py-0.5 rounded-full`}>
                  {pack.badge}
                </span>
              </div>
            )}

            {/* Icon area — top half */}
            <div
              className="w-full aspect-[4/3] rounded-xl flex items-center justify-center mb-3 relative overflow-hidden"
              style={{ background: pack.iconBg, border: `1px solid ${pack.iconBorder}` }}
            >
              {/* Inner radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at center, ${pack.glow.replace("0.22", "0.5")} 0%, transparent 70%)` }}
              />
              {pack.rating ? (
                <span
                  className="font-['Bebas_Neue'] text-5xl tracking-wider relative z-10"
                  style={{ color: pack.iconColor, textShadow: `0 0 24px ${pack.iconColor}` }}
                >
                  {pack.rating}
                </span>
              ) : (
                <Icon
                  name={pack.iconName}
                  size={44}
                  fallback="Circle"
                  style={{ color: pack.iconColor, filter: `drop-shadow(0 0 12px ${pack.iconColor})` }}
                  className="relative z-10"
                />
              )}
            </div>

            {/* Name */}
            <div className="font-['Bebas_Neue'] text-base tracking-wider text-white leading-none mb-0.5">
              {pack.name}
            </div>

            {/* Desc */}
            <div className="text-white/40 text-[10px] font-['Oswald'] leading-snug mb-3 flex-1">
              {pack.desc}
            </div>

            {/* Price + button */}
            <div className="flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1">
                {pack.currency === "coins" ? (
                  <Icon name="Star" size={11} className="text-yellow-400" fallback="Circle" />
                ) : (
                  <Icon name="Diamond" size={11} className="text-blue-400" fallback="Circle" />
                )}
                <span
                  className={`font-['Bebas_Neue'] text-sm tracking-wider ${
                    pack.currency === "coins" ? "text-yellow-400" : "text-blue-400"
                  }`}
                >
                  {pack.price}
                </span>
              </div>
              <button
                onClick={() => onOpenPack(pack.id)}
                className="px-3 py-1.5 rounded-xl text-[10px] font-['Bebas_Neue'] tracking-[0.12em] text-black transition-all active:scale-95 hover:brightness-110"
                style={{ background: `linear-gradient(135deg, ${pack.iconColor}, ${pack.iconColor}cc)` }}
              >
                ОТКРЫТЬ
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Tab: Монеты
// ─────────────────────────────────────────────

function CoinsTab() {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="ShoppingBag" size={14} className="text-white/30" fallback="Circle" />
        <span className="text-white/35 text-[10px] font-['Oswald'] uppercase tracking-widest">
          Пополнение баланса
        </span>
      </div>

      {COIN_PACKAGES.map((pkg) => (
        <div
          key={pkg.id}
          className="relative glass rounded-2xl border border-white/10 overflow-hidden"
          style={{
            borderColor: pkg.badge === "ЛУЧШИЙ ВЫБОР" ? "rgba(255,215,0,0.3)" : undefined,
            boxShadow: pkg.badge === "ЛУЧШИЙ ВЫБОР" ? "0 0 20px rgba(255,215,0,0.08)" : undefined,
          }}
        >
          {pkg.badge === "ЛУЧШИЙ ВЫБОР" && (
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />
          )}

          <div className="flex items-center gap-4 p-4">
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${pkg.accent}15`, border: `1px solid ${pkg.accent}35` }}
            >
              <Icon name="Coins" size={22} fallback="Circle" style={{ color: pkg.accent }} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-['Oswald'] text-sm tracking-wide">{pkg.label}</span>
                {pkg.badge && (
                  <span className={`${pkg.badgeColor} text-[8px] font-['Bebas_Neue'] tracking-[0.12em] px-1.5 py-0.5 rounded-full`}>
                    {pkg.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={10} className="text-yellow-400" fallback="Circle" />
                  <span className="text-yellow-400 text-[11px] font-['Bebas_Neue'] tracking-wider">{pkg.coins}</span>
                </div>
                <span className="text-white/15">+</span>
                <div className="flex items-center gap-1">
                  <Icon name="Diamond" size={10} className="text-blue-400" fallback="Circle" />
                  <span className="text-blue-400 text-[11px] font-['Bebas_Neue'] tracking-wider">{pkg.gems}</span>
                </div>
              </div>
            </div>

            {/* Price + buy */}
            <div className="text-right shrink-0">
              <div
                className="font-['Bebas_Neue'] text-xl tracking-wider leading-none mb-1.5"
                style={{ color: pkg.accent }}
              >
                {pkg.price}
              </div>
              <button
                className="px-3 py-1.5 rounded-xl text-[9px] font-['Bebas_Neue'] tracking-[0.12em] transition-all active:scale-95 hover:brightness-110 text-black"
                style={{ background: `linear-gradient(135deg, ${pkg.accent}, ${pkg.accent}cc)` }}
              >
                КУПИТЬ
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Promo note */}
      <div className="flex items-start gap-2.5 glass rounded-xl border border-white/8 p-3 mt-4">
        <Icon name="Shield" size={14} className="text-green-400/60 shrink-0 mt-0.5" fallback="Circle" />
        <p className="text-white/25 text-[10px] font-['Oswald'] leading-relaxed">
          Все покупки защищены. Монеты зачисляются мгновенно. Возврат в течение 14 дней.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Placeholder tabs
// ─────────────────────────────────────────────

function PlaceholderTab({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center">
        <Icon name={icon} size={28} className="text-white/20" fallback="Circle" />
      </div>
      <div className="text-center">
        <div className="text-white/20 font-['Bebas_Neue'] text-xl tracking-wider">{label}</div>
        <div className="text-white/15 text-[10px] font-['Oswald'] uppercase tracking-widest mt-1">Скоро</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Root component
// ─────────────────────────────────────────────

export default function ShopPage({ onBack }: ShopPageProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("packs");
  const [openingPack, setOpeningPack] = useState<string | null>(null);
  const [openPhase, setOpenPhase] = useState<OpenPhase>("closed");

  const tabs: { id: ActiveTab; label: string; icon: string }[] = [
    { id: "packs",   label: "Наборы",  icon: "Package" },
    { id: "players", label: "Игроки",  icon: "Users" },
    { id: "kits",    label: "Форма",   icon: "Shirt" },
    { id: "coins",   label: "Монеты",  icon: "Coins" },
  ];

  function handleOpenPack(id: string) {
    setOpeningPack(id);
    setOpenPhase("opening");
  }

  function handleTapPack() {
    if (openPhase === "opening") {
      setOpenPhase("revealing");
    }
  }

  function handleBackToShop() {
    setOpeningPack(null);
    setOpenPhase("closed");
  }

  return (
    <div className="min-h-screen bg-[#080a0e] text-white overflow-y-auto">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-80 rounded-full bg-yellow-500/4 blur-3xl" />
        <div className="absolute bottom-10 -right-10 w-72 h-72 rounded-full bg-blue-500/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-500/3 blur-3xl" />
      </div>

      {/* Pack opening overlay */}
      {openingPack && (
        <PackOpeningScreen
          packId={openingPack}
          phase={openPhase}
          onTap={handleTapPack}
          onAddToClub={handleBackToShop}
          onSellAll={handleBackToShop}
          onBackToShop={handleBackToShop}
        />
      )}

      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-12">
        {/* Top bar */}
        <div className="flex items-center gap-3 pt-6 pb-2 animate-fade-in">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-xl glass border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all active:scale-95"
          >
            <Icon name="ChevronLeft" size={20} fallback="Circle" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-400/20 flex items-center justify-center">
              <Icon name="ShoppingBag" size={15} fallback="Circle" className="text-yellow-400" />
            </div>
            <h1 className="text-2xl font-['Bebas_Neue'] tracking-[0.12em] text-white leading-none">
              МАГАЗИН
            </h1>
          </div>

          {/* Currencies */}
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-yellow-400/20">
              <Icon name="Star" size={12} className="text-yellow-400" fallback="Circle" />
              <span className="text-yellow-400 text-sm font-['Bebas_Neue'] tracking-wider">12,450</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-blue-400/20">
              <Icon name="Diamond" size={12} className="text-blue-400" fallback="Circle" />
              <span className="text-blue-400 text-sm font-['Bebas_Neue'] tracking-wider">340</span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-5 mt-1 animate-fade-in delay-100">
          <p className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest">
            Улучшайте свою команду
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 p-1 glass rounded-2xl border border-white/10 mb-6 animate-fade-in delay-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-xl transition-all font-['Oswald'] text-[9px] uppercase tracking-widest active:scale-95 ${
                activeTab === tab.id
                  ? "bg-white/10 text-white border border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  : "text-white/35 hover:text-white/60"
              }`}
            >
              <Icon name={tab.icon} size={14} fallback="Circle" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Featured banner */}
        {activeTab === "packs" && (
          <div className="mb-5 glass rounded-2xl border border-[#FFD700]/20 overflow-hidden animate-fade-in delay-200">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center shrink-0">
                <Icon name="Zap" size={18} fallback="Circle" className="text-[#FFD700]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-['Bebas_Neue'] text-base tracking-wider text-[#FFD700] leading-none">
                  СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ
                </div>
                <div className="text-white/35 text-[10px] font-['Oswald'] uppercase tracking-widest mt-0.5">
                  Двойные монеты до 30 апреля
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[#FFD700]/60 text-[9px] font-['Oswald'] uppercase tracking-wider">Осталось</div>
                <div className="font-['Bebas_Neue'] text-xl tracking-wider text-[#FFD700] leading-none">11 дней</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab content */}
        <div className="animate-fade-in delay-200">
          {activeTab === "packs"   && <PacksTab onOpenPack={handleOpenPack} />}
          {activeTab === "players" && <PlaceholderTab label="Рынок игроков" icon="Users" />}
          {activeTab === "kits"    && <PlaceholderTab label="Форма и экипировка" icon="Shirt" />}
          {activeTab === "coins"   && <CoinsTab />}
        </div>
      </div>
    </div>
  );
}
