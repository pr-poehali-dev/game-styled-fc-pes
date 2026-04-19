import { useState } from "react";
import type { ReactNode } from "react";
import Icon from "@/components/ui/icon";

interface StatsPageProps {
  onBack: () => void;
}

type ActiveTab = "player" | "team" | "achievements";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const SEASONS = ["2022/23", "2023/24", "2024/25"];

const BIG4 = [
  { label: "Голы",     value: "22",   icon: "Flame",    color: "#22c55e", glow: "rgba(34,197,94,0.2)"   },
  { label: "Передачи", value: "15",   icon: "Zap",      color: "#3b82f6", glow: "rgba(59,130,246,0.2)"  },
  { label: "Матчи",    value: "38",   icon: "Swords",   color: "#e2e8f0", glow: "rgba(226,232,240,0.1)" },
  { label: "Минуты",   value: "3240", icon: "Clock",    color: "#a855f7", glow: "rgba(168,85,247,0.2)"  },
];

const MONTH_BARS = [
  { month: "Окт", goals: 2 },
  { month: "Ноя", goals: 3 },
  { month: "Дек", goals: 1 },
  { month: "Янв", goals: 4 },
  { month: "Фев", goals: 3 },
  { month: "Мар", goals: 5 },
  { month: "Апр", goals: 4 },
];

const ATTRIBUTES = [
  { label: "Скорость",          value: 88, color: "#22c55e" },
  { label: "Удар",              value: 85, color: "#f97316" },
  { label: "Дриблинг",          value: 82, color: "#eab308" },
  { label: "Пас",               value: 79, color: "#3b82f6" },
  { label: "Защита",            value: 45, color: "#ef4444" },
  { label: "Физика",            value: 83, color: "#06b6d4" },
  { label: "Позиционирование",  value: 86, color: "#a855f7" },
];

const SCORERS = [
  { rank: 1, name: "Волков",   pos: "ПАП", goals: 22, assists: 15, isUser: true  },
  { rank: 2, name: "Тюкавин", pos: "НАП", goals: 18, assists: 9,  isUser: false },
  { rank: 3, name: "Захарян", pos: "ЦП",  goals: 7,  assists: 14, isUser: false },
  { rank: 4, name: "Лаксальт",pos: "ЛП",  goals: 5,  assists: 11, isUser: false },
  { rank: 5, name: "Фомин",   pos: "ЦП",  goals: 4,  assists: 7,  isUser: false },
];

// Position points: round 1-28, trending from pos 5 → pos 3
// Lower = better position
const POSITION_POINTS: number[] = [
  5, 5, 4, 5, 4, 4, 4, 3, 4, 3, 4, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
];

interface Achievement {
  emoji: string;
  title: string;
  desc: string;
  rarity: "bronze" | "silver" | "gold" | "special";
  unlocked: true;
}

interface LockedAchievement {
  title: string;
  progress?: { done: number; total: number };
  unlocked: false;
}

const ACHIEVEMENTS: Achievement[] = [
  { emoji: "🥅", title: "Первый гол",       desc: "Забил первый гол в карьере",        rarity: "bronze",  unlocked: true },
  { emoji: "⚽", title: "Снайпер",          desc: "10+ голов за сезон",                rarity: "silver",  unlocked: true },
  { emoji: "🏆", title: "Кубок России 2024",desc: "Завоевал Кубок России",             rarity: "gold",    unlocked: true },
  { emoji: "🌟", title: "Лучший молодой",   desc: "Лучший молодой игрок РПЛ",          rarity: "gold",    unlocked: true },
  { emoji: "🎯", title: "Хет-трик",         desc: "Забил 3 гола в одном матче",        rarity: "silver",  unlocked: true },
  { emoji: "🇷🇺", title: "Сборная России",  desc: "Вызов в национальную сборную",      rarity: "special", unlocked: true },
];

const LOCKED: LockedAchievement[] = [
  { title: "???", progress: { done: 22, total: 50  }, unlocked: false },
  { title: "???", progress: undefined,                 unlocked: false },
  { title: "???", progress: { done: 38, total: 100 }, unlocked: false },
];

