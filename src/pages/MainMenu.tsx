import { Screen } from "../App";
import Icon from "@/components/ui/icon";

interface Props {
  onNavigate: (screen: Screen) => void;
}

const STADIUM_BG =
  "https://cdn.poehali.dev/projects/cdec2ae4-be84-4ae7-9c06-757a0e327897/files/09e5f61f-77c8-4867-9003-5a986cb7da29.jpg";

const modes: {
  id: Screen;
  icon: string;
  label: string;
  sub: string;
  accent: string;
  accentBg: string;
  stat: string;
}[] = [
  {
    id: "career",
    icon: "Trophy",
    label: "Карьера",
    sub: "Игрок / Тренер",
    accent: "text-yellow-400",
    accentBg: "rgba(234,179,8,0.12)",
    stat: "Уровень 12 · 87 рейтинг",
  },
  {
    id: "match",
    icon: "Zap",
    label: "Быстрый матч",
    sub: "Любая лига",
    accent: "text-green-400",
    accentBg: "rgba(34,197,94,0.12)",
    stat: "3 победы подряд 🔥",
  },
  {
    id: "leagues",
    icon: "Globe",
    label: "Лиги",
    sub: "50+ турниров",
    accent: "text-blue-400",
    accentBg: "rgba(59,130,246,0.12)",
    stat: "3 место · РПЛ",
  },
  {
    id: "shop",
    icon: "ShoppingBag",
    label: "Магазин",
    sub: "Монеты · Наборы",
    accent: "text-purple-400",
    accentBg: "rgba(168,85,247,0.12)",
    stat: "2 новых предложения",
  },
  {
    id: "stats",
    icon: "BarChart3",
    label: "Статистика",
    sub: "Аналитика и рейтинги",
    accent: "text-orange-400",
    accentBg: "rgba(249,115,22,0.12)",
    stat: "22 голов · Сезон",
  },
];

