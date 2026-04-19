import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LeaguesPageProps {
  onBack: () => void;
}

const categories = ["Все", "Европа", "Азия", "Америка", "Россия"];

const leagues = [
  { name: "АПЛ", country: "Англия", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", clubs: 20, region: "Европа", accent: "#3b82f6" },
  { name: "Ла Лига", country: "Испания", flag: "🇪🇸", clubs: 20, region: "Европа", accent: "#ef4444" },
  { name: "Серия А", country: "Италия", flag: "🇮🇹", clubs: 20, region: "Европа", accent: "#06b6d4" },
  { name: "Бундеслига", country: "Германия", flag: "🇩🇪", clubs: 18, region: "Европа", accent: "#f59e0b" },
  { name: "Лига 1", country: "Франция", flag: "🇫🇷", clubs: 20, region: "Европа", accent: "#8b5cf6" },
  { name: "РПЛ", country: "Россия", flag: "🇷🇺", clubs: 16, region: "Россия", accent: "#22c55e" },
  { name: "Примейра", country: "Португалия", flag: "🇵🇹", clubs: 18, region: "Европа", accent: "#f97316" },
  { name: "MLS", country: "США", flag: "🇺🇸", clubs: 29, region: "Америка", accent: "#e11d48" },
];

const tournaments = [
  {
    name: "Лига Чемпионов",
    subtitle: "УЕФА · Групповой этап",
    icon: "Star",
    accent: "#f59e0b",
    bg: "from-yellow-500/20 to-yellow-800/10",
    border: "border-yellow-400/30",
  },
  {
    name: "Лига Европы",
    subtitle: "УЕФА · 1/8 финала",
    icon: "Trophy",
    accent: "#f97316",
    bg: "from-orange-500/20 to-orange-800/10",
    border: "border-orange-400/30",
  },
];

export default function LeaguesPage({ onBack }: LeaguesPageProps) {
  const [activeTab, setActiveTab] = useState("Все");
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  const filtered =
    activeTab === "Все" ? leagues : leagues.filter((l) => l.region === activeTab);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white overflow-y-auto">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/6 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-green-600/5 blur-3xl" />
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
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/10">
            <Icon name="Globe" size={12} className="text-white/40" fallback="Circle" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              50+ лиг доступно
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mt-3 mb-5 animate-fade-in delay-100">
          <h1 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white leading-none">
            ЛИГИ И ТУРНИРЫ
          </h1>
          <p className="text-white/40 text-xs font-['Oswald'] uppercase tracking-widest mt-1">
            Выберите лигу для участия
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 animate-fade-in delay-100 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`shrink-0 px-4 py-2 rounded-lg font-['Oswald'] text-xs uppercase tracking-widest transition-all ${
                activeTab === cat
                  ? "bg-green-500 text-black font-semibold"
                  : "glass border border-white/10 text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Tournaments */}
        {(activeTab === "Все" || activeTab === "Европа") && (
          <div className="mb-5 animate-fade-in delay-200">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Zap" size={14} className="text-yellow-400" fallback="Circle" />
              <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
                Турниры недели
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {tournaments.map((t) => (
                <button
                  key={t.name}
                  className={`card-hover relative overflow-hidden rounded-xl glass border ${t.border} p-4 text-left group transition-colors`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${t.bg} opacity-60`}
                  />
                  <div className="relative flex flex-col gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${t.accent}25`, border: `1px solid ${t.accent}40` }}
                    >
                      <Icon name={t.icon} size={20} fallback="Circle" style={{ color: t.accent }} />
                    </div>
                    <div>
                      <div
                        className="font-['Bebas_Neue'] text-lg tracking-wider leading-none"
                        style={{ color: t.accent }}
                      >
                        {t.name}
                      </div>
                      <div className="text-white/50 text-[10px] font-['Oswald'] uppercase tracking-wide mt-0.5">
                        {t.subtitle}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Leagues grid */}
        <div className="animate-fade-in delay-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="LayoutGrid" size={14} className="text-white/40" fallback="Circle" />
              <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
                {activeTab === "Все" ? "Все лиги" : activeTab}
              </span>
            </div>
            <span className="text-white/30 text-xs font-['Oswald']">{filtered.length} лиг</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filtered.map((league) => {
              const isSelected = selectedLeague === league.name;
              return (
                <button
                  key={league.name}
                  onClick={() => setSelectedLeague(isSelected ? null : league.name)}
                  className={`card-hover relative overflow-hidden rounded-xl glass border p-4 text-left group transition-all ${
                    isSelected ? "border-green-400/50" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
                  )}
                  <div className="relative">
                    {/* Flag + check */}
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-3xl">{league.flag}</span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <Icon name="Check" size={11} className="text-black" fallback="Circle" />
                        </div>
                      )}
                    </div>
                    {/* Name */}
                    <div
                      className="font-['Bebas_Neue'] text-xl tracking-wider leading-none mb-0.5"
                      style={{ color: isSelected ? league.accent : "white" }}
                    >
                      {league.name}
                    </div>
                    <div className="text-white/40 text-[10px] font-['Oswald'] uppercase tracking-wide mb-3">
                      {league.country}
                    </div>
                    {/* Clubs count */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={10} className="text-white/30" fallback="Circle" />
                        <span className="text-white/50 text-[10px] font-['Oswald'] uppercase">
                          {league.clubs} клубов
                        </span>
                      </div>
                      <div
                        className={`px-2 py-0.5 rounded text-[10px] font-['Oswald'] font-semibold uppercase tracking-wide transition-all ${
                          isSelected
                            ? "bg-green-500 text-black"
                            : "glass border border-white/10 text-white/50 group-hover:border-white/25"
                        }`}
                      >
                        {isSelected ? "Выбрано" : "Выбрать"}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom count badge */}
        <div className="mt-6 flex justify-center animate-fade-in delay-300">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
            <Icon name="Globe2" size={13} className="text-green-400" fallback="Circle" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              50+ лиг доступно
            </span>
            <span className="text-green-400 text-xs font-['Bebas_Neue'] tracking-wider">
              · ОБНОВЛЕНО
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
