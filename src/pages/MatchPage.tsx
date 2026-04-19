import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

interface Props { onBack: () => void; }

interface MatchEvent {
  minute: number;
  type: "goal" | "yellow" | "red" | "sub" | "miss";
  player: string;
  team: "home" | "away";
  assist?: string;
}

interface Player {
  id: number;
  name: string;
  pos: string;
  rating: number;
  stamina: number;
  goals: number;
  assists: number;
  onField: boolean;
}

const HOME_PLAYERS: Player[] = [
  { id: 1, name: "Волков", pos: "ПАП", rating: 87, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 2, name: "Тюкавин", pos: "НАП", rating: 84, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 3, name: "Захарян", pos: "ЦП", rating: 82, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 4, name: "Лаксальт", pos: "ЛП", rating: 80, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 5, name: "Фомин", pos: "ЦП", rating: 79, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 6, name: "Скопинцев", pos: "ЛЗ", rating: 77, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 7, name: "Варела", pos: "ПЗ", rating: 78, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 8, name: "Ордец", pos: "ЦЗ", rating: 79, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 9, name: "Бит-Сурин", pos: "ЦЗ", rating: 76, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 10, name: "Лещук", pos: "ВР", rating: 80, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 11, name: "Ассанье", pos: "ПП", rating: 78, stamina: 100, goals: 0, assists: 0, onField: true },
];

const AWAY_PLAYERS: Player[] = [
  { id: 12, name: "Промес", pos: "ЛП", rating: 85, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 13, name: "Мозес", pos: "ПЗ", rating: 82, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 14, name: "Литвинов", pos: "НАП", rating: 80, stamina: 100, goals: 0, assists: 0, onField: true },
  { id: 15, name: "Умяров", pos: "ЦП", rating: 79, stamina: 100, goals: 0, assists: 0, onField: true },
];

const generateEvent = (minute: number, homeScore: number, awayScore: number): MatchEvent | null => {
  const r = Math.random();
  if (r < 0.12) {
    const isHome = Math.random() > 0.45;
    const homePlayers = HOME_PLAYERS.filter(p => p.onField);
    const awayPlayers = AWAY_PLAYERS.filter(p => p.onField);
    const scorer = isHome
      ? homePlayers[Math.floor(Math.random() * homePlayers.length)]
      : awayPlayers[Math.floor(Math.random() * awayPlayers.length)];
    const assister = isHome
      ? homePlayers.filter(p => p.id !== scorer?.id)[0]
      : awayPlayers.filter(p => p.id !== scorer?.id)[0];
    return { minute, type: "goal", player: scorer?.name ?? "Игрок", team: isHome ? "home" : "away", assist: assister?.name };
  }
  if (r < 0.18) {
    const isHome = Math.random() > 0.5;
    const players = isHome ? HOME_PLAYERS : AWAY_PLAYERS;
    const p = players[Math.floor(Math.random() * players.length)];
    return { minute, type: "yellow", player: p.name, team: isHome ? "home" : "away" };
  }
  if (r < 0.22 && minute > 50) {
    const isHome = Math.random() > 0.5;
    return { minute, type: "sub", player: "Замена", team: isHome ? "home" : "away" };
  }
  return null;
};

const TACTICS = ["4-3-3", "4-4-2", "4-2-3-1", "3-5-2", "5-3-2", "4-1-4-1"];

