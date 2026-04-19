import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LeaguesPageProps {
  onBack: () => void;
}

type ActiveTab = "table" | "round" | "calendar";

const LEAGUES = ["АПЛ", "Ла Лига", "Серия А", "Бундеслига", "РПЛ", "Лига 1"];

const TEAM_COLORS: Record<string, string> = {
  Зенит: "#0a6fc2",
  ЦСКА: "#c00000",
  Динамо: "#0055b3",
  Спартак: "#cc0000",
  Локомотив: "#006b2d",
  Краснодар: "#00a651",
  Ростов: "#003d8f",
  Сочи: "#0f4fa8",
  Рубин: "#a00000",
  "Арсенал Тула": "#ffd700",
  "Крылья Советов": "#003087",
  Химки: "#009900",
};

interface StandingRow {
  pos: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  pts: number;
  isUser?: boolean;
  isRival?: boolean;
}

const RPL_STANDINGS: StandingRow[] = [
  { pos: 1, team: "Зенит",      played: 28, won: 13, drawn: 2, lost: 1, gf: 38, ga: 12, pts: 41, isRival: true },
  { pos: 2, team: "ЦСКА",       played: 28, won: 12, drawn: 3, lost: 1, gf: 34, ga: 14, pts: 39 },
  { pos: 3, team: "Динамо",     played: 28, won: 11, drawn: 3, lost: 2, gf: 29, ga: 15, pts: 36, isUser: true },
  { pos: 4, team: "Спартак",    played: 28, won: 10, drawn: 4, lost: 2, gf: 28, ga: 18, pts: 34 },
  { pos: 5, team: "Локомотив",  played: 28, won: 9,  drawn: 4, lost: 3, gf: 25, ga: 21, pts: 31 },
  { pos: 6, team: "Краснодар",  played: 28, won: 8,  drawn: 5, lost: 3, gf: 22, ga: 20, pts: 29 },
  { pos: 7, team: "Ростов",     played: 28, won: 7,  drawn: 3, lost: 6, gf: 18, ga: 22, pts: 24 },
  { pos: 8, team: "Сочи",       played: 28, won: 5,  drawn: 4, lost: 7, gf: 15, ga: 28, pts: 19 },
];

interface MatchResult {
  home: string;
  away: string;
  homeGoals: number;
  awayGoals: number;
  venue: string;
  isUserMatch?: boolean;
}

const ROUND_MATCHES: MatchResult[] = [
  { home: "Зенит",            away: "Локомотив",       homeGoals: 2, awayGoals: 0, venue: "Газпром Арена" },
  { home: "ЦСКА",             away: "Краснодар",        homeGoals: 1, awayGoals: 1, venue: "ВЭБ Арена" },
  { home: "Динамо",           away: "Спартак",          homeGoals: 3, awayGoals: 1, venue: "ВТБ Арена", isUserMatch: true },
  { home: "Ростов",           away: "Сочи",             homeGoals: 0, awayGoals: 2, venue: "Ростов Арена" },
  { home: "Рубин",            away: "Арсенал Тула",     homeGoals: 1, awayGoals: 0, venue: "Ак Барс Арена" },
  { home: "Крылья Советов",   away: "Химки",            homeGoals: 2, awayGoals: 2, venue: "Солидарность Самара" },
];

interface Fixture {
  round: number;
  home: string;
  away: string;
  date: string;
  time: string;
  venue: string;
  isDerby?: boolean;
  isHome: boolean;
}

const FIXTURES: Fixture[] = [
  { round: 25, home: "Динамо",   away: "Зенит",      date: "Сб 22 апр", time: "19:00", venue: "ВТБ Арена",           isDerby: true,  isHome: true },
  { round: 26, home: "Краснодар", away: "Динамо",    date: "Вс 29 апр", time: "17:00", venue: "Краснодар Стадион",                    isHome: false },
  { round: 27, home: "Динамо",   away: "Ростов",     date: "Сб 6 май",  time: "16:00", venue: "ВТБ Арена",                            isHome: true },
  { round: 28, home: "Спартак",  away: "Динамо",     date: "Вс 13 май", time: "20:45", venue: "Лужники",             isDerby: true,  isHome: false },
  { round: 29, home: "Динамо",   away: "Локомотив",  date: "Сб 20 май", time: "19:00", venue: "ВТБ Арена",                            isHome: true },
];

