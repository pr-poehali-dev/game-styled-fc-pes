import { useState } from "react";
import Icon from "@/components/ui/icon";

interface MatchPageProps {
  onBack: () => void;
}

const matchStats = [
  { label: "Владение", home: 58, away: 42 },
  { label: "Удары", home: 12, away: 8, raw: true },
  { label: "Удары в створ", home: 5, away: 3, raw: true },
  { label: "Угловые", home: 6, away: 4, raw: true },
];

const events = [
  { minute: "23'", icon: "⚽", player: "Волков", team: "Динамо", side: "home" },
  { minute: "38'", icon: "⚽", player: "Промес", team: "Спартак", side: "away" },
  { minute: "42'", icon: "⚽", player: "Тюкавин", team: "Динамо", side: "home" },
];

export default function MatchPage({ onBack }: MatchPageProps) {
  const [simulating, setSimulating] = useState(false);

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => setSimulating(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white overflow-y-auto">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-80 h-80 rounded-full bg-green-600/8 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-red-600/6 blur-3xl" />
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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 ml-auto">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-white/60 text-xs font-['Oswald'] uppercase tracking-widest">
              Прямой эфир
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mt-3 mb-5 animate-fade-in delay-100">
          <h1 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white leading-none">
            МАТЧ
          </h1>
          <p className="text-white/40 text-xs font-['Oswald'] uppercase tracking-widest mt-1">
            РПЛ · Тур 24 · Лужники
          </p>
        </div>

        {/* Teams + Score */}
        <div className="glass border border-white/10 rounded-2xl overflow-hidden mb-4 animate-fade-in delay-100">
          {/* Score row */}
          <div className="flex items-center justify-between px-6 py-5">
            {/* Home team */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-800/30 border border-blue-400/25 flex items-center justify-center">
                <Icon name="Shield" size={28} className="text-blue-300" fallback="Circle" />
              </div>
              <span className="font-['Bebas_Neue'] text-lg tracking-wider text-white text-center leading-tight">
                Динамо
                <br />
                <span className="text-white/40 text-sm">Москва</span>
              </span>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center gap-1 px-4">
              <div className="text-6xl font-['Bebas_Neue'] text-yellow-400 tracking-widest leading-none">
                2<span className="text-white/30 mx-1">-</span>1
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span className="font-['Bebas_Neue'] text-white/80 text-sm tracking-widest">
                  45'
                </span>
              </div>
              <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest">
                1-й тайм
              </span>
            </div>

            {/* Away team */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600/30 to-red-900/30 border border-red-400/25 flex items-center justify-center">
                <Icon name="Shield" size={28} className="text-red-300" fallback="Circle" />
              </div>
              <span className="font-['Bebas_Neue'] text-lg tracking-wider text-white text-center leading-tight">
                Спартак
                <br />
                <span className="text-white/40 text-sm">Москва</span>
              </span>
            </div>
          </div>

          {/* Minute progress bar */}
          <div className="px-6 pb-4">
            <div className="flex justify-between text-[10px] font-['Oswald'] text-white/30 uppercase tracking-wider mb-1">
              <span>0'</span>
              <span>45'</span>
              <span>90'</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        </div>

        {/* Pitch */}
        <div className="animate-fade-in delay-200 mb-4">
          <div
            className="pitch-bg rounded-xl overflow-hidden border border-white/10"
            style={{ height: 200 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Field markings */}
              {/* Center circle */}
              <div className="absolute w-20 h-20 rounded-full border border-white/20" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-white/40" />
              {/* Center line */}
              <div className="absolute w-full h-px bg-white/20" />
              {/* Left penalty area */}
              <div
                className="absolute border border-white/20 rounded-sm"
                style={{ left: 0, top: "25%", width: 60, height: "50%" }}
              />
              {/* Left goal */}
              <div
                className="absolute border border-white/30 rounded-sm"
                style={{ left: 0, top: "37%", width: 18, height: "26%" }}
              />
              {/* Right penalty area */}
              <div
                className="absolute border border-white/20 rounded-sm"
                style={{ right: 0, top: "25%", width: 60, height: "50%" }}
              />
              {/* Right goal */}
              <div
                className="absolute border border-white/30 rounded-sm"
                style={{ right: 0, top: "37%", width: 18, height: "26%" }}
              />
              {/* Corner arcs hints */}
              <div className="absolute top-0 left-0 w-4 h-4 border-b border-r border-white/15 rounded-br-full" />
              <div className="absolute top-0 right-0 w-4 h-4 border-b border-l border-white/15 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-t border-r border-white/15 rounded-tr-full" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-t border-l border-white/15 rounded-tl-full" />

              {/* Team labels */}
              <div className="absolute left-3 top-2">
                <span className="text-white/50 text-[10px] font-['Bebas_Neue'] tracking-wider">
                  ДИН
                </span>
              </div>
              <div className="absolute right-3 top-2">
                <span className="text-white/50 text-[10px] font-['Bebas_Neue'] tracking-wider">
                  СПА
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Match Stats */}
        <div className="glass border border-white/10 rounded-xl p-4 mb-4 animate-fade-in delay-200">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="BarChart2" size={14} className="text-white/40" fallback="Circle" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              Статистика матча
            </span>
          </div>
          <div className="space-y-3">
            {matchStats.map((stat) => {
              const total = stat.home + stat.away;
              const homePct = Math.round((stat.home / total) * 100);
              const awayPct = 100 - homePct;
              return (
                <div key={stat.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-white font-['Bebas_Neue'] text-base tracking-wider">
                      {stat.raw ? stat.home : `${stat.home}%`}
                    </span>
                    <span className="text-white/40 text-[10px] font-['Oswald'] uppercase tracking-widest">
                      {stat.label}
                    </span>
                    <span className="text-white font-['Bebas_Neue'] text-base tracking-wider">
                      {stat.raw ? stat.away : `${stat.away}%`}
                    </span>
                  </div>
                  <div className="flex h-1.5 rounded-full overflow-hidden gap-px">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-l-full transition-all duration-700"
                      style={{ width: `${homePct}%` }}
                    />
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-400 rounded-r-full transition-all duration-700"
                      style={{ width: `${awayPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Events Timeline */}
        <div className="glass border border-white/10 rounded-xl p-4 mb-6 animate-fade-in delay-300">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Clock" size={14} className="text-white/40" fallback="Circle" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              Ключевые события
            </span>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-9 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-3">
              {events.map((ev, i) => (
                <div key={i} className="flex items-center gap-3">
                  {/* Minute */}
                  <div className="w-8 text-right shrink-0">
                    <span className="text-yellow-400 text-xs font-['Bebas_Neue'] tracking-wider">
                      {ev.minute}
                    </span>
                  </div>
                  {/* Dot */}
                  <div className="relative z-10 w-4 h-4 rounded-full bg-[#0a0c10] border-2 border-green-400 shrink-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  </div>
                  {/* Content */}
                  <div
                    className={`flex-1 flex items-center justify-between px-3 py-2 rounded-lg border ${ev.side === "home" ? "border-blue-400/20 bg-blue-500/5" : "border-red-400/20 bg-red-500/5"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{ev.icon}</span>
                      <span className="text-white text-sm font-['Oswald'] font-semibold">
                        {ev.player}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-['Oswald'] uppercase tracking-wide ${ev.side === "home" ? "text-blue-400" : "text-red-400"}`}
                    >
                      {ev.team}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Play button */}
        <div className="animate-fade-in delay-300">
          <button
            onClick={handleSimulate}
            disabled={simulating}
            className="w-full py-4 rounded-xl font-['Bebas_Neue'] text-2xl tracking-widest text-black transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
            style={{
              background: simulating
                ? "linear-gradient(135deg, #16a34a, #15803d)"
                : "linear-gradient(135deg, #22c55e, #16a34a)",
              boxShadow: simulating ? "none" : "0 0 32px rgba(34,197,94,0.3)",
            }}
          >
            {simulating ? (
              <span className="flex items-center justify-center gap-2">
                <Icon name="Loader" size={20} className="animate-spin text-black" fallback="Circle" />
                СИМУЛЯЦИЯ...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Icon name="Play" size={20} fallback="Circle" />
                СЫГРАТЬ МАТЧ
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
