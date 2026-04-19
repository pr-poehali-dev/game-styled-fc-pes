import { useState } from "react";
import Icon from "@/components/ui/icon";

interface PlayerCardProps {
  onBack: () => void;
}

const mainStats = [
  { key: "PAC", label: "PAC", value: 88, color: "#22c55e" },
  { key: "SHO", label: "SHO", value: 85, color: "#f59e0b" },
  { key: "DRI", label: "DRI", value: 82, color: "#60a5fa" },
  { key: "PAS", label: "PAS", value: 79, color: "#a78bfa" },
  { key: "DEF", label: "DEF", value: 45, color: "#f87171" },
  { key: "PHY", label: "PHY", value: 83, color: "#fb923c" },
];

const details = [
  { label: "Полное имя", value: "Алексей Волков" },
  { label: "Возраст", value: "26 лет" },
  { label: "Рост", value: "182 см" },
  { label: "Вес", value: "78 кг" },
  { label: "Национальность", value: "🇷🇺 Россия" },
  { label: "Клуб", value: "ФК Динамо" },
  { label: "Стоимость", value: "€12.5M" },
  { label: "Зарплата", value: "€45K/нед" },
];

const similarPlayers = [
  { name: "САЛАХ", pos: "ПАП", rating: 91, flag: "🇪🇬", accent: "#ef4444" },
  { name: "ВИНИТЕ", pos: "ЛАП", rating: 88, flag: "🇧🇷", accent: "#22c55e" },
  { name: "БЕРНАРДУ", pos: "ЦАП", rating: 87, flag: "🇵🇹", accent: "#f59e0b" },
];

