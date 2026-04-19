import { Screen } from "../App";
import Icon from "@/components/ui/icon";

interface Props {
  onNavigate: (screen: Screen) => void;
}

const STADIUM_BG = "https://cdn.poehali.dev/projects/cdec2ae4-be84-4ae7-9c06-757a0e327897/files/09e5f61f-77c8-4867-9003-5a986cb7da29.jpg";

const modes = [
  { id: "career", icon: "Trophy", label: "Карьера", sub: "Игрок / Тренер", accent: "text-yellow-400" },
  { id: "match", icon: "Zap", label: "Быстрый матч", sub: "Любая лига", accent: "text-green-400" },
  { id: "leagues", icon: "Globe", label: "Лиги", sub: "50+ турниров", accent: "text-blue-400" },
  { id: "shop", icon: "ShoppingBag", label: "Магазин", sub: "Монеты · Наборы", accent: "text-purple-400" },
  { id: "stats", icon: "BarChart3", label: "Статистика", sub: "Аналитика и рейтинги", accent: "text-orange-400" },
];

export default function MainMenu({ onNavigate }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${STADIUM_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
            <Icon name="Circle" size={20} className="text-green-400" />
          </div>
          <span className="font-['Bebas_Neue'] text-2xl tracking-widest text-white">FOOTBALL PRO</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full">
            <Icon name="Coins" size={14} className="text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400 font-['Oswald']">12,450</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer">
            <Icon name="Settings" size={16} className="text-white/70" />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 px-8 mt-12">
        <p className="text-green-400 font-['Oswald'] text-sm tracking-[0.3em] uppercase mb-2 animate-fade-in">
          Сезон 2024/25
        </p>
        <h1
          className="font-['Bebas_Neue'] text-8xl leading-none tracking-wider text-white animate-fade-in delay-100"
          style={{ textShadow: "0 0 80px rgba(34,197,94,0.3)" }}
        >
          ФУТБОЛ
        </h1>
        <h2 className="font-['Bebas_Neue'] text-8xl leading-none tracking-wider shimmer-gold animate-fade-in delay-200">
          ПРОФЕССИОНАЛ
        </h2>
        <p className="mt-4 text-white/50 font-['IBM_Plex_Sans'] text-sm max-w-xs animate-fade-in delay-300">
          Реалистичный симулятор · 50+ лиг · 10 000+ игроков
        </p>
      </div>

      {/* Mode cards */}
      <div className="relative z-10 px-8 mt-10">
        <div className="flex flex-col gap-2 max-w-sm">
          {modes.map((m, i) => (
            <button
              key={m.id}
              onClick={() => onNavigate(m.id as Screen)}
              className={`menu-item-hover animate-fade-in delay-${(i + 2) * 100} glass rounded-lg px-5 py-4 flex items-center gap-4 text-left hover:bg-white/5 transition-all group`}
            >
              <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon name={m.icon} fallback="Circle" size={20} className={m.accent} />
              </div>
              <div className="flex-1">
                <p className="font-['Oswald'] font-semibold text-white text-base leading-tight">{m.label}</p>
                <p className="text-white/40 text-xs mt-0.5">{m.sub}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom league logos area */}
      <div className="relative z-10 px-8 mt-8 pb-8">
        <p className="text-white/25 text-xs font-['Oswald'] tracking-widest uppercase mb-3">Лицензированные лиги</p>
        <div className="flex gap-3 flex-wrap">
          {["АПЛ", "Ла Лига", "Серия А", "Бундеслига", "Лига 1", "РПЛ"].map(l => (
            <span key={l} className="text-xs text-white/40 border border-white/10 px-2 py-1 rounded font-['Oswald']">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}