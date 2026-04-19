import Icon from "@/components/ui/icon";

interface StatsPageProps {
  onBack: () => void;
}

const seasonStats = [
  { label: "Матчи", value: 38, icon: "Swords", color: "text-blue-400" },
  { label: "Голы", value: 22, icon: "Target", color: "text-green-400" },
  { label: "Передачи", value: 15, icon: "ArrowRight", color: "text-yellow-400" },
  { label: "Минуты", value: 3240, icon: "Clock", color: "text-purple-400" },
];

const monthBars = [
  { month: "Окт", goals: 3, rating: 7.8 },
  { month: "Ноя", goals: 5, rating: 8.4 },
  { month: "Дек", goals: 2, rating: 7.1 },
  { month: "Янв", goals: 4, rating: 8.0 },
  { month: "Фев", goals: 3, rating: 7.5 },
  { month: "Мар", goals: 5, rating: 8.9 },
  { month: "Апр", goals: 0, rating: 0 },
];

const attributes = [
  { label: "Скорость", value: 88, color: "from-green-500 to-green-400" },
  { label: "Удар", value: 85, color: "from-yellow-500 to-yellow-400" },
  { label: "Дриблинг", value: 82, color: "from-blue-500 to-blue-400" },
  { label: "Пас", value: 79, color: "from-purple-500 to-purple-400" },
  { label: "Защита", value: 45, color: "from-red-500 to-red-400" },
  { label: "Физика", value: 83, color: "from-orange-500 to-orange-400" },
  { label: "Позиционирование", value: 86, color: "from-cyan-500 to-cyan-400" },
];

const scorers = [
  { rank: 1, name: "Холанд", goals: 28, club: "МС", isUser: false },
  { rank: 2, name: "Салах", goals: 24, club: "Лив", isUser: false },
  { rank: 3, name: "Волков", goals: 22, club: "Дин", isUser: true },
  { rank: 4, name: "Кейн", goals: 20, club: "БМ", isUser: false },
  { rank: 5, name: "Мбаппе", goals: 19, club: "РМ", isUser: false },
];

const matchHistory = [
  { opponent: "Спартак", score: "3-1", result: "W", rating: 9.2, goals: 2, assists: 1 },
  { opponent: "ЦСКА", score: "2-0", result: "W", rating: 8.5, goals: 1, assists: 1 },
  { opponent: "Зенит", score: "1-1", result: "D", rating: 7.3, goals: 1, assists: 0 },
  { opponent: "Локомотив", score: "0-1", result: "L", rating: 6.5, goals: 0, assists: 0 },
  { opponent: "Краснодар", score: "4-2", result: "W", rating: 8.8, goals: 2, assists: 2 },
];

const ratingColor = (r: number) => {
  if (r >= 8.5) return "text-green-400";
  if (r >= 7.0) return "text-yellow-400";
  return "text-red-400";
};

const resultBg: Record<string, string> = {
  W: "bg-green-500 text-white",
  D: "bg-yellow-500 text-black",
  L: "bg-red-500 text-white",
};

const maxGoals = Math.max(...monthBars.map((m) => m.goals), 1);

