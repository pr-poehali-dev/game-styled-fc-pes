import { useState } from "react";
import Icon from "@/components/ui/icon";

interface PlayerCardProps {
  onBack: () => void;
}

type ActiveTab = "profile" | "attrs";
type CardVariant = "bronze" | "silver" | "gold";

// ─────────────────────────────────────────────
// Card gradient configs
// ─────────────────────────────────────────────

const CARD_GRADIENTS: Record<CardVariant, { bg: string; glow: string; shine: string; textColor: string; avatarColor: string }> = {
  gold: {
    bg: "linear-gradient(145deg, #c9a227 0%, #f0d060 30%, #c9a227 60%, #8b6914 100%)",
    glow: "0 0 40px rgba(201,162,39,0.6), 0 0 80px rgba(201,162,39,0.2)",
    shine: "rgba(255,240,150,0.18)",
    textColor: "#1a0e00",
    avatarColor: "#f0d060",
  },
  silver: {
    bg: "linear-gradient(145deg, #9ca3af 0%, #e5e7eb 30%, #9ca3af 60%, #4b5563 100%)",
    glow: "0 0 40px rgba(156,163,175,0.5), 0 0 80px rgba(156,163,175,0.15)",
    shine: "rgba(255,255,255,0.2)",
    textColor: "#1a1f2e",
    avatarColor: "#e5e7eb",
  },
  bronze: {
    bg: "linear-gradient(145deg, #cd7f32 0%, #e8a96a 30%, #cd7f32 60%, #7d4e1a 100%)",
    glow: "0 0 40px rgba(205,127,50,0.55), 0 0 80px rgba(205,127,50,0.18)",
    shine: "rgba(255,200,120,0.18)",
    textColor: "#1a0800",
    avatarColor: "#e8a96a",
  },
};

const VARIANT_LABELS: Record<CardVariant, string> = {
  bronze: "Бронзовая",
  silver: "Серебряная",
  gold:   "Золотая",
};

const VARIANT_BUTTON_COLORS: Record<CardVariant, string> = {
  bronze: "border-amber-600/60 text-amber-400 bg-amber-900/15",
  silver: "border-slate-400/60 text-slate-300 bg-slate-700/15",
  gold:   "border-yellow-400/60 text-yellow-400 bg-yellow-900/15",
};

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const CARD_STATS = [
  { key: "PAC", value: 88 },
  { key: "SHO", value: 85 },
  { key: "DRI", value: 82 },
  { key: "PAS", value: 79 },
  { key: "DEF", value: 45 },
  { key: "PHY", value: 83 },
];

const PROFILE_DETAILS = [
  { label: "Имя",            value: "Алексей Волков" },
  { label: "Возраст",        value: "26 лет"          },
  { label: "Рост",           value: "182 см"          },
  { label: "Вес",            value: "78 кг"           },
  { label: "Национальность", value: "🇷🇺 Россия"       },
  { label: "Клуб",           value: "ФК Динамо"       },
  { label: "Стоимость",      value: "€12.5M"          },
  { label: "Зарплата",       value: "€45K/нед"        },
];

const SIMILAR_PLAYERS = [
  { name: "САЛАХ",    pos: "ПАП", rating: 91, flag: "🇪🇬", ratingColor: "#ef4444" },
  { name: "ВИНИТЕ",  pos: "ЛАП", rating: 88, flag: "🇧🇷", ratingColor: "#22c55e" },
  { name: "БЕРНАРДУ",pos: "ЦАП", rating: 87, flag: "🇵🇹", ratingColor: "#f59e0b" },
];

interface AttrGroup {
  key: string;
  label: string;
  value: number;
  color: string;
  subs: { label: string; value: number }[];
}