export default function MainMenu({ onNavigate }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040608]">
      {/* Stadium background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${STADIUM_BG})` }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/97 via-black/80 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
      {/* Ambient green glow at horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-green-900/15 to-transparent pointer-events-none" />

      {/* ── TOP BAR ── */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-6 animate-fade-in">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center">
            <Icon name="Footprints" size={18} className="text-green-400" fallback="Circle" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          <div>
            <span className="font-['Bebas_Neue'] text-xl tracking-[0.15em] text-white leading-none">
              FOOTBALL PRO
            </span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-green-400" />
              <span className="text-green-400/70 text-[8px] font-['Oswald'] uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2.5">
          {/* Notification bell */}
          <div className="relative">
            <button className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all active:scale-95">
              <Icon name="Bell" size={16} fallback="Circle" />
            </button>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border border-[#040608] flex items-center justify-center">
              <span className="text-[8px] font-['Bebas_Neue'] text-white leading-none">3</span>
            </div>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-1.5 glass border border-yellow-400/20 px-3 py-1.5 rounded-full">
            <Icon name="Star" size={12} className="text-yellow-400" fallback="Circle" />
            <span className="text-yellow-400 text-sm font-['Bebas_Neue'] tracking-wider">12,450</span>
          </div>

          {/* Settings */}
          <button className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-all active:scale-95">
            <Icon name="Settings" size={16} fallback="Circle" />
          </button>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <div className="relative z-10 px-6 mt-10">
        {/* Season badge */}
        <div className="inline-flex items-center gap-2 glass border border-green-400/20 rounded-full px-3 py-1.5 mb-4 animate-fade-in">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-300/80 text-[10px] font-['Oswald'] uppercase tracking-[0.25em]">
            Сезон 2024/25
          </span>
        </div>

        {/* Main titles */}
        <h1
          className="font-['Bebas_Neue'] text-[84px] leading-none tracking-wider text-white animate-fade-in delay-100"
          style={{ textShadow: "0 0 60px rgba(34,197,94,0.25)" }}
        >
          ФУТБОЛ
        </h1>
        <h2 className="font-['Bebas_Neue'] text-[84px] leading-none tracking-wider shimmer-gold animate-fade-in delay-200">
          ПРОФЕССИОНАЛ
        </h2>

        <p className="mt-3 text-white/40 font-['Oswald'] text-sm max-w-xs animate-fade-in delay-300 leading-relaxed">
          Реалистичный симулятор · 50+ лиг · 10 000+ игроков
        </p>

        {/* ── LAST MATCH WIDGET ── */}
        <div className="mt-5 max-w-xs glass rounded-2xl border border-white/10 p-3.5 animate-fade-in delay-200">
          <div className="flex items-center gap-1.5 mb-2">
            <Icon name="Clock" size={10} className="text-white/25" fallback="Circle" />
            <span className="text-white/30 text-[9px] font-['Oswald'] uppercase tracking-widest">Последний матч</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* Result badge */}
              <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                <span className="text-black text-[10px] font-['Bebas_Neue'] tracking-wider leading-none">П</span>
              </div>
              <span className="font-['Bebas_Neue'] text-base tracking-wider text-white leading-none">
                Динамо{" "}
                <span className="text-green-400">3</span>
                {" — "}
                <span className="text-white/50">1</span>
                {" "}Спартак
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-white/25 text-[9px] font-['Oswald'] uppercase tracking-wider">РПЛ Тур 24</span>
            <span className="text-white/15">·</span>
            <span className="text-yellow-400/70 text-[9px] font-['Oswald']">Игрок матча: Волков ⭐</span>
          </div>
        </div>

        {/* ── NEXT MATCH COUNTDOWN ── */}
        <div className="mt-3 max-w-xs glass rounded-2xl border border-red-400/20 bg-red-500/4 p-3.5 animate-fade-in delay-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Icon name="CalendarDays" size={10} className="text-white/25" fallback="Circle" />
              <span className="text-white/30 text-[9px] font-['Oswald'] uppercase tracking-widest">Следующий матч</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-400/30">
              <span className="text-red-300 text-[9px] font-['Bebas_Neue'] tracking-wider">ДЕРБИ 🔥</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <span className="text-white text-[8px] font-['Bebas_Neue']">ДИН</span>
                </div>
                <span className="text-white font-['Oswald'] text-sm tracking-wide">Динамо</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Icon name="MapPin" size={9} className="text-white/20" fallback="Circle" />
                <span className="text-white/25 text-[9px] font-['Oswald']">Тур 25 · Сб 22 апр · 19:00</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="text-right">
              <div className="text-[#FFD700] font-['Bebas_Neue'] text-3xl tracking-wider leading-none"
                   style={{ textShadow: "0 0 16px rgba(255,215,0,0.5)" }}>
                3 ДНЯ
              </div>
              <div className="flex items-center gap-1.5 justify-end mt-0.5">
                <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
                  <span className="text-white text-[7px] font-['Bebas_Neue']">ЗЕН</span>
                </div>
                <span className="text-white/50 text-xs font-['Oswald']">Зенит</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODE CARDS ── */}
      <div className="relative z-10 px-6 mt-7">
        <div className="flex flex-col gap-2 max-w-xs">
          {modes.map((m, i) => (
            <button
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className={`animate-fade-in glass rounded-2xl border border-white/10 px-4 py-3.5 flex items-center gap-4 text-left hover:border-white/20 hover:bg-white/[0.04] transition-all group active:scale-[0.98]`}
              style={{ animationDelay: `${(i + 2) * 80}ms` }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                style={{ background: m.accentBg, border: `1px solid ${m.accentBg.replace("0.12", "0.3")}` }}
              >
                <Icon name={m.icon} fallback="Circle" size={20} className={m.accent} />
              </div>

              {/* Labels */}
              <div className="flex-1 min-w-0">
                <p className="font-['Oswald'] font-semibold text-white text-sm leading-tight tracking-wide">{m.label}</p>
                <p className="text-white/35 text-[10px] font-['Oswald'] mt-0.5 uppercase tracking-wider">{m.sub}</p>
                {/* Stat preview */}
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className={`text-[9px] font-['Oswald'] ${m.accent} opacity-70`}>{m.stat}</span>
                </div>
              </div>

              <Icon
                name="ChevronRight"
                size={15}
                className="text-white/15 group-hover:text-white/40 group-hover:translate-x-1 transition-all shrink-0"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── LICENSED LEAGUES ── */}
      <div className="relative z-10 px-6 mt-6 pb-10 animate-fade-in delay-300">
        <p className="text-white/20 text-[9px] font-['Oswald'] tracking-[0.25em] uppercase mb-2.5">
          Лицензированные лиги
        </p>
        <div className="flex gap-2 flex-wrap">
          {["АПЛ", "Ла Лига", "Серия А", "Бундеслига", "Лига 1", "РПЛ"].map((l) => (
            <span
              key={l}
              className="text-[10px] text-white/35 border border-white/10 px-2.5 py-1 rounded-lg font-['Oswald'] tracking-wide hover:text-white/55 hover:border-white/20 transition-colors cursor-default"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