const LOCKED_HINTS = [
  "Забить 50 голов",
  "Выиграть чемпионат",
  "Провести 100 матчей",
];

const RARITY_STYLES = {
  bronze:  { border: "border-amber-600/40",   bg: "bg-amber-900/15",   icon: "#cd7f32", glow: "rgba(205,127,50,0.15)"   },
  silver:  { border: "border-slate-400/40",   bg: "bg-slate-700/15",   icon: "#c0c0c0", glow: "rgba(192,192,192,0.12)"  },
  gold:    { border: "border-yellow-400/50",  bg: "bg-yellow-900/15",  icon: "#FFD700", glow: "rgba(255,215,0,0.2)"     },
  special: { border: "border-blue-400/50",    bg: "bg-blue-900/15",    icon: "#60a5fa", glow: "rgba(96,165,250,0.2)"    },
};

// ─────────────────────────────────────────────
// Section label helper
// ─────────────────────────────────────────────

function SLabel({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon name={icon} size={12} className="text-white/30" fallback="Circle" />
      <span className="text-white/35 text-[10px] font-['Oswald'] uppercase tracking-widest">{children}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Player tab
// ─────────────────────────────────────────────

function PlayerTab({ activeSeason, setActiveSeason }: { activeSeason: string; setActiveSeason: (s: string) => void }) {
  const maxGoals = Math.max(...MONTH_BARS.map((m) => m.goals));

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Season selector */}
      <div className="flex gap-2">
        {SEASONS.map((s) => {
          const isCurrent = s === "2024/25";
          const isActive = s === activeSeason;
          return (
            <button
              key={s}
              onClick={() => setActiveSeason(s)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-['Oswald'] text-xs uppercase tracking-widest transition-all active:scale-95 border ${
                isActive
                  ? "bg-white/12 border-white/20 text-white"
                  : "glass border-white/8 text-white/35 hover:text-white/60 hover:border-white/15"
              }`}
            >
              {s}
              {isCurrent && (
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Big 4 stats */}
      <div className="grid grid-cols-2 gap-3">
        {BIG4.map((s) => (
          <div
            key={s.label}
            className="glass rounded-2xl border border-white/10 p-4 flex items-center gap-3"
            style={{ boxShadow: `0 0 20px ${s.glow}` }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
            >
              <Icon name={s.icon} size={20} fallback="Circle" style={{ color: s.color }} />
            </div>
            <div>
              <div className="font-['Bebas_Neue'] text-3xl tracking-wider leading-none" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-white/35 text-[9px] font-['Oswald'] uppercase tracking-widest">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Goals per month chart */}
      <div className="glass rounded-2xl border border-white/10 p-4">
        <SLabel icon="BarChart2">Голы по месяцам</SLabel>
        <div className="flex items-end gap-1.5" style={{ height: 96 }}>
          {MONTH_BARS.map((m) => {
            const barH = Math.max(m.goals * 14, m.goals > 0 ? 8 : 0);
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5" style={{ height: 96 }}>
                {/* Bar + value */}
                <div className="flex-1 flex flex-col justify-end w-full">
                  {m.goals > 0 ? (
                    <div
                      className="w-full rounded-t-lg relative overflow-hidden flex items-start justify-center pt-1"
                      style={{
                        height: barH,
                        background: "linear-gradient(to top, #15803d, #22c55e)",
                        boxShadow: "0 0 8px rgba(34,197,94,0.3)",
                      }}
                    >
                      <span className="text-[9px] font-['Bebas_Neue'] text-white/90 leading-none relative z-10">
                        {m.goals}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-1 rounded-full bg-white/8" />
                  )}
                </div>
                <span className="text-white/30 text-[8px] font-['Oswald'] uppercase tracking-wider shrink-0">
                  {m.month}
                </span>
              </div>
            );
          })}
        </div>
        {/* Max reference line label */}
        <div className="flex items-center justify-end gap-1 mt-2">
          <div className="w-3 h-[2px] rounded-full bg-green-500/50" />
          <span className="text-white/20 text-[9px] font-['Oswald']">Макс: {maxGoals} гола</span>
        </div>
      </div>

      {/* Attributes */}
      <div className="glass rounded-2xl border border-white/10 p-4">
        <SLabel icon="Sliders">Характеристики</SLabel>
        <div className="space-y-3">
          {ATTRIBUTES.map((a) => (
            <div key={a.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-white/55 text-[11px] font-['Oswald'] uppercase tracking-wide">{a.label}</span>
                <span className="font-['Bebas_Neue'] text-sm tracking-wider" style={{ color: a.color }}>{a.value}</span>
              </div>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill rounded-full"
                  style={{ width: `${a.value}%`, background: a.color, boxShadow: `0 0 6px ${a.color}60` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Team tab
// ─────────────────────────────────────────────

const TEAM_STATS = [
  { label: "Игр",       value: 28, color: "#e2e8f0" },
  { label: "Победы",    value: 19, color: "#22c55e" },
  { label: "Голы",      value: 47, color: "#FFD700" },
  { label: "Пропущено", value: 24, color: "#ef4444" },
];

function PositionChart() {
  // SVG chart: rounds 1-28, positions 1-6
  const W = 280;
  const H = 80;
  const padL = 24;
  const padR = 8;
  const padT = 8;
  const padB = 16;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const maxPos = 6;

  const points = POSITION_POINTS.map((pos, i) => {
    const x = padL + (i / (POSITION_POINTS.length - 1)) * innerW;
    const y = padT + ((pos - 1) / (maxPos - 1)) * innerH;
    return { x, y, pos };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="glass rounded-2xl border border-white/10 p-4">
      <SLabel icon="TrendingUp">Позиция по турам</SLabel>
      <div className="relative">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
          {/* Y axis labels */}
          {[1, 3, 6].map((pos) => {
            const y = padT + ((pos - 1) / (maxPos - 1)) * innerH;
            return (
              <g key={pos}>
                <line x1={padL - 4} y1={y} x2={W - padR} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <text x={padL - 6} y={y + 4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end" fontFamily="Oswald">
                  {pos}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${H - padB} L ${points[0].x} ${H - padB} Z`}
            fill="url(#lineGrad)"
          />

          {/* Line */}
          <path d={pathD} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Dots — show every 4th + last */}
          {points.map((p, i) => {
            if (i % 4 !== 0 && i !== points.length - 1) return null;
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3"
                fill="#22c55e"
                stroke="#080a0e"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Current position label */}
          <g>
            <rect
              x={points[points.length - 1].x - 14}
              y={points[points.length - 1].y - 18}
              width="28"
              height="13"
              rx="4"
              fill="#22c55e"
            />
            <text
              x={points[points.length - 1].x}
              y={points[points.length - 1].y - 8}
              fontSize="8"
              fill="#000"
              textAnchor="middle"
              fontFamily="Bebas Neue"
              letterSpacing="1"
            >
              3 МЕС
            </text>
          </g>

          {/* X axis: first + last round */}
          <text x={padL} y={H} fontSize="8" fill="rgba(255,255,255,0.25)" textAnchor="middle" fontFamily="Oswald">Т1</text>
          <text x={W - padR} y={H} fontSize="8" fill="rgba(255,255,255,0.25)" textAnchor="end" fontFamily="Oswald">Т28</text>
        </svg>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        <span className="text-white/25 text-[9px] font-['Oswald']">Динамо · тренд: 5-е → 3-е место</span>
      </div>
    </div>
  );
}

function TeamTab() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl border border-white/10 p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shrink-0 border border-blue-400/30">
          <span className="text-white text-sm font-['Bebas_Neue'] tracking-wider">ДИН</span>
        </div>
        <div>
          <div className="font-['Bebas_Neue'] text-xl tracking-wider text-white leading-none">ФК Динамо</div>
          <div className="text-white/35 text-[10px] font-['Oswald'] uppercase tracking-widest mt-0.5">Сезон 2024/25 · РПЛ</div>
        </div>
        <div className="ml-auto text-right">
          <div className="font-['Bebas_Neue'] text-2xl text-blue-300 tracking-wider leading-none">3-е</div>
          <div className="text-white/25 text-[9px] font-['Oswald'] uppercase tracking-widest">место</div>
        </div>
      </div>

      {/* 4 team stats */}
      <div className="grid grid-cols-4 gap-2">
        {TEAM_STATS.map((s) => (
          <div key={s.label} className="glass rounded-xl border border-white/10 p-3 flex flex-col items-center gap-1">
            <div className="font-['Bebas_Neue'] text-2xl tracking-wider leading-none" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-white/30 text-[9px] font-['Oswald'] uppercase tracking-widest text-center">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Top scorers */}
      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/8 flex items-center gap-2">
          <Icon name="Flame" size={12} className="text-orange-400" fallback="Circle" />
          <span className="text-white/35 text-[10px] font-['Oswald'] uppercase tracking-widest">Бомбардиры</span>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[32px_1fr_40px_52px_52px] gap-0 px-4 py-2 border-b border-white/8 bg-white/[0.015]">
          {["#", "Игрок", "Поз", "⚽", "🅰️"].map((h) => (
            <span key={h} className="text-white/20 text-[9px] font-['Oswald'] uppercase tracking-widest text-center first:text-left">{h}</span>
          ))}
        </div>

        {SCORERS.map((p, i) => (
          <div
            key={p.name}
            className={`grid grid-cols-[32px_1fr_40px_52px_52px] gap-0 px-4 py-3 transition-colors ${
              p.isUser
                ? "bg-blue-500/8 border-l-2 border-blue-400/50"
                : "hover:bg-white/[0.025]"
            } ${i < SCORERS.length - 1 ? "border-b border-white/[0.05]" : ""}`}
          >
            <span className="text-white/35 text-xs font-['Oswald'] self-center">{p.rank}</span>
            <div className="flex items-center gap-2 self-center min-w-0">
              <span className={`text-sm font-['Oswald'] tracking-wide truncate ${p.isUser ? "text-blue-300 font-semibold" : "text-white/80"}`}>
                {p.name}
              </span>
              {p.isUser && (
                <span className="text-[7px] font-['Oswald'] uppercase tracking-widest bg-blue-500/20 border border-blue-400/25 text-blue-300 px-1.5 py-0.5 rounded-full shrink-0">
                  Вы
                </span>
              )}
            </div>
            <span className="text-white/30 text-[10px] font-['Oswald'] uppercase text-center self-center">{p.pos}</span>
            <span className="text-green-400/80 text-sm font-['Bebas_Neue'] tracking-wider text-center self-center">{p.goals}</span>
            <span className="text-blue-400/70 text-sm font-['Bebas_Neue'] tracking-wider text-center self-center">{p.assists}</span>
          </div>
        ))}
      </div>

      {/* Position chart */}
      <PositionChart />
    </div>
  );
}

// ─────────────────────────────────────────────
// Achievements tab
// ─────────────────────────────────────────────

function AchievementsTab() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Unlocked */}
      <div>
        <SLabel icon="Trophy">Разблокировано · {ACHIEVEMENTS.length}</SLabel>
        <div className="grid grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((a) => {
            const s = RARITY_STYLES[a.rarity];
            return (
              <div
                key={a.title}
                className={`glass rounded-2xl border ${s.border} ${s.bg} p-4 flex flex-col gap-2`}
                style={{ boxShadow: `0 0 16px ${s.glow}` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl leading-none">{a.emoji}</span>
                  <div
                    className="shrink-0 px-1.5 py-0.5 rounded-full text-[8px] font-['Bebas_Neue'] tracking-widest"
                    style={{ background: `${s.icon}20`, border: `1px solid ${s.icon}40`, color: s.icon }}
                  >
                    {a.rarity === "special" ? "ОСОБОЕ" : a.rarity === "gold" ? "ЗОЛОТО" : a.rarity === "silver" ? "СЕРЕБРО" : "БРОНЗА"}
                  </div>
                </div>
                <div>
                  <div className="text-white/90 text-xs font-['Oswald'] tracking-wide font-semibold leading-tight">{a.title}</div>
                  <div className="text-white/35 text-[9px] font-['Oswald'] mt-0.5 leading-snug">{a.desc}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="CheckCircle" size={10} fallback="Circle" style={{ color: s.icon }} />
                  <span className="text-[9px] font-['Oswald']" style={{ color: s.icon }}>Получено</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Locked */}
      <div>
        <SLabel icon="Lock">Заблокировано · {LOCKED.length}</SLabel>
        <div className="space-y-2.5">
          {LOCKED.map((l, i) => (
            <div
              key={i}
              className="glass rounded-2xl border border-white/8 p-4 flex items-center gap-4 opacity-60"
            >
              {/* Silhouette */}
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Icon name="Lock" size={18} className="text-white/20" fallback="Circle" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/30 text-sm font-['Oswald'] tracking-wider mb-1">{l.title}</div>
                <div className="text-white/20 text-[10px] font-['Oswald']">{LOCKED_HINTS[i]}</div>
                {l.progress && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white/20 text-[9px] font-['Oswald']">Прогресс</span>
                      <span className="text-white/25 text-[9px] font-['Oswald']">{l.progress.done}/{l.progress.total}</span>
                    </div>
                    <div className="stat-bar">
                      <div
                        className="stat-bar-fill bg-white/20 rounded-full"
                        style={{ width: `${(l.progress.done / l.progress.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────

export default function StatsPage({ onBack }: StatsPageProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("player");
  const [activeSeason, setActiveSeason] = useState("2024/25");

  const tabs: { id: ActiveTab; label: string; icon: string }[] = [
    { id: "player",       label: "Игрок",      icon: "User"      },
    { id: "team",         label: "Команда",    icon: "Users"     },
    { id: "achievements", label: "Достижения", icon: "Trophy"    },
  ];

  return (
    <div className="min-h-screen bg-[#080a0e] text-white overflow-y-auto">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-700/5 blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 rounded-full bg-green-600/4 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-yellow-500/3 blur-3xl" />
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-400/20 flex items-center justify-center">
              <Icon name="BarChart3" size={15} fallback="Circle" className="text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-['Bebas_Neue'] tracking-[0.12em] text-white leading-none">СТАТИСТИКА</h1>
              <p className="text-white/25 text-[9px] font-['Oswald'] uppercase tracking-widest leading-none mt-0.5">и аналитика</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-green-400/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-green-300/70 text-[9px] font-['Oswald'] uppercase tracking-widest">Сезон 24/25</span>
          </div>
        </div>

        {/* Player card */}
        <div className="glass rounded-2xl border border-white/10 p-4 mb-5 animate-fade-in delay-100">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <span className="text-white text-xl font-['Bebas_Neue'] tracking-wider">АВ</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-[#FFD700] flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                <span className="text-black text-sm font-['Bebas_Neue'] tracking-wider leading-none">87</span>
              </div>
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-['Bebas_Neue'] text-2xl tracking-[0.08em] text-white leading-none">АЛЕКСЕЙ ВОЛКОВ</div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-blue-300/70 text-xs font-['Oswald'] uppercase tracking-wide">ПАП</span>
                <span className="text-white/15">·</span>
                <span className="text-white/45 text-xs font-['Oswald'] uppercase">Динамо</span>
                <span className="text-white/15">·</span>
                <span className="text-base leading-none">🇷🇺</span>
              </div>
            </div>
            {/* Avg rating */}
            <div className="text-right shrink-0">
              <div className="font-['Bebas_Neue'] text-3xl tracking-wider text-green-400 leading-none">8.4</div>
              <div className="text-white/25 text-[9px] font-['Oswald'] uppercase tracking-widest">/ 10 оценка</div>
            </div>
          </div>
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

        {/* Tab content */}
        <div className="animate-fade-in delay-200">
          {activeTab === "player"       && <PlayerTab activeSeason={activeSeason} setActiveSeason={setActiveSeason} />}
          {activeTab === "team"         && <TeamTab />}
          {activeTab === "achievements" && <AchievementsTab />}
        </div>
      </div>
    </div>
  );
}