export default function MatchPage({ onBack }: Props) {
  const [phase, setPhase] = useState<"setup" | "live" | "post">("setup");
  const [minute, setMinute] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [tactic, setTactic] = useState("4-3-3");
  const [intensity, setIntensity] = useState<"normal" | "high" | "low">("normal");
  const [lastGoal, setLastGoal] = useState(false);
  const [homeTeam] = useState("Динамо");
  const [awayTeam] = useState("Спартак");
  const [homePlayers, setHomePlayers] = useState<Player[]>(HOME_PLAYERS);
  const [showSubModal, setShowSubModal] = useState(false);
  const [possession, setPossession] = useState(52);
  const [shots, setShots] = useState({ home: 0, away: 0 });
  const [corners, setCorners] = useState({ home: 0, away: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startMatch = () => {
    setPhase("live");
    setMinute(0);
    setHomeScore(0);
    setAwayScore(0);
    setEvents([]);
    setShots({ home: 0, away: 0 });
    setCorners({ home: 0, away: 0 });
  };

  useEffect(() => {
    if (phase !== "live") return;
    const speed = intensity === "high" ? 200 : intensity === "low" ? 500 : 300;
    intervalRef.current = setInterval(() => {
      setMinute(m => {
        const next = m + 1;
        if (next >= 90) {
          clearInterval(intervalRef.current!);
          setPhase("post");
          return 90;
        }

        const ev = generateEvent(next, homeScore, awayScore);
        if (ev) {
          setEvents(prev => [ev, ...prev]);
          if (ev.type === "goal") {
            if (ev.team === "home") setHomeScore(s => s + 1);
            else setAwayScore(s => s + 1);
            setLastGoal(true);
            setTimeout(() => setLastGoal(false), 1500);
          }
          if (ev.type === "goal" || ev.type === "miss") {
            setShots(s => ev.team === "home" ? { ...s, home: s.home + 1 } : { ...s, away: s.away + 1 });
          }
          if (Math.random() < 0.3) {
            setCorners(c => ev.team === "home" ? { ...c, home: c.home + 1 } : { ...c, away: c.away + 1 });
          }
        }
        setPossession(Math.min(70, Math.max(30, 52 + Math.floor((Math.random() - 0.5) * 6))));
        return next;
      });
    }, speed);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase, intensity, homeScore, awayScore]);

  const makeSub = () => {
    setShowSubModal(false);
    setEvents(prev => [{ minute, type: "sub", player: "Волков → Захарян", team: "home" }, ...prev]);
  };

  const homeGoals = events.filter(e => e.type === "goal" && e.team === "home").length;
  const awayGoals = events.filter(e => e.type === "goal" && e.team === "away").length;
  const homeYellow = events.filter(e => e.type === "yellow" && e.team === "home").length;
  const awayYellow = events.filter(e => e.type === "yellow" && e.team === "away").length;
  const result = homeGoals > awayGoals ? "win" : homeGoals < awayGoals ? "loss" : "draw";

  // SETUP SCREEN
  if (phase === "setup") return (
    <div className="min-h-screen bg-[#080a0e] text-white overflow-y-auto">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 pt-6 mb-6 animate-fade-in">
          <button onClick={onBack} className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all">
            <Icon name="ChevronLeft" size={20} />
          </button>
          <h1 className="font-['Bebas_Neue'] text-4xl tracking-wider">НАСТРОЙКА МАТЧА</h1>
        </div>

        {/* Matchup */}
        <div className="glass border border-white/10 rounded-2xl p-6 mb-4 animate-fade-in delay-100">
          <p className="text-white/30 text-xs font-['Oswald'] uppercase tracking-widest mb-4">РПЛ · Тур 24</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-900/30 border border-blue-400/20 flex items-center justify-center">
                <Icon name="Shield" size={30} className="text-blue-300" />
              </div>
              <p className="font-['Bebas_Neue'] text-xl text-white">{homeTeam}</p>
              <span className="text-xs text-green-400 font-['Oswald']">ВАШ КЛУБ</span>
            </div>
            <div className="flex flex-col items-center gap-1 px-6">
              <span className="font-['Bebas_Neue'] text-3xl text-white/20">VS</span>
              <span className="text-xs text-white/30 font-['Oswald']">Лужники · 21:00</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600/20 to-red-900/30 border border-red-400/20 flex items-center justify-center">
                <Icon name="Shield" size={30} className="text-red-300" />
              </div>
              <p className="font-['Bebas_Neue'] text-xl text-white">{awayTeam}</p>
              <span className="text-xs text-white/30 font-['Oswald']">Сила: 83</span>
            </div>
          </div>
        </div>

        {/* Tactics */}
        <div className="glass border border-white/10 rounded-2xl p-5 mb-4 animate-fade-in delay-200">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="LayoutGrid" fallback="Grid" size={16} className="text-green-400" />
            <span className="text-white/60 text-xs font-['Oswald'] uppercase tracking-widest">Тактика</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {TACTICS.map(t => (
              <button key={t} onClick={() => setTactic(t)}
                className={`py-2.5 rounded-lg font-['Bebas_Neue'] text-lg tracking-wider transition-all ${tactic === t ? "bg-green-500 text-black" : "bg-white/5 text-white/60 hover:bg-white/10"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Intensity */}
        <div className="glass border border-white/10 rounded-2xl p-5 mb-6 animate-fade-in delay-300">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Zap" size={16} className="text-yellow-400" />
            <span className="text-white/60 text-xs font-['Oswald'] uppercase tracking-widest">Интенсивность игры</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {([["low", "Низкая", "text-blue-400"], ["normal", "Стандарт", "text-green-400"], ["high", "Высокая", "text-red-400"]] as const).map(([val, label, color]) => (
              <button key={val} onClick={() => setIntensity(val)}
                className={`py-2.5 rounded-lg font-['Oswald'] text-sm transition-all ${intensity === val ? "bg-white/15 border border-white/30" : "bg-white/5 border border-white/5 hover:bg-white/8"}`}>
                <span className={color}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <button onClick={startMatch}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-black font-['Bebas_Neue'] text-2xl tracking-widest hover:from-green-500 hover:to-green-400 transition-all active:scale-98 shadow-lg shadow-green-500/20 animate-fade-in delay-300">
          ▶ НАЧАТЬ МАТЧ
        </button>
      </div>
    </div>
  );

  // LIVE MATCH
  if (phase === "live") return (
    <div className="min-h-screen bg-[#080a0e] text-white overflow-y-auto">
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute inset-0 transition-all duration-700 ${lastGoal ? "bg-yellow-400/8" : ""}`} />
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-4 pb-10">
        {/* Live header */}
        <div className="flex items-center justify-between pt-5 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-400 text-xs font-['Oswald'] uppercase tracking-widest">Live</span>
          </div>
          <span className="text-white/40 text-xs font-['Oswald']">РПЛ · Тур 24 · Тактика {tactic}</span>
        </div>

        {/* Score Board */}
        <div className={`glass border rounded-2xl overflow-hidden mb-4 transition-all duration-300 ${lastGoal ? "border-yellow-400/50 shadow-lg shadow-yellow-400/10" : "border-white/10"}`}>
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex-1 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center mx-auto mb-2">
                <Icon name="Shield" size={22} className="text-blue-300" />
              </div>
              <p className="font-['Bebas_Neue'] text-lg text-white">{homeTeam}</p>
              {homeYellow > 0 && <span className="inline-block mt-1 px-1.5 py-0.5 bg-yellow-400/20 rounded text-yellow-400 text-xs">🟨 {homeYellow}</span>}
            </div>

            <div className="flex flex-col items-center gap-1 px-4">
              <div className={`font-['Bebas_Neue'] text-7xl leading-none transition-all ${lastGoal ? "text-yellow-300 scale-110" : "text-white"}`}>
                {homeGoals}<span className="text-white/25 mx-1">-</span>{awayGoals}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-400/20">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span className="font-['Bebas_Neue'] text-red-300 text-sm tracking-widest">{minute}'</span>
              </div>
            </div>

            <div className="flex-1 text-center">
              <div className="w-12 h-12 rounded-xl bg-red-600/15 border border-red-400/20 flex items-center justify-center mx-auto mb-2">
                <Icon name="Shield" size={22} className="text-red-300" />
              </div>
              <p className="font-['Bebas_Neue'] text-lg text-white">{awayTeam}</p>
              {awayYellow > 0 && <span className="inline-block mt-1 px-1.5 py-0.5 bg-yellow-400/20 rounded text-yellow-400 text-xs">🟨 {awayYellow}</span>}
            </div>
          </div>

          {/* Progress */}
          <div className="px-6 pb-4">
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-300"
                style={{ width: `${(minute / 90) * 100}%` }} />
            </div>
            <div className="flex justify-between text-[9px] text-white/20 font-['Oswald'] mt-1">
              <span>0'</span><span>45'</span><span>90'</span>
            </div>
          </div>
        </div>

        {/* Pitch visual */}
        <div className="pitch-bg rounded-xl border border-white/8 mb-4 overflow-hidden relative" style={{ height: 160 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full border border-white/15" />
            <div className="absolute w-full h-px bg-white/15" />
            <div className="absolute left-0 top-1/4 border border-white/15 rounded-sm" style={{ width: 50, height: "50%" }} />
            <div className="absolute right-0 top-1/4 border border-white/15 rounded-sm" style={{ width: 50, height: "50%" }} />
          </div>
          <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4">
            <span className="text-white/40 text-xs font-['Bebas_Neue']">ДИН {tactic}</span>
            <span className="text-white/40 text-xs font-['Bebas_Neue']">СПА 4-4-2</span>
          </div>
        </div>

        {/* Live stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Владение", home: possession, away: 100 - possession, pct: true },
            { label: "Удары", home: shots.home, away: shots.away, pct: false },
            { label: "Угловые", home: corners.home, away: corners.away, pct: false },
          ].map(s => (
            <div key={s.label} className="glass border border-white/8 rounded-xl p-3 text-center">
              <p className="text-white/30 text-[9px] font-['Oswald'] uppercase tracking-wider mb-2">{s.label}</p>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-['Bebas_Neue'] text-blue-300 text-base">{s.home}{s.pct ? "%" : ""}</span>
                <span className="font-['Bebas_Neue'] text-red-300 text-base">{s.away}{s.pct ? "%" : ""}</span>
              </div>
              <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button onClick={() => setShowSubModal(true)}
            className="glass border border-white/10 rounded-xl py-3 px-4 flex items-center gap-2 hover:border-green-500/30 hover:bg-green-500/5 transition-all">
            <Icon name="ArrowLeftRight" size={16} className="text-green-400" />
            <span className="font-['Oswald'] text-sm text-white/80">Замена</span>
          </button>
          <button onClick={() => setIntensity(i => i === "high" ? "low" : i === "low" ? "normal" : "high")}
            className="glass border border-white/10 rounded-xl py-3 px-4 flex items-center gap-2 hover:border-yellow-500/30 transition-all">
            <Icon name="Zap" size={16} className="text-yellow-400" />
            <span className="font-['Oswald'] text-sm text-white/80">{intensity === "high" ? "Высокая" : intensity === "low" ? "Низкая" : "Стандарт"}</span>
          </button>
        </div>

        {/* Events feed */}
        <div className="glass border border-white/10 rounded-xl p-4">
          <p className="text-white/30 text-xs font-['Oswald'] uppercase tracking-widest mb-3">События матча</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {events.length === 0 && (
              <p className="text-white/20 text-sm text-center py-4 font-['Oswald']">Матч начался...</p>
            )}
            {events.map((ev, i) => (
              <div key={i} className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all ${ev.type === "goal" ? "bg-yellow-400/10 border border-yellow-400/20" : "bg-white/3"}`}>
                <span className="font-['Bebas_Neue'] text-white/40 text-sm w-8">{ev.minute}'</span>
                <span className="text-base">
                  {ev.type === "goal" ? "⚽" : ev.type === "yellow" ? "🟨" : ev.type === "red" ? "🟥" : "🔄"}
                </span>
                <div className="flex-1">
                  <span className={`font-['Oswald'] text-sm font-semibold ${ev.team === "home" ? "text-blue-300" : "text-red-300"}`}>
                    {ev.player}
                  </span>
                  {ev.assist && <span className="text-white/30 text-xs ml-1">(пас: {ev.assist})</span>}
                  {ev.type === "goal" && (
                    <span className={`ml-2 text-xs font-['Bebas_Neue'] ${ev.team === "home" ? "text-blue-400" : "text-red-400"}`}>
                      {ev.team === "home" ? homeTeam : awayTeam}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub modal */}
      {showSubModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end">
          <div className="w-full max-w-xl mx-auto bg-[#111318] rounded-t-2xl p-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Bebas_Neue'] text-2xl">ЗАМЕНА</h3>
              <button onClick={() => setShowSubModal(false)} className="text-white/40 hover:text-white">
                <Icon name="X" size={20} />
              </button>
            </div>
            <p className="text-white/40 text-sm font-['Oswald'] mb-4">Выйдет: Ассанье (78) → Войдёт: Захарян (82)</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowSubModal(false)} className="py-3 rounded-xl border border-white/10 text-white/50 font-['Oswald']">Отмена</button>
              <button onClick={makeSub} className="py-3 rounded-xl bg-green-500 text-black font-['Bebas_Neue'] text-lg tracking-wider">ПОДТВЕРДИТЬ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // POST-MATCH
  const playerOfMatch = events.filter(e => e.type === "goal" && e.team === "home")[0]?.player ?? "Лещук";
  return (
    <div className="min-h-screen bg-[#080a0e] text-white overflow-y-auto">
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl ${result === "win" ? "bg-green-500/8" : result === "loss" ? "bg-red-500/8" : "bg-yellow-500/8"}`} />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-4 pb-16">
        <div className="pt-6 pb-4 flex items-center gap-3 animate-fade-in">
          <button onClick={onBack} className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all">
            <Icon name="ChevronLeft" size={20} />
          </button>
          <h1 className="font-['Bebas_Neue'] text-4xl tracking-wider">ИТОГИ МАТЧА</h1>
        </div>

        {/* Result banner */}
        <div className={`rounded-2xl p-6 mb-4 animate-fade-in delay-100 text-center ${result === "win" ? "bg-gradient-to-br from-green-600/20 to-green-900/10 border border-green-500/30" : result === "loss" ? "bg-gradient-to-br from-red-600/20 to-red-900/10 border border-red-500/30" : "bg-gradient-to-br from-yellow-500/10 to-yellow-900/5 border border-yellow-500/20"}`}>
          <p className={`font-['Bebas_Neue'] text-5xl mb-1 ${result === "win" ? "text-green-400" : result === "loss" ? "text-red-400" : "text-yellow-400"}`}>
            {result === "win" ? "ПОБЕДА!" : result === "loss" ? "ПОРАЖЕНИЕ" : "НИЧЬЯ"}
          </p>
          <div className="flex items-center justify-center gap-6 mt-3">
            <span className="font-['Bebas_Neue'] text-2xl text-white">{homeTeam}</span>
            <span className="font-['Bebas_Neue'] text-5xl text-yellow-400">{homeGoals} — {awayGoals}</span>
            <span className="font-['Bebas_Neue'] text-2xl text-white">{awayTeam}</span>
          </div>
          <p className="text-white/30 text-xs font-['Oswald'] mt-2 uppercase tracking-widest">РПЛ · Тур 24 · {tactic}</p>
        </div>

        {/* Stats */}
        <div className="glass border border-white/10 rounded-2xl p-5 mb-4 animate-fade-in delay-200">
          <p className="text-white/30 text-xs font-['Oswald'] uppercase tracking-widest mb-4">Статистика матча</p>
          {[
            { label: "Владение", home: `${possession}%`, away: `${100 - possession}%`, hv: possession, av: 100 - possession },
            { label: "Удары", home: shots.home, away: shots.away, hv: shots.home, av: shots.away },
            { label: "Угловые", home: corners.home, away: corners.away, hv: corners.home, av: corners.away },
            { label: "Голы", home: homeGoals, away: awayGoals, hv: homeGoals, av: awayGoals },
          ].map(s => {
            const tot = (Number(s.hv) || 0) + (Number(s.av) || 0) || 1;
            const hp = Math.round((Number(s.hv) / tot) * 100);
            return (
              <div key={s.label} className="mb-3">
                <div className="flex justify-between text-xs font-['Oswald'] mb-1">
                  <span className="text-blue-300 font-semibold">{s.home}</span>
                  <span className="text-white/40">{s.label}</span>
                  <span className="text-red-300 font-semibold">{s.away}</span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-400 rounded-l-full transition-all" style={{ width: `${hp}%` }} />
                  <div className="h-full bg-red-400 rounded-r-full flex-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Player of match */}
        <div className="glass border border-yellow-400/20 rounded-2xl p-5 mb-4 animate-fade-in delay-200">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Star" size={16} className="text-yellow-400" />
            <p className="text-yellow-400/80 text-xs font-['Oswald'] uppercase tracking-widest">Игрок матча</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 border border-yellow-400/20 flex items-center justify-center">
              <span className="font-['Bebas_Neue'] text-2xl text-yellow-400">⭐</span>
            </div>
            <div>
              <p className="font-['Bebas_Neue'] text-2xl text-white">{playerOfMatch}</p>
              <p className="text-white/40 text-sm font-['Oswald']">ФК {homeTeam} · Оценка матча</p>
            </div>
            <div className="ml-auto">
              <div className="rating-badge w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="font-['Bebas_Neue'] text-2xl text-black">
                  {result === "win" ? "9.2" : result === "draw" ? "7.8" : "6.9"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Events log */}
        {events.filter(e => e.type === "goal").length > 0 && (
          <div className="glass border border-white/10 rounded-2xl p-5 mb-6 animate-fade-in delay-300">
            <p className="text-white/30 text-xs font-['Oswald'] uppercase tracking-widest mb-3">Голы матча</p>
            {events.filter(e => e.type === "goal").reverse().map((ev, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                <span className="text-white/30 font-['Bebas_Neue'] w-8">{ev.minute}'</span>
                <span>⚽</span>
                <span className={`font-['Oswald'] font-semibold ${ev.team === "home" ? "text-blue-300" : "text-red-300"}`}>{ev.player}</span>
                {ev.assist && <span className="text-white/30 text-xs">(пас: {ev.assist})</span>}
                <span className={`ml-auto text-xs font-['Bebas_Neue'] ${ev.team === "home" ? "text-blue-400" : "text-red-400"}`}>
                  {ev.team === "home" ? homeTeam : awayTeam}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 animate-fade-in delay-300">
          <button onClick={onBack} className="py-4 rounded-xl glass border border-white/10 font-['Oswald'] text-white/70 hover:text-white transition-all">
            В меню
          </button>
          <button onClick={startMatch} className="py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-black font-['Bebas_Neue'] text-xl tracking-wider hover:from-green-500 hover:to-green-400 transition-all shadow-lg shadow-green-500/20">
            РЕВАНШ
          </button>
        </div>
      </div>
    </div>
  );
}
