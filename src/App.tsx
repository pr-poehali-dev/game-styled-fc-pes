import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainMenu from "./pages/MainMenu";
import CareerMode from "./pages/CareerMode";
import MatchPage from "./pages/MatchPage";
import LeaguesPage from "./pages/LeaguesPage";
import ShopPage from "./pages/ShopPage";
import StatsPage from "./pages/StatsPage";
import PlayerCard from "./pages/PlayerCard";

export type Screen = "menu" | "career" | "match" | "leagues" | "shop" | "stats" | "player";

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [history, setHistory] = useState<Screen[]>(["menu"]);

  const navigate = (to: Screen) => {
    setHistory(h => [...h, to]);
    setScreen(to);
  };

  const back = () => {
    setHistory(h => {
      const next = h.slice(0, -1);
      setScreen(next[next.length - 1] || "menu");
      return next;
    });
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-background text-foreground">
        {screen === "menu" && <MainMenu onNavigate={navigate} />}
        {screen === "career" && <CareerMode onBack={back} onNavigate={navigate} />}
        {screen === "match" && <MatchPage onBack={back} />}
        {screen === "leagues" && <LeaguesPage onBack={back} />}
        {screen === "shop" && <ShopPage onBack={back} />}
        {screen === "stats" && <StatsPage onBack={back} />}
        {screen === "player" && <PlayerCard onBack={back} />}
      </div>
    </TooltipProvider>
  );
}
