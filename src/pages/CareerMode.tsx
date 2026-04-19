import Icon from "@/components/ui/icon";

interface CareerModeProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const playerStats = [
  { label: "Скорость", value: 88 },
  { label: "Удар", value: 85 },
  { label: "Дриблинг", value: 82 },
  { label: "Пас", value: 79 },
];

const recentMatches = [
  { home: "Динамо", away: "Спартак", scoreHome: 3, scoreAway: 1, result: "W" },
  { home: "ЦСКА", away: "Динамо", scoreHome: 0, scoreAway: 2, result: "W" },
  { home: "Динамо", away: "Зенит", scoreHome: 1, scoreAway: 1, result: "D" },
];

const resultColors: Record<string, string> = {
  W: "bg-green-500 text-white",
  D: "bg-yellow-500 text-black",
  L: "bg-red-500 text-white",
};

const resultLabels: Record<string, string> = {
  W: "П",
  D: "Н",
  L: "П",
};

const StatBar = ({ label, value }: { label: string; value: number }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-wide">
        {label}
      </span>
      <span className="text-yellow-400 text-xs font-['Bebas_Neue'] tracking-wider">
        {value}
      </span>
    </div>
    <div className="stat-bar">
      <div
        className="stat-bar-fill bg-gradient-to-r from-green-500 to-green-400"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default function CareerMode({ onBack, onNavigate }: CareerModeProps) {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white overflow-y-auto">
      {/* Background texture */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-yellow-400/4 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-green-600/4 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(255,255,255,0.5) 48px, rgba(255,255,255,0.5) 49px), repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.5) 48px, rgba(255,255,255,0.5) 49px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-10">
        {/* Top bar */}
        <div className="flex items-center gap-4 pt-6 pb-2 animate-fade-in">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg glass border border-white/10 text-white/70 hover:text-white hover:border-white/25 transition-all active:scale-95"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/60 text-xs font-['Oswald'] uppercase tracking-widest">
              Сезон 2025/26
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mt-4 mb-6 animate-fade-in delay-100">
          <div className="flex items-end gap-3">
            <h1 className="text-5xl font-['Bebas_Neue'] tracking-wider text-white leading-none">
              КАРЬЕРА
            </h1>
            <div className="mb-1.5 flex items-center gap-1.5 px-2.5 py-1 rounded glass border border-yellow-400/30">
              <Icon name="Trophy" size={13} className="text-yellow-400" />
              <span className="text-yellow-400 text-xs font-['Oswald'] font-semibold uppercase tracking-wide">
                Режим
              </span>
            </div>
          </div>
          <p className="text-white/40 text-sm font-['Oswald'] tracking-wide mt-1 uppercase">
            Выберите путь к легенде
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6 animate-fade-in delay-200">
          {/* Player Career */}
          <button
            onClick={() => onNavigate("career")}
            className="card-hover relative overflow-hidden rounded-xl glass border border-white/10 p-4 text-left group hover:border-green-500/40 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center">
              <Icon name="User" size={16} className="text-green-400" />
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-3">
                <Icon name="Footprints" size={20} className="text-green-400" />
              </div>
              <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-white leading-none mb-1">
                Карьера
                <br />
                игрока
              </h3>
              <p className="text-white/40 text-xs font-['Oswald'] leading-snug mb-3">
                От юниора до легенды
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { icon: "Swords", label: "Матчи", val: "214" },
                  { icon: "Goal", label: "Голы", val: "87" },
                  { icon: "Handshake", label: "Передачи", val: "63" },
                  { icon: "Star", label: "Рейтинг", val: "87" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-black/20 rounded-lg px-2 py-1.5 flex items-center gap-1.5"
                  >
                    <Icon name={stat.icon} size={10} className="text-green-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-white font-['Bebas_Neue'] text-sm leading-none">
                        {stat.val}
                      </div>
                      <div className="text-white/40 text-[9px] font-['Oswald'] uppercase truncate">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </button>

          {/* Coach Career */}
          <button
            onClick={() => onNavigate("career")}
            className="card-hover relative overflow-hidden rounded-xl glass border border-white/10 p-4 text-left group hover:border-yellow-400/40 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-yellow-400/15 flex items-center justify-center">
              <Icon name="Briefcase" size={16} className="text-yellow-400" />
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/15 border border-yellow-400/25 flex items-center justify-center mb-3">
                <Icon name="ClipboardList" size={20} className="text-yellow-400" />
              </div>
              <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-white leading-none mb-1">
                Карьера
                <br />
                тренера
              </h3>
              <p className="text-white/40 text-xs font-['Oswald'] leading-snug mb-3">
                Управляй клубом
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { icon: "Network", label: "Тактика", val: "4-3-3" },
                  { icon: "ArrowLeftRight", label: "Трансферы", val: "12" },
                  { icon: "Target", label: "Цели", val: "ТОП-3" },
                  { icon: "TrendingUp", label: "Сезон", val: "2025" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-black/20 rounded-lg px-2 py-1.5 flex items-center gap-1.5"
                  >
                    <Icon name={stat.icon} size={10} className="text-yellow-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-white font-['Bebas_Neue'] text-sm leading-none">
                        {stat.val}
                      </div>
                      <div className="text-white/40 text-[9px] font-['Oswald'] uppercase truncate">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </button>
        </div>

        {/* Season Overview */}
        <div className="mb-5 animate-fade-in delay-300">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="CalendarDays" size={15} className="text-white/40" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              Текущий сезон
            </span>
          </div>
          <div className="glass border border-white/10 rounded-xl overflow-hidden">
            <div className="flex items-center gap-0 divide-x divide-white/10">
              {/* Club */}
              <div className="flex-1 px-4 py-4 flex flex-col items-center gap-2">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-700/30 border border-blue-400/25 flex items-center justify-center">
                  <Icon name="Shield" size={22} className="text-blue-400" />
                </div>
                <div className="text-center">
                  <div className="text-white font-['Bebas_Neue'] text-base tracking-wider leading-none">
                    ФК Динамо
                  </div>
                  <div className="text-white/40 text-[10px] font-['Oswald'] uppercase tracking-wide mt-0.5">
                    Клуб
                  </div>
                </div>
              </div>
              {/* Position */}
              <div className="flex-1 px-4 py-4 flex flex-col items-center gap-2">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-400/25 to-yellow-600/20 border border-yellow-400/30 flex items-center justify-center">
                  <span className="font-['Bebas_Neue'] text-yellow-400 text-xl leading-none">
                    3
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-white font-['Bebas_Neue'] text-base tracking-wider leading-none">
                    3 место
                  </div>
                  <div className="text-white/40 text-[10px] font-['Oswald'] uppercase tracking-wide mt-0.5">
                    Лига
                  </div>
                </div>
              </div>
              {/* Next match */}
              <div className="flex-1 px-4 py-4 flex flex-col items-center gap-2">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-500/20 to-green-700/15 border border-green-400/25 flex items-center justify-center">
                  <Icon name="Clock" size={18} className="text-green-400" />
                </div>
                <div className="text-center">
                  <div className="text-white font-['Bebas_Neue'] text-base tracking-wider leading-none">
                    Сб 19:00
                  </div>
                  <div className="text-white/40 text-[10px] font-['Oswald'] uppercase tracking-wide mt-0.5">
                    След. матч
                  </div>
                </div>
              </div>
            </div>
            {/* Next match banner */}
            <div className="border-t border-white/10 bg-black/20 px-4 py-3 flex items-center gap-3">
              <Icon name="Zap" size={13} className="text-green-400 shrink-0" />
              <span className="text-white/60 text-xs font-['Oswald'] uppercase tracking-wide">
                Следующий матч:
              </span>
              <span className="text-white text-xs font-['Bebas_Neue'] tracking-wider">
                Динамо vs Локомотив
              </span>
              <div className="ml-auto px-2 py-0.5 rounded bg-green-500/15 border border-green-500/30">
                <span className="text-green-400 text-[10px] font-['Oswald'] font-semibold uppercase tracking-wide">
                  РПЛ · Тур 24
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* My Player */}
        <div className="mb-5 animate-fade-in delay-300">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="User" size={15} className="text-white/40" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              Мой игрок
            </span>
          </div>
          <div className="glass border border-white/10 rounded-xl p-4">
            <div className="flex gap-4">
              {/* Rating badge */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div
                  className="rating-badge w-16 h-16 rounded-xl flex flex-col items-center justify-center shadow-lg shadow-yellow-500/20"
                  style={{
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 40%, #fbbf24 70%, #b45309 100%)",
                  }}
                >
                  <span className="font-['Bebas_Neue'] text-3xl text-white leading-none drop-shadow">
                    87
                  </span>
                  <span
                    className="text-white/80 text-[9px] font-['Oswald'] font-bold uppercase tracking-widest"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
                  >
                    ПАП
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Player info & stats */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-['Bebas_Neue'] text-xl tracking-wider text-white leading-none">
                      Алексей Волков
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white/40 text-xs font-['Oswald'] uppercase tracking-wide">
                        Правый атакующий полузащитник
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate("player")}
                    className="shrink-0 ml-2 px-2.5 py-1 rounded-lg glass border border-white/10 hover:border-white/25 transition-colors"
                  >
                    <span className="text-white/60 text-xs font-['Oswald'] uppercase tracking-wide">
                      Карта
                    </span>
                  </button>
                </div>
                <div className="space-y-2">
                  {playerStats.map((stat) => (
                    <StatBar key={stat.label} label={stat.label} value={stat.value} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Matches */}
        <div className="animate-fade-in delay-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="History" size={15} className="text-white/40" />
              <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
                Последние матчи
              </span>
            </div>
            <button className="flex items-center gap-1 text-green-400/70 hover:text-green-400 transition-colors">
              <span className="text-xs font-['Oswald'] uppercase tracking-wide">Все</span>
              <Icon name="ChevronRight" size={13} />
            </button>
          </div>
          <div className="space-y-2">
            {recentMatches.map((match, i) => {
              const isDynHome = match.home === "Динамо";
              const isWin = match.result === "W";
              const isDraw = match.result === "D";

              return (
                <div
                  key={i}
                  className="card-hover glass border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-white/20 transition-colors"
                >
                  {/* Result badge */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-['Bebas_Neue'] text-sm ${resultColors[match.result]}`}
                  >
                    {resultLabels[match.result]}
                  </div>

                  {/* Teams & Score */}
                  <div className="flex-1 flex items-center gap-3 min-w-0">
                    <span
                      className={`font-['Oswald'] text-sm font-semibold truncate ${isDynHome ? "text-white" : "text-white/60"}`}
                    >
                      {match.home}
                    </span>
                    <div className="shrink-0 px-3 py-1 rounded-lg bg-black/30 border border-white/10">
                      <span className="font-['Bebas_Neue'] text-lg text-white tracking-widest leading-none">
                        {match.scoreHome}
                        <span className="text-white/30 mx-0.5">—</span>
                        {match.scoreAway}
                      </span>
                    </div>
                    <span
                      className={`font-['Oswald'] text-sm font-semibold truncate ${!isDynHome ? "text-white" : "text-white/60"}`}
                    >
                      {match.away}
                    </span>
                  </div>

                  {/* Match context */}
                  <div className="shrink-0 flex flex-col items-end gap-0.5">
                    <span
                      className={`text-xs font-['Oswald'] font-semibold uppercase tracking-wide ${isWin ? "text-green-400" : isDraw ? "text-yellow-400" : "text-red-400"}`}
                    >
                      {isWin ? "Победа" : isDraw ? "Ничья" : "Поражение"}
                    </span>
                    <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-wide">
                      РПЛ
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
