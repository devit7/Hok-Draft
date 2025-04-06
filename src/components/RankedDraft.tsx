import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import DraftHeader from "./draft/DraftHeader";
import DraftBoard from "./draft/DraftBoard";
import HeroSelection from "./draft/HeroSelection";
import DraftComplete from "./draft/DraftComplete";
import DraftConfig from "./draft/DraftConfig";
import { DraftPhase, DraftConfiguration, Team } from "../types/draft";
import { useHeroes } from "../hooks/useHeroes";

const RankedDraft = () => {
    const location = useLocation();
    const { heroes: heroData, loading } = useHeroes();

    // Default configuration
    const defaultConfig: DraftConfiguration = {
        useTimer: true,
        timerDuration: 30,
        banCount: 2,
        pickCount: 5,
        draftSequence: [
            "blueBan1", "redBan1", "blueBan2", "redBan2",
            "bluePick1", "redPick1", "redPick2", "bluePick2",
            "bluePick3", "redPick3", "bluePick4", "redPick4",
            "bluePick5", "redPick5", "complete"
        ],
        heroes: []
    };

    // Try to parse configuration from URL params
    const [config, setConfig] = useState<DraftConfiguration>(() => {
        try {
            const params = new URLSearchParams(location.search);
            const configParam = params.get('config');
            if (configParam) {
                const parsedConfig = JSON.parse(decodeURIComponent(configParam));
                return {
                    ...parsedConfig,
                    heroes: [] // Will be populated from heroData
                };
            }
            return defaultConfig;
        } catch (error) {
            console.error("Error parsing config:", error);
            return defaultConfig;
        }
    });

    // Draft state
    const [currentPhase, setCurrentPhase] = useState<DraftPhase>(loading ? "config" : "blueBan1");
    const [timer, setTimer] = useState<number>(config.timerDuration);
    const [selectedHero, setSelectedHero] = useState<string | null>(null);
    const [configuring, setConfiguring] = useState<boolean>(loading);

    // Initialize draft slots based on configuration
    const [blueBans, setBlueBans] = useState<(string | null)[]>(Array(config.banCount).fill(null));
    const [redBans, setRedBans] = useState<(string | null)[]>(Array(config.banCount).fill(null));
    const [bluePicks, setBluePicks] = useState<(string | null)[]>(Array(config.pickCount).fill(null));
    const [redPicks, setRedPicks] = useState<(string | null)[]>(Array(config.pickCount).fill(null));

    // Update heroes in config when data is loaded
    useEffect(() => {
        if (heroData.length > 0) {
            setConfig(prevConfig => ({
                ...prevConfig,
                heroes: heroData.map(hero => hero.Name)
            }));
        }
    }, [heroData]);

    // Auto-start draft with URL config when hero data is loaded
    useEffect(() => {
        if (!loading && heroData.length > 0) {
            const params = new URLSearchParams(location.search);
            const configParam = params.get('config');

            if (configParam) {
                try {
                    const parsedConfig = JSON.parse(decodeURIComponent(configParam));
                    const fullConfig = {
                        ...parsedConfig,
                        heroes: heroData.map(hero => hero.Name)
                    };
                    startDraft(fullConfig);
                } catch (error) {
                    console.error("Error starting draft:", error);
                    setConfiguring(true);
                }
            }
        }
    }, [loading, heroData, location.search]);

    // Start draft with the chosen configuration
    const startDraft = (newConfig: DraftConfiguration) => {
        setConfig(newConfig);
        setBlueBans(Array(newConfig.banCount).fill(null));
        setRedBans(Array(newConfig.banCount).fill(null));
        setBluePicks(Array(newConfig.pickCount).fill(null));
        setRedPicks(Array(newConfig.pickCount).fill(null));
        setCurrentPhase(newConfig.draftSequence[0]);
        setTimer(newConfig.timerDuration);
        setConfiguring(false);
    };

    // Reset to configuration screen
    const resetToConfig = () => {
        setConfiguring(true);
        setCurrentPhase("config");
    };

    // Timer effect
    useEffect(() => {
        if (currentPhase === "complete" || currentPhase === "config" || !config.useTimer) return;

        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    // Auto select a random hero when time runs out
                    handleRandomSelection();
                    return config.timerDuration;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentPhase, config.useTimer, config.timerDuration]);

    // Get current active team
    const getActiveTeam = (): Team => {
        return currentPhase.startsWith("blue") ? "blue" : "red";
    };

    // Handle hero selection
    const selectHero = (hero: string) => {
        setSelectedHero(hero);
    };

    // Confirm selection
    const confirmSelection = () => {
        if (!selectedHero || currentPhase === "complete" || currentPhase === "config") return;

        const currentTeam = getActiveTeam();
        const currentAction = currentPhase.includes("Ban") ? "ban" : "pick";

        if (currentAction === "ban") {
            if (currentTeam === "blue") {
                const banIndex = parseInt(currentPhase.replace("blueBan", "")) - 1;
                const newBans = [...blueBans];
                newBans[banIndex] = selectedHero;
                setBlueBans(newBans);
            } else {
                const banIndex = parseInt(currentPhase.replace("redBan", "")) - 1;
                const newBans = [...redBans];
                newBans[banIndex] = selectedHero;
                setRedBans(newBans);
            }
        } else {
            if (currentTeam === "blue") {
                const pickIndex = parseInt(currentPhase.replace("bluePick", "")) - 1;
                const newPicks = [...bluePicks];
                newPicks[pickIndex] = selectedHero;
                setBluePicks(newPicks);
            } else {
                const pickIndex = parseInt(currentPhase.replace("redPick", "")) - 1;
                const newPicks = [...redPicks];
                newPicks[pickIndex] = selectedHero;
                setRedPicks(newPicks);
            }
        }

        // Move to the next phase
        const currentIndex = config.draftSequence.indexOf(currentPhase);
        if (currentIndex < config.draftSequence.length - 1) {
            setCurrentPhase(config.draftSequence[currentIndex + 1]);
            setTimer(config.timerDuration);
        }

        setSelectedHero(null);
    };

    // Random selection when timer runs out
    const handleRandomSelection = () => {
        if (currentPhase === "complete" || currentPhase === "config") return;

        // Filter out already selected/banned heroes
        const usedHeroes = [
            ...blueBans.filter(Boolean),
            ...redBans.filter(Boolean),
            ...bluePicks.filter(Boolean),
            ...redPicks.filter(Boolean)
        ] as string[];

        const availableHeroes = config.heroes.filter(hero => !usedHeroes.includes(hero));

        if (availableHeroes.length > 0) {
            const randomHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
            setSelectedHero(randomHero);
            confirmSelection();
        }
    };

    // Get phase display name
    const getPhaseDisplayName = (): string => {
        if (currentPhase === "config") return "CONFIGURATION";
        if (currentPhase === "complete") return "DRAFT COMPLETE";

        const team = getActiveTeam();
        const action = currentPhase.includes("Ban") ? "BAN PHASE" : "PICK PHASE";
        const teamDisplay = team === "blue" ? "BLUE TEAM" : "RED TEAM";

        return `${teamDisplay} ${action}`;
    };

    // Loading state
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 text-white text-center">
                <div className="bg-[#0D0D28] p-8 rounded-lg border border-[#191937]">
                    <h2 className="text-2xl font-bold mb-4">Loading Heroes...</h2>
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 text-white">
            {configuring ? (
                <DraftConfig
                    initialConfig={{
                        ...config,
                        heroes: heroData.map(hero => hero.Name)
                    }}
                    onStartDraft={startDraft}
                />
            ) : (
                <>
                    {/* Draft header with phase and timer info */}
                    <DraftHeader
                        phaseName={getPhaseDisplayName()}
                        timer={timer}
                        showTimer={currentPhase !== "complete" && config.useTimer}
                        onConfigClick={resetToConfig}
                    />

                    {/* Draft board showing teams, bans and picks */}
                    {currentPhase !== "config" && (
                        <DraftBoard
                            currentPhase={currentPhase}
                            blueBans={blueBans}
                            redBans={redBans}
                            bluePicks={bluePicks}
                            redPicks={redPicks}
                        />
                    )}

                    {/* Hero selection area */}
                    {currentPhase !== "complete" && currentPhase !== "config" && (
                        <HeroSelection
                            heroes={config.heroes}
                            heroData={heroData}
                            selectedHero={selectedHero}
                            blueBans={blueBans}
                            redBans={redBans}
                            bluePicks={bluePicks}
                            redPicks={redPicks}
                            onSelectHero={selectHero}
                            onConfirmSelection={confirmSelection}
                        />
                    )}

                    {/* Draft complete message */}
                    {currentPhase === "complete" && (
                        <DraftComplete
                            blueBans={blueBans}
                            redBans={redBans}
                            bluePicks={bluePicks}
                            redPicks={redPicks}
                            onRestart={resetToConfig}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default RankedDraft;