const ATTR_GROUPS: AttrGroup[] = [
  {
    key: "PAC", label: "Скорость",    value: 88, color: "#22c55e",
    subs: [
      { label: "Ускорение", value: 91 },
      { label: "Спринт",    value: 86 },
    ],
  },
  {
    key: "SHO", label: "Удар",        value: 85, color: "#f59e0b",
    subs: [
      { label: "Удар",         value: 87 },
      { label: "Удар с хода",  value: 83 },
      { label: "Пенальти",     value: 82 },
      { label: "Эффект",       value: 88 },
    ],
  },
  {
    key: "DRI", label: "Дриблинг",   value: 82, color: "#60a5fa",
    subs: [
      { label: "Ловкость",  value: 85 },
      { label: "Баланс",    value: 80 },
      { label: "Реакция",   value: 84 },
    ],
  },
  {
    key: "PAS", label: "Пас",         value: 79, color: "#a78bfa",
    subs: [
      { label: "Короткий пас", value: 82 },
      { label: "Длинный пас",  value: 76 },
      { label: "Навес",        value: 77 },
    ],
  },
  {
    key: "DEF", label: "Защита",      value: 45, color: "#f87171",
    subs: [
      { label: "Отбор",       value: 42 },
      { label: "Перехват",    value: 48 },
    ],
  },
  {
    key: "PHY", label: "Физика",      value: 83, color: "#fb923c",
    subs: [
      { label: "Выносливость", value: 85 },
      { label: "Сила",         value: 79 },
      { label: "Прыжок",       value: 81 },
    ],
  },
];

// ─────────────────────────────────────────────
// FUT Card Component
// ─────────────────────────────────────────────