export default function StatsPage({ onBack }: StatsPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white overflow-y-auto">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-600/6 blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 rounded-full bg-green-600/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-yellow-400/4 blur-3xl" />
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
            <Icon name="TrendingUp" size={12} className="text-green-400" fallback="Circle" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              Сезон 2025/26
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mt-3 mb-5 animate-fade-in delay-100">
          <h1 className="text-4xl font-['Bebas_Neue'] tracking-wider text-white leading-none">
            СТАТИСТИКА
          </h1>
          <p className="text-white/40 text-xs font-['Oswald'] uppercase tracking-widest mt-1">
            и аналитика
          </p>
        </div>

        {/* Player overview */}
        <div className="glass border border-white/10 rounded-xl p-4 mb-5 animate-fade-in delay-100">
          <div className="flex items-center gap-4">
            {/* Rating badge */}
            <div
              className="rating-badge w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-lg shadow-yellow-500/20"
              style={{
                background:
                  "linear-gradient(135deg, #f59e0b 0%, #d97706 40%, #fbbf24 70%, #b45309 100%)",
              }}
            >
              <span className="font-['Bebas_Neue'] text-3xl text-white leading-none drop-shadow">
                87
              </span>
              <span className="text-white/80 text-[9px] font-['Oswald'] font-bold uppercase tracking-widest">
                ПАП
              </span>
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-['Bebas_Neue'] text-2xl tracking-wider text-white leading-none">
                Алексей Волков
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <div className="flex items-center gap-1">
                  <Icon name="Shield" size={11} className="text-blue-400" fallback="Circle" />
                  <span className="text-white/60 text-xs font-['Oswald'] uppercase">
                    ФК Динамо
                  </span>
                </div>
                <div className="w-px h-3 bg-white/20" />
                <span className="text-white/40 text-xs font-['Oswald'] uppercase">РПЛ</span>
                <div className="w-px h-3 bg-white/20" />
                <span className="text-white/40 text-xs font-['Oswald'] uppercase">🇷🇺 Россия</span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-green-400 font-['Bebas_Neue'] text-2xl leading-none">8.1</div>
              <div className="text-white/40 text-[10px] font-['Oswald'] uppercase tracking-wide">
                Ср. оценка
              </div>
            </div>
          </div>
        </div>

        {/* Season Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mb-5 animate-fade-in delay-200">
          {seasonStats.map((stat) => (
            <div
              key={stat.label}
              className="glass border border-white/10 rounded-xl p-3 flex flex-col items-center gap-1 card-hover"
            >
              <Icon name={stat.icon} size={16} className={stat.color} fallback="Circle" />
              <div className={`font-['Bebas_Neue'] text-2xl leading-none ${stat.color}`}>
                {stat.value.toLocaleString()}
              </div>
              <div className="text-white/40 text-[9px] font-['Oswald'] uppercase tracking-wide text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Performance chart */}
        <div className="glass border border-white/10 rounded-xl p-4 mb-5 animate-fade-in delay-200">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="BarChart2" size={14} className="text-white/40" fallback="Circle" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              Голы по месяцам
            </span>
          </div>
          <div className="flex items-end gap-2 h-24">
            {monthBars.map((m) => {
              const heightPct = m.goals > 0 ? (m.goals / maxGoals) * 100 : 0;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end" style={{ height: 80 }}>
                    {m.goals > 0 ? (
                      <div
                        className="w-full rounded-t-sm bg-gradient-to-t from-green-600 to-green-400 transition-all duration-700 flex items-start justify-center pt-1"
                        style={{ height: `${heightPct}%`, minHeight: 8 }}
                      >
                        <span className="text-[9px] font-['Bebas_Neue'] text-black/70 leading-none">
                          {m.goals}
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-1 rounded-sm bg-white/10" />
                    )}
                  </div>
                  <span className="text-white/40 text-[9px] font-['Oswald'] uppercase tracking-wide">
                    {m.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attributes */}
        <div className="glass border border-white/10 rounded-xl p-4 mb-5 animate-fade-in delay-200">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Activity" size={14} className="text-white/40" fallback="Circle" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              Атрибуты игрока
            </span>
          </div>
          <div className="space-y-2.5">
            {attributes.map((attr) => (
              <div key={attr.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs font-['Oswald'] uppercase tracking-wide">
                    {attr.label}
                  </span>
                  <span className="text-white font-['Bebas_Neue'] text-sm tracking-wider">
                    {attr.value}
                  </span>
                </div>
                <div className="stat-bar">
                  <div
                    className={`stat-bar-fill bg-gradient-to-r ${attr.color}`}
                    style={{ width: `${attr.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* League Rankings */}
        <div className="glass border border-white/10 rounded-xl p-4 mb-5 animate-fade-in delay-300">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Trophy" size={14} className="text-yellow-400" fallback="Circle" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              Топ бомбардиров РПЛ
            </span>
          </div>
          <div className="space-y-1">
            {scorers.map((s) => (
              <div
                key={s.rank}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  s.isUser
                    ? "bg-green-500/10 border border-green-500/25"
                    : "hover:bg-white/3"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center font-['Bebas_Neue'] text-sm ${
                    s.rank === 1
                      ? "bg-yellow-400 text-black"
                      : s.rank === 2
                        ? "bg-white/20 text-white"
                        : s.rank === 3
                          ? "bg-orange-600/60 text-white"
                          : "bg-white/5 text-white/40"
                  }`}
                >
                  {s.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`font-['Oswald'] font-semibold text-sm ${s.isUser ? "text-green-400" : "text-white"}`}
                  >
                    {s.name}
                  </span>
                  {s.isUser && (
                    <span className="ml-2 text-green-400/60 text-[10px] font-['Oswald'] uppercase">
                      • Вы
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white/40 text-[10px] font-['Oswald'] uppercase">{s.club}</span>
                  <div className="flex items-center gap-1">
                    <span className={`font-['Bebas_Neue'] text-lg tracking-wider ${s.isUser ? "text-green-400" : "text-white"}`}>
                      {s.goals}
                    </span>
                    <span className="text-white/30 text-[10px] font-['Oswald'] uppercase">г</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Match History */}
        <div className="animate-fade-in delay-300">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="History" size={14} className="text-white/40" fallback="Circle" />
            <span className="text-white/50 text-xs font-['Oswald'] uppercase tracking-widest">
              Последние матчи
            </span>
          </div>
          <div className="glass border border-white/10 rounded-xl overflow-hidden divide-y divide-white/10">
            {matchHistory.map((m, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
                {/* Result */}
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center font-['Bebas_Neue'] text-xs shrink-0 ${resultBg[m.result]}`}
                >
                  {m.result}
                </div>
                {/* Opponent + score */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-['Oswald'] font-semibold truncate">
                      {m.opponent}
                    </span>
                    <span className="text-white/40 text-xs font-['Bebas_Neue'] tracking-wider">
                      {m.score}
                    </span>
                  </div>
                </div>
                {/* G + A */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">⚽</span>
                    <span className="text-white/60 text-xs font-['Bebas_Neue'] tracking-wider">
                      {m.goals}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="ArrowRight" size={10} className="text-blue-400" fallback="Circle" />
                    <span className="text-white/60 text-xs font-['Bebas_Neue'] tracking-wider">
                      {m.assists}
                    </span>
                  </div>
                  {/* Rating */}
                  <div
                    className={`w-10 text-right font-['Bebas_Neue'] text-base tracking-wider ${ratingColor(m.rating)}`}
                  >
                    {m.rating.toFixed(1)}
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