export default function PlayerCard({ onBack }: PlayerCardProps) {
  const [activeTab, setActiveTab] = useState<"info" | "stats">("info");

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white overflow-y-auto">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-yellow-400/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />
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
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-yellow-400/20">
            <Icon name="Star" size={12} className="text-yellow-400" fallback="Circle" />
            <span className="text-yellow-400 text-xs font-['Oswald'] uppercase tracking-widest">
              Золотая карта
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mt-3 mb-5 animate-fade-in delay-100">
          <h1 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white leading-none">
            КАРТОЧКА ИГРОКА
          </h1>
          <p className="text-white/40 text-xs font-['Oswald'] uppercase tracking-widest mt-1">
            Полные данные и характеристики
          </p>
        </div>

        {/* FUT-style Card */}
        <div className="flex justify-center mb-6 animate-fade-in delay-100">
          <div
            className="relative w-52 rounded-2xl overflow-hidden select-none"
            style={{
              background:
                "linear-gradient(145deg, #2a1f00 0%, #5a3e00 25%, #c8860a 50%, #f59e0b 65%, #fbbf24 75%, #d97706 90%, #92400e 100%)",
              boxShadow:
                "0 0 60px rgba(245,158,11,0.4), 0 0 120px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
              padding: "2px",
            }}
          >
            <div
              className="rounded-2xl px-4 pt-4 pb-3"
              style={{
                background:
                  "linear-gradient(160deg, rgba(251,191,36,0.9) 0%, rgba(217,119,6,0.92) 40%, rgba(146,64,14,0.95) 100%)",
              }}
            >
              {/* Top row: rating + position */}
              <div className="flex flex-col items-start mb-1">
                <span
                  className="font-['Bebas_Neue'] text-5xl leading-none text-white"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  87
                </span>
                <span className="font-['Bebas_Neue'] text-base tracking-widest text-white/80 -mt-1">
                  ПАП
                </span>
                <span className="text-xs mt-0.5">🇷🇺</span>
              </div>

              {/* Player silhouette placeholder */}
              <div className="relative h-28 flex items-end justify-center">
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 20%, rgba(146,64,14,0.3) 100%)",
                  }}
                />
                <div
                  className="w-20 h-28 rounded-xl border border-white/10 flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.15)" }}
                >
                  <Icon name="User" size={48} className="text-white/20" fallback="Circle" />
                </div>
              </div>

              {/* Club badge area */}
              <div className="flex items-center justify-center gap-2 my-2">
                <div className="w-7 h-7 rounded-full bg-blue-500/30 border border-blue-400/40 flex items-center justify-center">
                  <Icon name="Shield" size={14} className="text-blue-200" fallback="Circle" />
                </div>
                <div className="h-px flex-1 bg-white/20" />
                <span className="font-['Bebas_Neue'] text-sm tracking-widest text-white/80">
                  ВОЛКОВ
                </span>
                <div className="h-px flex-1 bg-white/20" />
                <div className="w-7 h-7 rounded-full bg-blue-500/30 border border-blue-400/40 flex items-center justify-center">
                  <Icon name="Flag" size={14} className="text-white/60" fallback="Circle" />
                </div>
              </div>

              {/* 6 stats in 2 columns */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-1">
                {mainStats.map((s) => (
                  <div key={s.key} className="flex items-center gap-1.5">
                    <span
                      className="font-['Bebas_Neue'] text-base leading-none"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </span>
                    <span className="font-['Oswald'] text-[10px] font-bold uppercase tracking-wider text-white/60">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 glass border border-white/10 rounded-xl mb-5 animate-fade-in delay-200">
          {(["info", "stats"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-1 py-2 rounded-lg font-['Oswald'] text-xs uppercase tracking-widest transition-all ${
                activeTab === t
                  ? "bg-yellow-500/80 text-black font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {t === "info" ? "Данные" : "Атрибуты"}
            </button>
          ))}
        </div>

        {activeTab === "info" && (
          <>
            {/* Player Details */}
            <div className="glass border border-white/10 rounded-xl overflow-hidden mb-5 animate-fade-in delay-200">
              <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                <Icon name="User" size={13} className="text-white/40" fallback="Circle" />
                <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
                  Профиль игрока
                </span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/10">
                {details.map((d, i) => (
                  <div
                    key={d.label}
                    className={`px-4 py-3 ${i % 2 !== 0 ? "" : ""} ${i < details.length - 2 ? "border-b border-white/10" : ""}`}
                  >
                    <div className="text-white/40 text-[10px] font-['Oswald'] uppercase tracking-widest mb-0.5">
                      {d.label}
                    </div>
                    <div className="text-white text-sm font-['Oswald'] font-semibold">
                      {d.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="glass border border-white/10 rounded-xl p-4 mb-5 animate-fade-in delay-200">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Sparkles" size={13} className="text-white/40" fallback="Circle" />
                <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
                  Навыки
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Финты", stars: 4, icon: "Footprints" },
                  { label: "Слабая нога", stars: 4, icon: "Star" },
                ].map((skill) => (
                  <div key={skill.label} className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                      <Icon name={skill.icon} size={13} className="text-yellow-400" fallback="Circle" />
                      <span className="text-white/60 text-xs font-['Oswald'] uppercase tracking-wide">
                        {skill.label}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div
                          key={s}
                          className={`w-6 h-2 rounded-sm transition-all ${
                            s <= skill.stars
                              ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "stats" && (
          <div className="glass border border-white/10 rounded-xl p-4 mb-5 animate-fade-in delay-200">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Activity" size={13} className="text-white/40" fallback="Circle" />
              <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
                Основные атрибуты
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {mainStats.map((s) => (
                <div key={s.key} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
                      {s.label}
                    </span>
                    <span
                      className="font-['Bebas_Neue'] text-base tracking-wider"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </span>
                  </div>
                  <div className="stat-bar">
                    <div
                      className="stat-bar-fill"
                      style={{
                        width: `${s.value}%`,
                        background: `linear-gradient(90deg, ${s.color}99, ${s.color})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Players */}
        <div className="animate-fade-in delay-300">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Users" size={14} className="text-white/40" fallback="Circle" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              Похожие игроки
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {similarPlayers.map((p) => (
              <div
                key={p.name}
                className="card-hover glass border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
              >
                {/* Mini card top */}
                <div
                  className="px-3 pt-3 pb-2 flex flex-col items-center"
                  style={{
                    background: `linear-gradient(145deg, ${p.accent}30, ${p.accent}10)`,
                    borderBottom: `1px solid ${p.accent}25`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
                    style={{ background: `${p.accent}25`, border: `1px solid ${p.accent}40` }}
                  >
                    <Icon name="User" size={20} fallback="Circle" style={{ color: p.accent }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="font-['Bebas_Neue'] text-xl leading-none"
                      style={{ color: p.accent }}
                    >
                      {p.rating}
                    </span>
                    <span className="text-[10px]">{p.flag}</span>
                  </div>
                </div>
                {/* Name + position */}
                <div className="px-2 py-2 text-center">
                  <div className="font-['Bebas_Neue'] text-sm tracking-wider text-white leading-none truncate">
                    {p.name}
                  </div>
                  <div className="text-white/40 text-[10px] font-['Oswald'] uppercase tracking-wide mt-0.5">
                    {p.pos}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