function TeamShield({ team, size = 20 }: { team: string; size?: number }) {
  const color = TEAM_COLORS[team] ?? "#555";
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 2L3 5v5c0 4.418 3.134 7.658 7 8.5C13.866 17.658 17 14.418 17 10V5L10 2Z"
        fill={color}
        fillOpacity="0.9"
        stroke={color}
        strokeWidth="0.5"
      />
    </svg>
  );
}

function PosLabel({ pos }: { pos: number }) {
  if (pos === 1) return <span className="text-[#FFD700] font-bold font-['Oswald']">1</span>;
  if (pos === 2) return <span className="text-[#C0C0C0] font-bold font-['Oswald']">2</span>;
  if (pos === 3) return <span className="text-[#CD7F32] font-bold font-['Oswald']">3</span>;
  if (pos >= 7) return <span className="text-red-400/80 font-['Oswald']">{pos}</span>;
  return <span className="text-white/60 font-['Oswald']">{pos}</span>;
}

function LeagueTable() {
  return (
    <div className="animate-fade-in">
      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[36px_1fr_32px_28px_28px_28px_52px_36px] gap-0 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest text-center">#</span>
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest">Клуб</span>
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest text-center">М</span>
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest text-center">В</span>
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest text-center">Н</span>
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest text-center">П</span>
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest text-center">Г</span>
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest text-center">О</span>
        </div>

        {RPL_STANDINGS.map((row, i) => {
          const isRelZ = row.pos >= 7;
          let rowBg = "";
          if (row.isUser) rowBg = "bg-blue-500/8";
          else if (row.isRival) rowBg = "bg-green-500/6";
          else if (isRelZ) rowBg = "bg-red-500/5";

          return (
            <div
              key={row.team}
              className={`relative grid grid-cols-[36px_1fr_32px_28px_28px_28px_52px_36px] gap-0 px-4 py-3 ${rowBg} ${
                i < RPL_STANDINGS.length - 1 ? "border-b border-white/[0.05]" : ""
              } ${row.isUser ? "shadow-[inset_0_0_0_1px_rgba(59,130,246,0.25)]" : ""} transition-colors hover:bg-white/[0.03]`}
            >
              {/* Relegation zone indicator */}
              {row.pos === 7 && (
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-red-500/40" />
              )}

              <div className="flex items-center justify-center">
                <PosLabel pos={row.pos} />
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <TeamShield team={row.team} size={16} />
                <span
                  className={`text-sm font-['Oswald'] tracking-wide truncate ${
                    row.isUser
                      ? "text-blue-300 font-semibold"
                      : row.isRival
                      ? "text-green-300"
                      : "text-white/90"
                  }`}
                >
                  {row.team}
                </span>
                {row.isUser && (
                  <span className="shrink-0 text-[8px] font-['Oswald'] uppercase tracking-widest bg-blue-500/20 border border-blue-400/30 text-blue-300 px-1.5 py-0.5 rounded-full">
                    Вы
                  </span>
                )}
              </div>

              <span className="text-white/50 text-xs font-['Oswald'] text-center self-center">{row.played}</span>
              <span className="text-green-400/80 text-xs font-['Oswald'] text-center self-center">{row.won}</span>
              <span className="text-white/40 text-xs font-['Oswald'] text-center self-center">{row.drawn}</span>
              <span className="text-red-400/70 text-xs font-['Oswald'] text-center self-center">{row.lost}</span>
              <span className="text-white/50 text-[11px] font-['Oswald'] text-center self-center">
                {row.gf}:{row.ga}
              </span>
              <div className="flex items-center justify-center">
                <span
                  className={`text-sm font-['Bebas_Neue'] tracking-wider ${
                    row.pos === 1
                      ? "text-[#FFD700]"
                      : row.pos === 2
                      ? "text-[#C0C0C0]"
                      : row.pos === 3
                      ? "text-[#CD7F32]"
                      : row.isUser
                      ? "text-blue-300"
                      : "text-white"
                  }`}
                >
                  {row.pts}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#FFD700]/60" />
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-wider">Лига Чемпионов</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-red-500/40" />
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-wider">Вылет</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-blue-500/40" />
          <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-wider">Ваша команда</span>
        </div>
      </div>
    </div>
  );
}

function RoundTab({ currentRound, onPrev, onNext }: { currentRound: number; onPrev: () => void; onNext: () => void }) {
  return (
    <div className="animate-fade-in">
      {/* Round nav */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onPrev}
          className="flex items-center justify-center w-9 h-9 glass rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all active:scale-95"
        >
          <Icon name="ChevronLeft" size={18} fallback="Circle" />
        </button>
        <div className="text-center">
          <div className="text-2xl font-['Bebas_Neue'] tracking-[0.15em] text-white">
            ТУР {currentRound}
          </div>
          <div className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest">РПЛ · Сезон 2025/26</div>
        </div>
        <button
          onClick={onNext}
          className="flex items-center justify-center w-9 h-9 glass rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all active:scale-95"
        >
          <Icon name="ChevronRight" size={18} fallback="Circle" />
        </button>
      </div>

      {/* Match cards */}
      <div className="grid grid-cols-1 gap-3">
        {ROUND_MATCHES.map((match) => {
          const homeWon = match.homeGoals > match.awayGoals;
          const awayWon = match.awayGoals > match.homeGoals;
          const isDraw = match.homeGoals === match.awayGoals;

          return (
            <div
              key={`${match.home}-${match.away}`}
              className={`relative glass rounded-2xl border overflow-hidden transition-all ${
                match.isUserMatch
                  ? "border-green-400/35 shadow-[0_0_20px_rgba(34,197,94,0.08)]"
                  : "border-white/10"
              }`}
            >
              {match.isUserMatch && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 pointer-events-none" />
              )}

              {/* Venue + badge row */}
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <div className="flex items-center gap-1.5">
                  <Icon name="MapPin" size={10} className="text-white/25" fallback="Circle" />
                  <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-wider">
                    {match.venue}
                  </span>
                </div>
                {match.isUserMatch && (
                  <span className="text-[9px] font-['Bebas_Neue'] tracking-[0.15em] bg-green-500/20 border border-green-400/30 text-green-300 px-2 py-0.5 rounded-full">
                    ВАШ МАТЧ
                  </span>
                )}
              </div>

              {/* Score row */}
              <div className="flex items-center justify-between px-4 pb-4 gap-3">
                {/* Home team */}
                <div className="flex-1 flex items-center gap-2.5 justify-end">
                  <span
                    className={`text-sm font-['Oswald'] tracking-wide text-right leading-tight ${
                      homeWon ? "text-white" : isDraw ? "text-white/60" : "text-white/35"
                    }`}
                  >
                    {match.home}
                  </span>
                  <TeamShield team={match.home} size={22} />
                </div>

                {/* Score */}
                <div className="flex items-center gap-1 shrink-0">
                  <span
                    className={`text-3xl font-['Bebas_Neue'] tracking-wider leading-none ${
                      homeWon ? "text-[#FFD700]" : isDraw ? "text-white/70" : "text-white/40"
                    }`}
                  >
                    {match.homeGoals}
                  </span>
                  <span className="text-white/25 text-xl font-['Bebas_Neue'] leading-none px-0.5">:</span>
                  <span
                    className={`text-3xl font-['Bebas_Neue'] tracking-wider leading-none ${
                      awayWon ? "text-[#FFD700]" : isDraw ? "text-white/70" : "text-white/40"
                    }`}
                  >
                    {match.awayGoals}
                  </span>
                </div>

                {/* Away team */}
                <div className="flex-1 flex items-center gap-2.5 justify-start">
                  <TeamShield team={match.away} size={22} />
                  <span
                    className={`text-sm font-['Oswald'] tracking-wide leading-tight ${
                      awayWon ? "text-white" : isDraw ? "text-white/60" : "text-white/35"
                    }`}
                  >
                    {match.away}
                  </span>
                </div>
              </div>

              {/* Bottom accent for user match */}
              {match.isUserMatch && (
                <div className="h-[2px] bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarTab() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="CalendarDays" size={14} className="text-green-400/60" fallback="Circle" />
        <span className="text-white/40 text-xs font-['Oswald'] uppercase tracking-widest">
          Предстоящие матчи · Динамо
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-6 bottom-6 w-[1px] bg-gradient-to-b from-green-400/30 via-white/10 to-transparent pointer-events-none" />

        <div className="flex flex-col gap-3">
          {FIXTURES.map((fix, i) => (
            <div key={fix.round} className="flex gap-4 items-start">
              {/* Round dot */}
              <div className="shrink-0 flex flex-col items-center pt-1">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-['Bebas_Neue'] tracking-wider border transition-all ${
                    fix.isDerby
                      ? "bg-red-500/15 border-red-400/35 text-red-300"
                      : "glass border-white/15 text-white/50"
                  }`}
                >
                  {fix.round}
                </div>
              </div>

              {/* Card */}
              <div
                className={`flex-1 glass rounded-2xl border overflow-hidden transition-all ${
                  fix.isDerby
                    ? "border-red-400/25 shadow-[0_0_16px_rgba(239,68,68,0.06)]"
                    : "border-white/10"
                } ${i === 0 ? "ring-1 ring-green-400/20" : ""}`}
              >
                {fix.isDerby && (
                  <div className="h-[2px] bg-gradient-to-r from-transparent via-red-400/60 to-transparent" />
                )}

                <div className="px-4 pt-3 pb-1 flex items-center justify-between">
                  {/* Date pill */}
                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                    <Icon name="Clock" size={9} className="text-white/30" fallback="Circle" />
                    <span className="text-white/50 text-[10px] font-['Oswald'] uppercase tracking-wider">
                      {fix.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {fix.isDerby && (
                      <span className="text-[9px] font-['Bebas_Neue'] tracking-[0.1em] bg-red-500/20 border border-red-400/30 text-red-300 px-2 py-0.5 rounded-full">
                        Дерби!
                      </span>
                    )}
                    <span
                      className={`text-[9px] font-['Bebas_Neue'] tracking-[0.1em] px-2 py-0.5 rounded-full border ${
                        fix.isHome
                          ? "bg-green-500/15 border-green-400/30 text-green-300"
                          : "bg-white/5 border-white/15 text-white/40"
                      }`}
                    >
                      {fix.isHome ? "Дома" : "В гостях"}
                    </span>
                  </div>
                </div>

                {/* Teams + time */}
                <div className="flex items-center px-4 py-3 gap-3">
                  <div className="flex-1 flex items-center gap-2">
                    <TeamShield team={fix.home} size={20} />
                    <span
                      className={`text-sm font-['Oswald'] tracking-wide ${
                        fix.home === "Динамо" ? "text-blue-300 font-semibold" : "text-white/80"
                      }`}
                    >
                      {fix.home}
                    </span>
                  </div>

                  <div className="shrink-0 flex flex-col items-center gap-0.5">
                    <span className="text-[#FFD700]/80 text-lg font-['Bebas_Neue'] tracking-widest leading-none">
                      {fix.time}
                    </span>
                    <span className="text-white/20 text-[9px] font-['Oswald'] uppercase tracking-wider">vs</span>
                  </div>

                  <div className="flex-1 flex items-center gap-2 justify-end">
                    <span
                      className={`text-sm font-['Oswald'] tracking-wide text-right ${
                        fix.away === "Динамо" ? "text-blue-300 font-semibold" : "text-white/80"
                      }`}
                    >
                      {fix.away}
                    </span>
                    <TeamShield team={fix.away} size={20} />
                  </div>
                </div>

                {/* Venue + play button */}
                <div className="flex items-center justify-between px-4 pb-3">
                  <div className="flex items-center gap-1.5">
                    <Icon name="MapPin" size={9} className="text-white/20" fallback="Circle" />
                    <span className="text-white/25 text-[10px] font-['Oswald'] uppercase tracking-wider">
                      {fix.venue}
                    </span>
                  </div>
                  <button
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-['Bebas_Neue'] tracking-[0.12em] border transition-all active:scale-95 ${
                      fix.isDerby
                        ? "bg-red-500/20 border-red-400/30 text-red-200 hover:bg-red-500/30"
                        : "bg-green-500/15 border-green-400/25 text-green-300 hover:bg-green-500/25"
                    }`}
                  >
                    <Icon name="Play" size={9} fallback="Circle" />
                    СЫГРАТЬ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LeaguesPage({ onBack }: LeaguesPageProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("table");
  const [selectedLeague, setSelectedLeague] = useState("РПЛ");
  const [currentRound, setCurrentRound] = useState(24);

  const tabs: { id: ActiveTab; label: string; icon: string }[] = [
    { id: "table",    label: "Таблица",  icon: "LayoutList" },
    { id: "round",    label: "Тур",      icon: "Swords" },
    { id: "calendar", label: "Календарь", icon: "CalendarDays" },
  ];

  return (
    <div className="min-h-screen bg-[#080a0e] text-white overflow-y-auto">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[300px] rounded-full bg-blue-700/5 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-green-600/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-yellow-500/3 blur-3xl" />
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
            <div className="w-8 h-8 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
              <Icon name="Trophy" size={16} fallback="Circle" className="text-[#FFD700]" />
            </div>
            <div>
              <h1 className="text-2xl font-['Bebas_Neue'] tracking-[0.12em] text-white leading-none">
                ЛИГИ
              </h1>
              <p className="text-white/30 text-[9px] font-['Oswald'] uppercase tracking-widest leading-none mt-0.5">
                Сезон 2025/26
              </p>
            </div>
          </div>

          {/* Live badge */}
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-red-400/20 bg-red-500/5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-300/80 text-[9px] font-['Oswald'] uppercase tracking-widest">Live</span>
          </div>
        </div>

        {/* League selector pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-5 animate-fade-in delay-100 scrollbar-hide">
          {LEAGUES.map((league) => {
            const isActive = selectedLeague === league;
            return (
              <button
                key={league}
                onClick={() => setSelectedLeague(league)}
                className={`shrink-0 px-4 py-2 rounded-xl font-['Oswald'] text-xs uppercase tracking-widest transition-all active:scale-95 border ${
                  isActive
                    ? "bg-[#FFD700]/90 text-black border-[#FFD700] font-semibold shadow-[0_0_12px_rgba(255,215,0,0.3)]"
                    : "glass border-white/10 text-white/50 hover:text-white hover:border-white/20"
                }`}
              >
                {league}
              </button>
            );
          })}
        </div>

        {/* Main tab selector */}
        <div className="flex gap-1 p-1 glass rounded-2xl border border-white/10 mb-6 animate-fade-in delay-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all font-['Oswald'] text-xs uppercase tracking-widest active:scale-95 ${
                activeTab === tab.id
                  ? "bg-white/10 text-white border border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <Icon name={tab.icon} size={12} fallback="Circle" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats strip (above table) */}
        {activeTab === "table" && (
          <div className="grid grid-cols-3 gap-3 mb-5 animate-fade-in delay-200">
            {[
              { label: "Лидер", value: "Зенит", sub: "41 очко", icon: "Crown", color: "#FFD700" },
              { label: "Ваша позиция", value: "3-е место", sub: "Динамо", icon: "Target", color: "#3b82f6" },
              { label: "До лидера", value: "−5 очков", sub: "16 туров осталось", icon: "TrendingUp", color: "#22c55e" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl border border-white/10 p-3 flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-1">
                  <Icon name={stat.icon} size={10} fallback="Circle" style={{ color: stat.color }} />
                  <span className="text-white/30 text-[9px] font-['Oswald'] uppercase tracking-widest">{stat.label}</span>
                </div>
                <div className="font-['Bebas_Neue'] text-base tracking-wider leading-none" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-white/25 text-[9px] font-['Oswald']">{stat.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tab content */}
        <div className="animate-fade-in delay-200">
          {activeTab === "table" && <LeagueTable />}
          {activeTab === "round" && (
            <RoundTab
              currentRound={currentRound}
              onPrev={() => setCurrentRound((r) => Math.max(1, r - 1))}
              onNext={() => setCurrentRound((r) => Math.min(30, r + 1))}
            />
          )}
          {activeTab === "calendar" && <CalendarTab />}
        </div>
      </div>
    </div>
  );
}
