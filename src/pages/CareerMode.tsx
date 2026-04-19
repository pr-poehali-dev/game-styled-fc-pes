import { useState } from "react";
import type { ReactNode } from "react";
import Icon from "@/components/ui/icon";

interface CareerModeProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

type ActiveTab = "career" | "transfers" | "dev" | "history";

// ─────────────────────────────────────────────
// Small reusable pieces
// ─────────────────────────────────────────────

function SectionLabel({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon name={icon} size={12} className="text-white/30" fallback="Circle" />
      <span className="text-white/40 text-[10px] font-['Oswald'] uppercase tracking-widest">{children}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Top player card (always visible)
// ─────────────────────────────────────────────

function PlayerHeader() {
  const xp = 6720;
  const xpMax = 10000;
  const xpPct = (xp / xpMax) * 100;

  const goals = { done: 12, total: 25 };
  const goalsPct = (goals.done / goals.total) * 100;

  return (
    <div className="animate-fade-in delay-100 space-y-3">
      {/* Avatar + info row */}
      <div className="glass rounded-2xl border border-white/10 p-4 flex items-center gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.35)]">
            <span className="text-white text-xl font-['Bebas_Neue'] tracking-wider">АВ</span>
          </div>
          {/* Rating badge */}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-[#FFD700] flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.5)]">
            <span className="text-black text-sm font-['Bebas_Neue'] tracking-wider leading-none">87</span>
          </div>
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="font-['Bebas_Neue'] text-2xl tracking-[0.1em] text-white leading-none">
            АЛЕКСЕЙ ВОЛКОВ
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-white/40 text-xs font-['Oswald'] uppercase tracking-wide">ПАП · Динамо</span>
            <span className="text-base leading-none">🇷🇺</span>
          </div>
          {/* XP bar */}
          <div className="mt-2.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-white/30 text-[9px] font-['Oswald'] uppercase tracking-widest">
                Уровень 12 → 13
              </span>
              <span className="text-[#FFD700]/70 text-[9px] font-['Oswald']">{xp.toLocaleString("ru")} / {xpMax.toLocaleString("ru")} XP</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FFD700] to-yellow-300 shadow-[0_0_6px_rgba(255,215,0,0.6)]"
                style={{ width: `${xpPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Season goals strip */}
      <div className="flex gap-2">
        {/* Goals pill */}
        <div className="flex-1 glass rounded-xl border border-white/10 p-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-base leading-none">⚽</span>
              <span className="text-white/60 text-[10px] font-['Oswald'] uppercase tracking-wider">25 голов</span>
            </div>
            <span className="text-white/40 text-[9px] font-['Oswald']">{goals.done}/{goals.total}</span>
          </div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: `${goalsPct}%` }} />
          </div>
        </div>

        {/* Top-3 pill */}
        <div className="flex-1 glass rounded-xl border border-green-400/30 bg-green-500/5 p-3 flex items-center gap-2">
          <span className="text-base leading-none">🏆</span>
          <div className="min-w-0">
            <div className="text-green-300 text-[10px] font-['Oswald'] uppercase tracking-wide leading-tight">Топ-3 РПЛ</div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-green-400/70 text-[9px] font-['Oswald']">Выполнено</span>
            </div>
          </div>
        </div>

        {/* MVP pill */}
        <div className="flex-1 glass rounded-xl border border-yellow-400/20 bg-yellow-500/4 p-3 flex items-center gap-2">
          <span className="text-base leading-none">🥇</span>
          <div className="min-w-0">
            <div className="text-yellow-300/80 text-[10px] font-['Oswald'] uppercase tracking-wide leading-tight">Лучший игрок</div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-400/60 text-[9px] font-['Oswald']">В процессе</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Tab 1: Карьера
// ─────────────────────────────────────────────

const seasonStats = [
  { label: "Матчей", value: "18", icon: "Swords", color: "#60a5fa", sub: "сыграно" },
  { label: "Голов", value: "12", icon: "Flame", color: "#22c55e", sub: "забито" },
  { label: "Передач", value: "9", icon: "Zap", color: "#a78bfa", sub: "голевых" },
  { label: "Рейтинг", value: "8.4", icon: "Star", color: "#FFD700", sub: "средний" },
];

const recentForm = [
  { result: "W", score: "3-1", color: "bg-green-500", text: "text-white" },
  { result: "W", score: "2-0", color: "bg-green-500", text: "text-white" },
  { result: "D", score: "1-1", color: "bg-yellow-500", text: "text-black" },
  { result: "W", score: "1-0", color: "bg-green-500", text: "text-white" },
  { result: "L", score: "0-2", color: "bg-red-500", text: "text-white" },
];

function CareerTab() {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Season stats grid */}
      <div>
        <SectionLabel icon="BarChart2">Статистика сезона</SectionLabel>
        <div className="grid grid-cols-2 gap-3">
          {seasonStats.map((s) => (
            <div key={s.label} className="glass rounded-xl border border-white/10 p-3.5 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${s.color}18`, border: `1px solid ${s.color}35` }}
              >
                <Icon name={s.icon} size={18} fallback="Circle" style={{ color: s.color }} />
              </div>
              <div>
                <div className="font-['Bebas_Neue'] text-2xl tracking-wider leading-none" style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="text-white/35 text-[9px] font-['Oswald'] uppercase tracking-widest">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next match */}
      <div>
        <SectionLabel icon="CalendarDays">Следующий матч</SectionLabel>
        <div className="glass rounded-2xl border border-red-400/25 bg-red-500/4 overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.07)]">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-red-400/60 to-transparent" />
          <div className="p-4">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest">Тур 25 · Сб 22 апр · 19:00</span>
              </div>
              <span className="text-[9px] font-['Bebas_Neue'] tracking-[0.15em] bg-red-500/25 border border-red-400/35 text-red-300 px-2.5 py-1 rounded-full">
                ДЕРБИ
              </span>
            </div>

            {/* Teams */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex-1 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 mx-auto mb-1.5 flex items-center justify-center">
                  <span className="text-white text-xs font-['Bebas_Neue'] tracking-wider">ДИН</span>
                </div>
                <div className="text-white font-['Oswald'] text-sm tracking-wide">Динамо</div>
                <div className="text-white/30 text-[9px] font-['Oswald'] uppercase">Дома</div>
              </div>

              <div className="text-center">
                <div className="text-[#FFD700] text-3xl font-['Bebas_Neue'] tracking-[0.2em] leading-none">VS</div>
              </div>

              <div className="flex-1 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-700 mx-auto mb-1.5 flex items-center justify-center">
                  <span className="text-white text-xs font-['Bebas_Neue'] tracking-wider">ЗЕН</span>
                </div>
                <div className="text-white font-['Oswald'] text-sm tracking-wide">Зенит</div>
                <div className="text-white/30 text-[9px] font-['Oswald'] uppercase">В гостях</div>
              </div>
            </div>

            {/* Strength bars */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-blue-300 text-[10px] font-['Oswald'] w-14 text-right">Динамо 86</span>
                <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden relative">
                  <div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: "86%" }} />
                </div>
                <span className="text-sky-300 text-[10px] font-['Oswald'] w-14">91 Зенит</span>
              </div>
              <div className="text-center">
                <span className="text-white/20 text-[9px] font-['Oswald'] uppercase tracking-widest">сила команды</span>
              </div>
            </div>

            {/* Play button */}
            <button
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-black font-['Bebas_Neue'] text-lg tracking-[0.2em] hover:from-green-500 hover:to-green-400 transition-all active:scale-[0.98] shadow-[0_4px_20px_rgba(34,197,94,0.35)] flex items-center justify-center gap-2"
            >
              <Icon name="Play" size={16} fallback="Circle" />
              ИГРАТЬ
            </button>
          </div>
        </div>
      </div>

      {/* Recent form */}
      <div>
        <SectionLabel icon="Activity">Последние матчи</SectionLabel>
        <div className="glass rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between gap-2">
            {recentForm.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-['Bebas_Neue'] text-lg tracking-wider ${m.color} ${m.text} shadow-sm`}
                >
                  {m.result}
                </div>
                <span className="text-white/35 text-[9px] font-['Oswald'] tracking-wider">{m.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coach message */}
      <div>
        <SectionLabel icon="MessageCircle">Тренер</SectionLabel>
        <div className="glass rounded-2xl border border-white/10 p-4 flex gap-3">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 border border-white/10 flex items-center justify-center">
            <Icon name="User" size={18} className="text-white/50" fallback="Circle" />
          </div>
          <div className="flex-1">
            <div className="text-white/30 text-[9px] font-['Oswald'] uppercase tracking-widest mb-1.5">Главный тренер</div>
            <p className="text-white/75 text-sm font-['Oswald'] leading-relaxed">
              «Алексей, ты в отличной форме! Готовься к дерби с Зенитом в субботу.»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Tab 2: Трансферы
// ─────────────────────────────────────────────

const clubOffers = [
  { club: "Барселона", flag: "🇪🇸", offer: "€45M", color: "#a50044", abbr: "БАР", priority: true },
  { club: "Манчестер Сити", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", offer: "€38M", color: "#6caddf", abbr: "МСИ", priority: false },
  { club: "Байер Леверкузен", flag: "🇩🇪", offer: "€29M", color: "#e32221", abbr: "БАЙ", priority: false },
];

const transferTargets = [
  { name: "Педри", pos: "ЦП", rating: 88, price: "€55M", club: "Барселона", note: "" },
  { name: "Жиру", pos: "НАП", rating: 82, price: "€8M", club: "Милан", note: "Ветеран" },
  { name: "Антони", pos: "ПП", rating: 80, price: "€15M", club: "Ман Юнайтед", note: "" },
];

function TransfersTab() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* My value */}
      <div className="glass rounded-2xl border border-[#FFD700]/20 bg-yellow-500/3 p-4 flex items-center justify-between">
        <div>
          <div className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest mb-1">Рыночная стоимость</div>
          <div className="font-['Bebas_Neue'] text-3xl tracking-wider text-[#FFD700] leading-none">€ 12.5M</div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Icon name="TrendingUp" size={12} className="text-green-400" fallback="Circle" />
            <span className="text-green-400 text-[10px] font-['Oswald'] tracking-wide">+15% за сезон</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white/20 text-[9px] font-['Oswald'] uppercase tracking-widest mb-1">Контракт</div>
          <div className="glass border border-white/10 rounded-xl px-3 py-1.5">
            <span className="text-white/60 text-xs font-['Oswald'] tracking-wide">до 2027 г.</span>
          </div>
          <div className="mt-1.5">
            <div className="h-1 w-24 rounded-full bg-white/10 overflow-hidden ml-auto">
              <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400" />
            </div>
            <div className="text-white/20 text-[9px] font-['Oswald'] text-right mt-0.5">2 года осталось</div>
          </div>
        </div>
      </div>

      {/* Club interest */}
      <div>
        <SectionLabel icon="Building2">Интерес клубов</SectionLabel>
        <div className="space-y-2.5">
          {clubOffers.map((offer) => (
            <div
              key={offer.club}
              className={`glass rounded-2xl border overflow-hidden ${offer.priority ? "border-[#FFD700]/30 shadow-[0_0_16px_rgba(255,215,0,0.06)]" : "border-white/10"}`}
            >
              {offer.priority && <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />}
              <div className="p-3.5 flex items-center gap-3">
                {/* Club badge */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-[10px] font-['Bebas_Neue'] tracking-wider text-white"
                  style={{ background: `${offer.color}cc`, border: `1px solid ${offer.color}` }}
                >
                  {offer.abbr}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-['Oswald'] text-sm tracking-wide">{offer.club}</span>
                    <span className="text-base leading-none">{offer.flag}</span>
                    {offer.priority && (
                      <span className="text-[8px] font-['Bebas_Neue'] tracking-widest bg-[#FFD700]/20 border border-[#FFD700]/30 text-[#FFD700] px-1.5 py-0.5 rounded-full">ТОП</span>
                    )}
                  </div>
                  <div className="text-white/30 text-[10px] font-['Oswald'] uppercase tracking-widest">Предложение</div>
                </div>
                {/* Offer + button */}
                <div className="text-right shrink-0">
                  <div className="font-['Bebas_Neue'] text-xl tracking-wider text-[#FFD700] leading-none">{offer.offer}</div>
                  <button className="mt-1.5 text-[9px] font-['Bebas_Neue'] tracking-[0.1em] bg-[#FFD700]/15 border border-[#FFD700]/30 text-[#FFD700] px-2.5 py-1 rounded-lg hover:bg-[#FFD700]/25 transition-all active:scale-95">
                    РАССМОТРЕТЬ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer targets */}
      <div>
        <SectionLabel icon="Users">Доступные игроки</SectionLabel>
        <div className="space-y-2.5">
          {transferTargets.map((p) => (
            <div key={p.name} className="glass rounded-2xl border border-white/10 p-3.5 flex items-center gap-3">
              {/* Avatar */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 border border-white/10 flex items-center justify-center shrink-0">
                <Icon name="User" size={18} className="text-white/40" fallback="Circle" />
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-white font-['Oswald'] text-sm tracking-wide">{p.name}</span>
                  {p.note && (
                    <span className="text-[8px] font-['Oswald'] tracking-widest bg-blue-500/15 border border-blue-400/25 text-blue-300 px-1.5 py-0.5 rounded-full uppercase">{p.note}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-[9px] font-['Oswald'] uppercase tracking-wider">{p.pos}</span>
                  <span className="text-white/15">·</span>
                  <span className="text-white/30 text-[9px] font-['Oswald']">{p.club}</span>
                </div>
              </div>
              {/* Rating + price + button */}
              <div className="text-right shrink-0">
                <div className="flex items-center justify-end gap-1.5 mb-1">
                  <span className="font-['Bebas_Neue'] text-base tracking-wider text-[#FFD700]">{p.rating}</span>
                  <span className="text-white/25 text-[9px] font-['Oswald']">ОВР</span>
                </div>
                <div className="text-green-400/80 text-[10px] font-['Oswald'] mb-1">{p.price}</div>
                <button className="text-[8px] font-['Bebas_Neue'] tracking-[0.1em] bg-white/5 border border-white/15 text-white/50 px-2 py-0.5 rounded-lg hover:border-white/30 hover:text-white/80 transition-all active:scale-95">
                  ПЕРЕГОВОРЫ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Tab 3: Развитие
// ─────────────────────────────────────────────

const trainings = [
  { id: "speed",    emoji: "🏃", label: "Скорость",  current: 88, gain: 2 },
  { id: "shoot",    emoji: "⚽", label: "Удар",       current: 85, gain: 1 },
  { id: "dribble",  emoji: "🎯", label: "Дриблинг",  current: 82, gain: 1 },
  { id: "pass",     emoji: "🔄", label: "Пас",        current: 79, gain: 2 },
];

const abilities = [
  { name: "Финтёр",  unlocked: true,  req: "",              progress: 0, max: 0 },
  { name: "Снайпер", unlocked: false, req: "90 удар",       progress: 85, max: 90 },
  { name: "Капитан", unlocked: false, req: "50 матчей",     progress: 38, max: 50 },
];

const schedule = [
  { day: "Пн", type: "train" },
  { day: "Вт", type: "train" },
  { day: "Ср", type: "rest" },
  { day: "Чт", type: "train" },
  { day: "Пт", type: "train" },
  { day: "Сб", type: "match" },
  { day: "Вс", type: "rest" },
];

function DevTab({ selectedTraining, setSelectedTraining }: { selectedTraining: string; setSelectedTraining: (v: string) => void }) {
  const focusLabel = trainings.find((t) => t.id === selectedTraining)?.label ?? "";

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Training focus */}
      <div>
        <SectionLabel icon="Dumbbell">Фокус тренировок</SectionLabel>
        <div className="grid grid-cols-2 gap-3">
          {trainings.map((t) => {
            const isSelected = selectedTraining === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTraining(t.id)}
                className={`glass rounded-2xl border p-4 text-left transition-all active:scale-95 ${
                  isSelected
                    ? "border-green-400/40 bg-green-500/8 shadow-[0_0_16px_rgba(34,197,94,0.1)]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl leading-none">{t.emoji}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Icon name="Check" size={11} className="text-black" fallback="Circle" />
                    </div>
                  )}
                </div>
                <div className={`font-['Oswald'] text-sm tracking-wide mb-1 ${isSelected ? "text-green-300" : "text-white/80"}`}>
                  {t.label}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-[9px] font-['Oswald'] uppercase tracking-widest">Текущий</span>
                  <span className="text-[#FFD700] text-xs font-['Bebas_Neue'] tracking-wider">{t.current}</span>
                </div>
                <div className="stat-bar mt-1">
                  <div
                    className="stat-bar-fill"
                    style={{ width: `${t.current}%`, background: isSelected ? "#22c55e" : "#666" }}
                  />
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <Icon name="TrendingUp" size={9} className="text-green-400/60" fallback="Circle" />
                  <span className="text-green-400/60 text-[9px] font-['Oswald']">+{t.gain} за сезон</span>
                </div>
              </button>
            );
          })}
        </div>
        {/* Confirmation */}
        <div className="mt-3 flex items-center justify-center gap-2 py-2 rounded-xl glass border border-green-400/20 bg-green-500/5">
          <Icon name="Target" size={12} className="text-green-400" fallback="Circle" />
          <span className="text-green-300/70 text-[10px] font-['Oswald'] uppercase tracking-widest">
            Текущий фокус: {focusLabel}
          </span>
        </div>
      </div>

      {/* Skill tree */}
      <div>
        <SectionLabel icon="Sparkles">Особые умения</SectionLabel>
        <div className="space-y-2.5">
          {abilities.map((ab) => (
            <div
              key={ab.name}
              className={`glass rounded-2xl border p-4 ${
                ab.unlocked
                  ? "border-green-400/30 bg-green-500/5"
                  : "border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      ab.unlocked ? "bg-green-500/20 border border-green-400/30" : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <Icon
                      name={ab.unlocked ? "Unlock" : "Lock"}
                      size={14}
                      fallback="Circle"
                      className={ab.unlocked ? "text-green-400" : "text-white/30"}
                    />
                  </div>
                  <span className={`font-['Oswald'] text-sm tracking-wide ${ab.unlocked ? "text-white" : "text-white/50"}`}>
                    {ab.name}
                  </span>
                </div>
                {ab.unlocked ? (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-green-400/80 text-[10px] font-['Oswald'] uppercase tracking-wider">Разблокировано</span>
                  </div>
                ) : (
                  <span className="text-white/25 text-[9px] font-['Oswald'] uppercase tracking-widest">Требует {ab.req}</span>
                )}
              </div>
              {!ab.unlocked && ab.max > 0 && (
                <div className="space-y-1 mt-1">
                  <div className="flex justify-between">
                    <span className="text-white/20 text-[9px] font-['Oswald']">Прогресс</span>
                    <span className="text-white/35 text-[9px] font-['Oswald']">{ab.progress}/{ab.max}</span>
                  </div>
                  <div className="stat-bar">
                    <div
                      className="stat-bar-fill bg-gradient-to-r from-yellow-600 to-yellow-400"
                      style={{ width: `${(ab.progress / ab.max) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly schedule */}
      <div>
        <SectionLabel icon="Calendar">Расписание недели</SectionLabel>
        <div className="glass rounded-2xl border border-white/10 p-4">
          <div className="grid grid-cols-7 gap-1.5">
            {schedule.map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-1.5">
                <span className="text-white/25 text-[9px] font-['Oswald'] uppercase tracking-wider">{d.day}</span>
                <div
                  className={`w-full aspect-square rounded-lg flex items-center justify-center text-[8px] font-['Bebas_Neue'] tracking-wider ${
                    d.type === "train"
                      ? "bg-green-500/20 border border-green-400/30 text-green-300"
                      : d.type === "match"
                      ? "bg-[#FFD700]/20 border border-[#FFD700]/30 text-[#FFD700]"
                      : "bg-white/5 border border-white/10 text-white/20"
                  }`}
                >
                  {d.type === "train" ? "ТР" : d.type === "match" ? "МТЧ" : "ОТД"}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            {[
              { color: "bg-green-500/40", label: "Тренировка" },
              { color: "bg-[#FFD700]/40", label: "Матч" },
              { color: "bg-white/15", label: "Отдых" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-sm ${l.color}`} />
                <span className="text-white/25 text-[9px] font-['Oswald']">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Tab 4: История
// ─────────────────────────────────────────────

const milestones = [
  { year: "2019", icon: "Footprints", desc: "Начало карьеры · Торпедо", sub: "16 лет", color: "#60a5fa" },
  { year: "2021", icon: "Swords",     desc: "Дебют в основе",            sub: "10 матчей", color: "#a78bfa" },
  { year: "2022", icon: "Flame",      desc: "Первый гол в РПЛ ⚽",       sub: "",           color: "#22c55e" },
  { year: "2023", icon: "ArrowRight", desc: "Переход в Динамо",          sub: "€3.2M",      color: "#FFD700" },
  { year: "2024", icon: "Trophy",     desc: "Лучший молодой игрок РПЛ 🏆", sub: "",         color: "#FFD700" },
  { year: "2025", icon: "Flag",       desc: "Вызов в сборную России 🇷🇺", sub: "",          color: "#ef4444" },
];

const seasonRecords = [
  { season: "2022/23", games: 24, goals: 8,  assists: 5,  rating: 7.6 },
  { season: "2023/24", games: 31, goals: 14, assists: 10, rating: 8.1 },
  { season: "2024/25", games: 18, goals: 12, assists: 9,  rating: 8.4 },
];

const trophies = [
  { name: "Кубок России",         year: "2024", icon: "Trophy",  color: "#FFD700" },
  { name: "Суперкубок",           year: "2024", icon: "Star",    color: "#C0C0C0" },
  { name: "Лучший молодой игрок", year: "2024", icon: "Award",   color: "#CD7F32" },
];

function HistoryTab() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Timeline */}
      <div>
        <SectionLabel icon="Clock">Вехи карьеры</SectionLabel>
        <div className="relative">
          <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-blue-400/40 via-white/10 to-transparent pointer-events-none" />
          <div className="space-y-2">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-4 items-start">
                {/* Dot */}
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 text-[9px] font-['Bebas_Neue'] tracking-wider border"
                  style={{
                    background: `${m.color}18`,
                    borderColor: `${m.color}40`,
                    color: m.color,
                  }}
                >
                  {m.year.slice(2)}
                </div>
                {/* Card */}
                <div className="flex-1 glass rounded-xl border border-white/10 p-3 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                    style={{ background: `${m.color}18`, border: `1px solid ${m.color}35` }}
                  >
                    <Icon name={m.icon} size={14} fallback="Circle" style={{ color: m.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/85 text-sm font-['Oswald'] tracking-wide leading-tight">{m.desc}</div>
                    {m.sub && (
                      <div className="text-white/30 text-[9px] font-['Oswald'] mt-0.5">{m.sub}</div>
                    )}
                  </div>
                  <div className="shrink-0">
                    <span className="text-white/20 text-[10px] font-['Bebas_Neue'] tracking-wider">{m.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Season records */}
      <div>
        <SectionLabel icon="BarChart2">По сезонам</SectionLabel>
        <div className="glass rounded-2xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_40px_44px_52px_52px] gap-0 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
            {["Сезон", "И", "Г", "П", "РТГ"].map((h) => (
              <span key={h} className="text-white/25 text-[9px] font-['Oswald'] uppercase tracking-widest text-center first:text-left">
                {h}
              </span>
            ))}
          </div>
          {seasonRecords.map((r, i) => (
            <div
              key={r.season}
              className={`grid grid-cols-[1fr_40px_44px_52px_52px] gap-0 px-4 py-3 ${
                i < seasonRecords.length - 1 ? "border-b border-white/[0.05]" : ""
              } ${i === seasonRecords.length - 1 ? "bg-white/[0.015]" : ""} hover:bg-white/[0.025] transition-colors`}
            >
              <span className="text-white/70 text-xs font-['Oswald'] tracking-wide self-center">{r.season}</span>
              <span className="text-white/45 text-xs font-['Oswald'] text-center self-center">{r.games}</span>
              <span className="text-green-400/80 text-xs font-['Bebas_Neue'] tracking-wider text-center self-center">{r.goals}</span>
              <span className="text-blue-400/70 text-xs font-['Bebas_Neue'] tracking-wider text-center self-center">{r.assists}</span>
              <span className="text-[#FFD700]/80 text-xs font-['Bebas_Neue'] tracking-wider text-center self-center">{r.rating}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trophy cabinet */}
      <div>
        <SectionLabel icon="Trophy">Трофеи</SectionLabel>
        <div className="grid grid-cols-3 gap-3">
          {trophies.map((t) => (
            <div
              key={t.name}
              className="glass rounded-2xl border border-white/10 p-3 flex flex-col items-center gap-2 text-center"
              style={{ borderColor: `${t.color}25` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `${t.color}15`, border: `1px solid ${t.color}35` }}
              >
                <Icon name={t.icon} size={22} fallback="Circle" style={{ color: t.color }} />
              </div>
              <div>
                <div className="text-white/75 text-[10px] font-['Oswald'] tracking-wide leading-tight">{t.name}</div>
                <div className="text-white/25 text-[9px] font-['Oswald'] mt-0.5">{t.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Root component
// ─────────────────────────────────────────────

export default function CareerMode({ onBack, onNavigate: _onNavigate }: CareerModeProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("career");
  const [selectedTraining, setSelectedTraining] = useState("speed");

  const tabs: { id: ActiveTab; label: string; icon: string }[] = [
    { id: "career",    label: "Карьера",   icon: "User" },
    { id: "transfers", label: "Трансферы", icon: "ArrowLeftRight" },
    { id: "dev",       label: "Развитие",  icon: "TrendingUp" },
    { id: "history",   label: "История",   icon: "Clock" },
  ];

  return (
    <div className="min-h-screen bg-[#080a0e] text-white overflow-y-auto">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-[480px] h-[280px] rounded-full bg-blue-700/5 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-green-600/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yellow-500/3 blur-3xl" />
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
            <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-400/20 flex items-center justify-center">
              <Icon name="Footprints" size={16} fallback="Circle" className="text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-['Bebas_Neue'] tracking-[0.12em] text-white leading-none">
                РЕЖИМ КАРЬЕРЫ
              </h1>
              <p className="text-white/25 text-[9px] font-['Oswald'] uppercase tracking-widest leading-none mt-0.5">
                Сезон 2025/26
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-green-400/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300/70 text-[9px] font-['Oswald'] uppercase tracking-widest">Активно</span>
          </div>
        </div>

        {/* Player card — always visible */}
        <PlayerHeader />

        {/* Tab navigation */}
        <div className="flex gap-1 p-1 glass rounded-2xl border border-white/10 mt-5 mb-6 animate-fade-in delay-200">
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
        <div className="animate-fade-in delay-300">
          {activeTab === "career"    && <CareerTab />}
          {activeTab === "transfers" && <TransfersTab />}
          {activeTab === "dev"       && <DevTab selectedTraining={selectedTraining} setSelectedTraining={setSelectedTraining} />}
          {activeTab === "history"   && <HistoryTab />}
        </div>
      </div>
    </div>
  );
}