function FUTCard({ variant }: { variant: CardVariant }) {
  const cfg = CARD_GRADIENTS[variant];

  return (
    <div
      className="w-56 h-80 mx-auto relative rounded-2xl overflow-hidden select-none"
      style={{ background: cfg.bg, boxShadow: cfg.glow }}
    >
      {/* Diagonal shine overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(125deg, ${cfg.shine} 0%, transparent 45%, ${cfg.shine} 100%)`,
        }}
      />

      {/* Inner content */}
      <div className="relative z-10 h-full flex flex-col px-4 pt-3.5 pb-3">
        {/* Top row: rating+pos LEFT, flag+club RIGHT */}
        <div className="flex items-start justify-between mb-1">
          {/* Rating + position */}
          <div className="flex flex-col items-start leading-none">
            <span
              className="font-['Bebas_Neue'] text-5xl font-black leading-none"
              style={{ color: cfg.textColor, textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}
            >
              87
            </span>
            <span
              className="font-['Bebas_Neue'] text-sm tracking-[0.1em] -mt-1"
              style={{ color: `${cfg.textColor}99` }}
            >
              ПАП
            </span>
          </div>

          {/* Flag + club */}
          <div className="flex flex-col items-center gap-1 mt-0.5">
            <span className="text-xl leading-none">🇷🇺</span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center border"
              style={{
                background: "rgba(0,0,80,0.3)",
                borderColor: `${cfg.textColor}30`,
              }}
            >
              <Icon name="Shield" size={14} fallback="Circle" style={{ color: `${cfg.textColor}cc` }} />
            </div>
          </div>
        </div>

        {/* Avatar circle */}
        <div className="flex-1 flex items-center justify-center my-1">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center relative overflow-hidden"
            style={{
              background: "radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)",
              border: `2px solid ${cfg.textColor}40`,
              boxShadow: `inset 0 0 20px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Subtle inner glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: `radial-gradient(circle at 40% 35%, ${cfg.shine} 0%, transparent 65%)` }}
            />
            <span
              className="font-['Bebas_Neue'] text-3xl tracking-wider relative z-10"
              style={{ color: cfg.avatarColor }}
            >
              АВ
            </span>
          </div>
        </div>

        {/* Name divider */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-[1px]" style={{ background: `${cfg.textColor}30` }} />
          <span
            className="font-['Bebas_Neue'] text-xl tracking-[0.15em]"
            style={{ color: cfg.textColor, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
          >
            ВОЛКОВ
          </span>
          <div className="flex-1 h-[1px]" style={{ background: `${cfg.textColor}30` }} />
        </div>

        {/* 6 stats — 2 columns */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
          {CARD_STATS.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span
                className="font-['Bebas_Neue'] text-base leading-none font-black"
                style={{ color: cfg.textColor }}
              >
                {s.value}
              </span>
              <span
                className="font-['Oswald'] text-[9px] font-bold uppercase tracking-wider"
                style={{ color: `${cfg.textColor}70` }}
              >
                {s.key}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Stars row
// ─────────────────────────────────────────────

function SkillStars({ label, filled, total = 5 }: { label: string; filled: number; total?: number }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/8 last:border-0">
      <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">{label}</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`text-base leading-none ${i < filled ? "text-yellow-400" : "text-white/15"}`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Profile tab
// ─────────────────────────────────────────────

function ProfileTab() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Details grid */}
      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
          <Icon name="User" size={12} className="text-white/30" fallback="Circle" />
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest">Профиль игрока</span>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white/8">
          {PROFILE_DETAILS.map((d, i) => (
            <div
              key={d.label}
              className={`px-4 py-3 ${i < PROFILE_DETAILS.length - 2 ? "border-b border-white/8" : ""}`}
            >
              <div className="text-white/30 text-[9px] font-['Oswald'] uppercase tracking-widest mb-0.5">
                {d.label}
              </div>
              <div className="text-white text-xs font-['Oswald'] font-semibold tracking-wide">
                {d.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill stars */}
      <div className="glass rounded-2xl border border-white/10 px-4 py-1">
        <SkillStars label="Финты"      filled={4} />
        <SkillStars label="Слабая нога" filled={4} />
      </div>

      {/* Similar players */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Users" size={12} className="text-white/30" fallback="Circle" />
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest">Похожие игроки</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {SIMILAR_PLAYERS.map((p) => (
            <div
              key={p.name}
              className="card-hover glass rounded-2xl border border-white/10 p-3 flex flex-col items-center gap-1.5 text-center"
            >
              {/* Mini avatar */}
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon name="User" size={18} className="text-white/25" fallback="Circle" />
              </div>
              {/* Rating */}
              <div
                className="font-['Bebas_Neue'] text-2xl tracking-wider leading-none"
                style={{ color: p.ratingColor, textShadow: `0 0 12px ${p.ratingColor}60` }}
              >
                {p.rating}
              </div>
              {/* Name */}
              <div className="text-white/80 text-[10px] font-['Bebas_Neue'] tracking-wider leading-tight">
                {p.name}
              </div>
              {/* Pos + flag */}
              <div className="flex items-center gap-1">
                <span className="text-white/35 text-[9px] font-['Oswald'] uppercase">{p.pos}</span>
                <span className="text-xs leading-none">{p.flag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Attributes tab
// ─────────────────────────────────────────────

function AttrsTab() {
  return (
    <div className="space-y-3 animate-fade-in">
      {ATTR_GROUPS.map((group) => (
        <div
          key={group.key}
          className="glass rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Main stat header */}
          <div className="px-4 pt-3.5 pb-2">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="font-['Bebas_Neue'] text-xs tracking-[0.12em]"
                  style={{ color: group.color }}
                >
                  {group.key}
                </span>
                <span className="text-white/50 text-xs font-['Oswald'] tracking-wide">{group.label}</span>
              </div>
              <span
                className="font-['Bebas_Neue'] text-2xl tracking-wider leading-none"
                style={{ color: group.color, textShadow: `0 0 10px ${group.color}60` }}
              >
                {group.value}
              </span>
            </div>
            {/* Main bar */}
            <div className="stat-bar">
              <div
                className="stat-bar-fill rounded-full"
                style={{
                  width: `${group.value}%`,
                  background: group.color,
                  boxShadow: `0 0 8px ${group.color}60`,
                }}
              />
            </div>
          </div>

          {/* Sub-stats */}
          {group.subs.length > 0 && (
            <div className="border-t border-white/[0.06] px-4 py-2 space-y-2 bg-white/[0.015]">
              {group.subs.map((sub) => (
                <div key={sub.label} className="flex items-center gap-3 pl-3">
                  <div className="w-1 h-1 rounded-full shrink-0" style={{ background: `${group.color}60` }} />
                  <span className="text-white/35 text-[10px] font-['Oswald'] uppercase tracking-wider flex-1">
                    {sub.label}
                  </span>
                  <span
                    className="font-['Bebas_Neue'] text-sm tracking-wider shrink-0"
                    style={{ color: `${group.color}cc` }}
                  >
                    {sub.value}
                  </span>
                  {/* Thin sub bar */}
                  <div className="w-20 h-1 rounded-full bg-white/8 overflow-hidden shrink-0">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${sub.value}%`, background: `${group.color}80` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────

export default function PlayerCard({ onBack }: PlayerCardProps) {
  const [activeTab, setActiveTab]     = useState<ActiveTab>("profile");
  const [cardVariant, setCardVariant] = useState<CardVariant>("gold");

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: "profile", label: "Профиль"   },
    { id: "attrs",   label: "Атрибуты" },
  ];

  return (
    <div className="min-h-screen bg-[#080a0e] text-white overflow-y-auto">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-72 rounded-full bg-yellow-500/6 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-green-500/4 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-blue-500/4 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-12">
        {/* Top bar */}
        <div className="flex items-center gap-3 pt-6 pb-4 animate-fade-in">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-xl glass border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all active:scale-95"
          >
            <Icon name="ChevronLeft" size={20} fallback="Circle" />
          </button>

          <div>
            <h1 className="text-2xl font-['Bebas_Neue'] tracking-[0.12em] text-white leading-none">
              КАРТОЧКА ИГРОКА
            </h1>
            <p className="text-white/25 text-[9px] font-['Oswald'] uppercase tracking-widest leading-none mt-0.5">
              Полные данные и характеристики
            </p>
          </div>

          {/* Gold card badge */}
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-yellow-400/30 bg-yellow-500/5">
            <Icon name="Star" size={11} className="text-yellow-400" fallback="Circle" />
            <span className="text-yellow-400 text-[10px] font-['Oswald'] uppercase tracking-widest">
              Золотая карта
            </span>
          </div>
        </div>

        {/* FUT Card */}
        <div className="py-4 animate-fade-in delay-100">
          <FUTCard variant={cardVariant} />
        </div>

        {/* Card variant selector */}
        <div className="flex gap-2 justify-center mb-6 animate-fade-in delay-200">
          {(["bronze", "silver", "gold"] as CardVariant[]).map((v) => {
            const isActive = cardVariant === v;
            return (
              <button
                key={v}
                onClick={() => setCardVariant(v)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border font-['Oswald'] text-xs uppercase tracking-widest transition-all active:scale-95 ${
                  isActive
                    ? VARIANT_BUTTON_COLORS[v]
                    : "glass border-white/10 text-white/30 hover:text-white/60 hover:border-white/20"
                }`}
                style={
                  isActive
                    ? { boxShadow: `0 0 14px ${CARD_GRADIENTS[v].glow.split(",")[0].replace("0 0 40px ", "")}` }
                    : undefined
                }
              >
                {VARIANT_LABELS[v]}
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
              </button>
            );
          })}
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 p-1 glass rounded-2xl border border-white/10 mb-5 animate-fade-in delay-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-xl font-['Oswald'] text-xs uppercase tracking-widest transition-all active:scale-95 ${
                activeTab === tab.id
                  ? "bg-[#FFD700]/80 text-black font-semibold shadow-[0_2px_12px_rgba(255,215,0,0.3)]"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-fade-in delay-300">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "attrs"   && <AttrsTab />}
        </div>
      </div>
    </div>
  );
}