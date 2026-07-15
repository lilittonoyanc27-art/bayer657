import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  RotateCw, 
  Trophy, 
  Compass, 
  Sparkles, 
  Languages, 
  RefreshCw, 
  Lock, 
  Check, 
  AlertTriangle, 
  Map, 
  Flame,
  ArrowRight,
  Info
} from "lucide-react";
import { questions, Question, Option, DialogueLine } from "./questions";

// Web Audio API Synthesizer Class
class GameAudio {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  toggle(val: boolean) {
    this.enabled = val;
  }

  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(750, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.08, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch (e) {}
  }

  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(70, now + 0.35);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.08, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.4);
      });
    } catch (e) {}
  }

  playBankrupt() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(50, now + 0.8);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.8);
    } catch (e) {}
  }
}

const audio = new GameAudio();

// Player interface
interface Player {
  name: string;
  nameHy: string;
  score: number;
  color: string;
  avatarId: "gor" | "gayane";
  bgColor: string;
  borderColor: string;
  textColor: string;
}

// Wheel Sector interface
interface Sector {
  label: string;
  labelHy: string;
  value: number | "plus" | "x2";
  color: string;
  bgColor: string;
}

const sectors: Sector[] = [
  { label: "100", labelHy: "100", value: 100, color: "#f87171", bgColor: "from-red-500 to-red-600" },
  { label: "500", labelHy: "500", value: 500, color: "#fbbf24", bgColor: "from-amber-400 to-amber-500" },
  { label: "1000", labelHy: "1000", value: 1000, color: "#fbbf24", bgColor: "from-amber-500 to-amber-600" },
  { label: "200", labelHy: "200", value: 200, color: "#60a5fa", bgColor: "from-blue-500 to-blue-600" },
  { label: "x2", labelHy: "ԿՐԿՆԱԿԻ", value: "x2", color: "#f97316", bgColor: "from-orange-500 to-orange-600" },
  { label: "300", labelHy: "300", value: 300, color: "#a78bfa", bgColor: "from-violet-500 to-violet-600" },
  { label: "600", labelHy: "600", value: 600, color: "#84cc16", bgColor: "from-lime-500 to-lime-600" },
  { label: "400", labelHy: "400", value: 400, color: "#34d399", bgColor: "from-emerald-500 to-emerald-600" },
  { label: "SECTOR +", labelHy: "ԲՈՆՈՒՍ +", value: "plus", color: "#fb7185", bgColor: "from-rose-500 to-rose-600" },
  { label: "150", labelHy: "150", value: 150, color: "#ec4899", bgColor: "from-pink-500 to-pink-600" },
  { label: "350", labelHy: "350", value: 350, color: "#2dd4bf", bgColor: "from-teal-500 to-teal-600" },
  { label: "250", labelHy: "250", value: 250, color: "#818cf8", bgColor: "from-indigo-500 to-indigo-600" }
];

export default function App() {
  // Game state
  const [stage, setStage] = useState<"setup" | "playing" | "gameover">("setup");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Player details
  const [players, setPlayers] = useState<Player[]>([
    {
      name: "Gor",
      nameHy: "Գոռ",
      score: 0,
      color: "indigo",
      avatarId: "gor",
      bgColor: "bg-indigo-950/70",
      borderColor: "border-indigo-500",
      textColor: "text-indigo-400"
    },
    {
      name: "Gayane",
      nameHy: "Գայանե",
      score: 0,
      color: "pink",
      avatarId: "gayane",
      bgColor: "bg-pink-950/70",
      borderColor: "border-pink-500",
      textColor: "text-pink-400"
    }
  ]);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);

  // Secret word: RAPIDAMENTE
  const targetWord = "RAPIDAMENTE";
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>(
    Array(targetWord.length).fill(false)
  );

  // Wheel state
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [landedSector, setLandedSector] = useState<Sector | null>(null);

  // Question & Trivia State
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  
  // Interactive individual translation states
  // We store index of dialogue line to reveal its translation
  const [dialogueTranslations, setDialogueTranslations] = useState<Record<number, boolean>>({});
  // We store Option index to reveal its translation
  const [optionTranslations, setOptionTranslations] = useState<Record<string, boolean>>({});

  // Question bank management
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);

  // Turn Flow States
  const [gameStateMsg, setGameStateMsg] = useState<{ es: string; hy: string }>({
    es: "¡Bienvenidos a España! Gor, gira la rueda para comenzar.",
    hy: "Բարի գալուստ Իսպանիա: Գոռ, պտտի՛ր անիվը սկսելու համար:"
  });

  const [hasPendingLetterReveal, setHasPendingLetterReveal] = useState<boolean>(false);
  const [showSolveModal, setShowSolveModal] = useState<boolean>(false);
  const [solveInput, setSolveInput] = useState<string>("");
  const [solveFeedback, setSolveFeedback] = useState<{ es: string; hy: string; success: boolean } | null>(null);

  // Stats
  const [totalSpins, setTotalSpins] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);

  // References
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    audio.toggle(soundEnabled);
  }, [soundEnabled]);

  // Handle Turn transition
  const nextTurn = (customMsgEs?: string, customMsgHy?: string) => {
    const nextIdx = (activePlayerIndex + 1) % players.length;
    setActivePlayerIndex(nextIdx);
    const nextPlayer = players[nextIdx];
    setGameStateMsg({
      es: customMsgEs || `Turno de ${nextPlayer.name}. ¡Gira la rueda!`,
      hy: customMsgHy || `${nextPlayer.nameHy}-ի հերթն է: Պտտի՛ր անիվը:`
    });
    // Reset temporary states
    setLandedSector(null);
    setCurrentQuestion(null);
    setShuffledOptions([]);
    setSelectedOption(null);
    setHasAnswered(false);
    setDialogueTranslations({});
    setOptionTranslations({});
  };

  // SVG drawing details for Sector slices
  const drawSlicePath = (index: number) => {
    const cx = 150;
    const cy = 150;
    const r = 142;
    const startAngle = index * 30;
    const endAngle = (index + 1) * 30;
    const rad = Math.PI / 180;
    
    const x1 = cx + r * Math.cos(startAngle * rad);
    const y1 = cy + r * Math.sin(startAngle * rad);
    const x2 = cx + r * Math.cos(endAngle * rad);
    const y2 = cy + r * Math.sin(endAngle * rad);
    
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
  };

  // Audio helper slowing down ticks on spin
  const triggerDeceleratingTicks = () => {
    let delay = 50;
    const tick = () => {
      audio.playTick();
      delay *= 1.12; // slow down factor
      if (delay < 700) {
        setTimeout(tick, delay);
      }
    };
    tick();
  };

  // Spin the wheel
  const handleSpin = () => {
    if (isSpinning || hasPendingLetterReveal) return;

    setIsSpinning(true);
    setSolveFeedback(null);
    setTotalSpins(prev => prev + 1);

    // Pick random target sector
    const targetIdx = Math.floor(Math.random() * sectors.length);
    const sector = sectors[targetIdx];

    // Compute rotation: align target index with top pointer (270 degrees)
    // Formula: R = 270 - (targetIdx * 30 + 15) + (360 * full_spins)
    const extraSpins = 6 + Math.floor(Math.random() * 4); // 6 to 9 full spins
    const targetAngle = 270 - (targetIdx * 30 + 15) + 360 * extraSpins;

    setWheelRotation(targetAngle);
    triggerDeceleratingTicks();

    setTimeout(() => {
      setIsSpinning(false);
      setLandedSector(sector);
      processLandedSector(sector);
    }, 5100);
  };

  // Process wheel landing
  const processLandedSector = (sector: Sector) => {
    const activePlayer = players[activePlayerIndex];

    if (sector.value === "plus") {
      audio.playSuccess();
      setHasPendingLetterReveal(true);
      setGameStateMsg({
        es: `¡SECTOR +! ${activePlayer.name}, selecciona cualquier carta oculta para revelar su letra directamente.`,
        hy: `ԲՈՆՈՒՍ + ՍԵԿՏՈՐ: ${activePlayer.nameHy}, ընտրի՛ր ցանկացած փակ տառ այն անմիջապես բացելու համար:`
      });

    } else {
      // Points or x2 multiplier -> Must answer a quiz question!
      // Select a random question that hasn't been used yet
      let nextQuestion: Question;
      let newUsed = [...usedQuestionIds];
      
      const availableQuestions = questions.filter(q => !usedQuestionIds.includes(q.id));
      
      if (availableQuestions.length === 0) {
        // Reset question pool if all used
        nextQuestion = questions[Math.floor(Math.random() * questions.length)];
        newUsed = [nextQuestion.id];
      } else {
        nextQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        newUsed.push(nextQuestion.id);
      }
      
      setUsedQuestionIds(newUsed);
      setCurrentQuestion(nextQuestion);

      // Shuffle options to make it a fair quiz
      const shuffled = [...nextQuestion.options];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setShuffledOptions(shuffled);

      setGameStateMsg({
        es: `Pregunta sobre "${nextQuestion.categoryEs}". ¡Responde correctamente para ganar!`,
        hy: `Հարց «${nextQuestion.categoryHy}» թեմայով: Ճիշտ պատասխանիր հաղթելու համար:`
      });
    }
  };

  // Handle quiz option selection
  const handleSelectOption = (opt: Option) => {
    if (hasAnswered || !currentQuestion || !landedSector) return;
    
    setSelectedOption(opt);
    setHasAnswered(true);

    const activePlayer = players[activePlayerIndex];
    const isCorrect = opt.letter === currentQuestion.correctLetter;

    if (isCorrect) {
      audio.playSuccess();
      setCorrectAnswersCount(prev => prev + 1);

      // Calculate score to add
      let pointsToAdd = 0;
      if (typeof landedSector.value === "number") {
        pointsToAdd = landedSector.value;
      } else if (landedSector.value === "x2") {
        pointsToAdd = activePlayer.score > 0 ? activePlayer.score : 200; // if 0 points, double acts as +200 bonus
      }

      setPlayers(prev => prev.map((p, idx) => 
        idx === activePlayerIndex ? { ...p, score: p.score + pointsToAdd } : p
      ));

      setGameStateMsg({
        es: `¡EXCELENTE! Respuesta correcta. Ganaste ${pointsToAdd} puntos. ¡Ahora abre una letra!`,
        hy: `ՀԻԱՆԱԼԻ Է՛: Ճիշտ պատասխան: Դու ստացար ${pointsToAdd} միավոր: Հիմա բա՛ց թաքնված տառերից մեկը:`
      });

      // Grant a letter reveal chance
      setHasPendingLetterReveal(true);

    } else {
      audio.playError();
      setGameStateMsg({
        es: `Incorrecto. La respuesta correcta era: "${currentQuestion.options.find(o => o.letter === currentQuestion.correctLetter)?.textEs}".`,
        hy: `Սխալ է: Ճիշտ պատասխանն էր․ "${currentQuestion.options.find(o => o.letter === currentQuestion.correctLetter)?.textEs}":`
      });

      // Turn passes to next player after a delay
      setTimeout(() => {
        nextTurn();
      }, 4000);
    }
  };

  // Reveal a specific letter on tile click (once authorized)
  const handleRevealTile = (index: number) => {
    if (!hasPendingLetterReveal || revealedLetters[index]) return;

    const clickedLetter = targetWord[index];
    
    // Reveal all occurrences of this letter
    const updatedRevealed = revealedLetters.map((isRev, idx) => 
      targetWord[idx] === clickedLetter ? true : isRev
    );
    
    setRevealedLetters(updatedRevealed);
    setHasPendingLetterReveal(false);

    audio.playSuccess();

    // Check if entire word is solved
    const isSolved = updatedRevealed.every(val => val === true);
    
    if (isSolved) {
      setTimeout(() => {
        setStage("gameover");
        audio.playWin();
      }, 1000);
    } else {
      // Settle the turn. Pass turn to next player so everyone gets a spin!
      nextTurn();
    }
  };

  // Solve entire word guess
  const handleSolveWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanGuess = solveInput.trim().toUpperCase();
    const activePlayer = players[activePlayerIndex];

    if (cleanGuess === targetWord) {
      audio.playWin();
      // Reveal all letters
      setRevealedLetters(Array(targetWord.length).fill(true));
      
      // Award big winner points
      setPlayers(prev => prev.map((p, idx) => 
        idx === activePlayerIndex ? { ...p, score: p.score + 1000 } : p
      ));

      setSolveFeedback({
        es: `¡Felicidades! ¡Has adivinado la palabra correctamente! Obtienes +1000 puntos extras.`,
        hy: `Շնորհավորում ենք: Դուք ճիշտ գուշակեցիք բառը: Ստանում եք +1000 հավելյալ միավոր:`,
        success: true
      });

      setTimeout(() => {
        setShowSolveModal(false);
        setSolveInput("");
        setStage("gameover");
      }, 4000);

    } else {
      audio.playError();
      // Deduct penalty points (if any)
      setPlayers(prev => prev.map((p, idx) => 
        idx === activePlayerIndex ? { ...p, score: Math.max(0, p.score - 150) } : p
      ));

      setSolveFeedback({
        es: `"${cleanGuess}" es incorrecto. Pierdes 150 puntos. ¡Sigue intentándolo!`,
        hy: `«${cleanGuess}»-ը սխալ է: Դուք կորցնում եք 150 միավոր: Շարունակե՛ք փորձել:`,
        success: false
      });

      setTimeout(() => {
        setSolveFeedback(null);
        setShowSolveModal(false);
        setSolveInput("");
        nextTurn();
      }, 3500);
    }
  };

  // Reset entire game state
  const resetGame = () => {
    setPlayers([
      {
        name: "Gor",
        nameHy: "Գոռ",
        score: 0,
        color: "indigo",
        avatarId: "gor",
        bgColor: "bg-indigo-950/70",
        borderColor: "border-indigo-500",
        textColor: "text-indigo-400"
      },
      {
        name: "Gayane",
        nameHy: "Գայանե",
        score: 0,
        color: "pink",
        avatarId: "gayane",
        bgColor: "bg-pink-950/70",
        borderColor: "border-pink-500",
        textColor: "text-pink-400"
      }
    ]);
    setActivePlayerIndex(0);
    setRevealedLetters(Array(targetWord.length).fill(false));
    setWheelRotation(0);
    setIsSpinning(false);
    setLandedSector(null);
    setCurrentQuestion(null);
    setShuffledOptions([]);
    setSelectedOption(null);
    setHasAnswered(false);
    setDialogueTranslations({});
    setOptionTranslations({});
    setUsedQuestionIds([]);
    setTotalSpins(0);
    setCorrectAnswersCount(0);
    setHasPendingLetterReveal(false);
    setSolveFeedback(null);
    setStage("setup");
  };

  // Toggle helper for translations
  const toggleDialogueTranslation = (idx: number) => {
    setDialogueTranslations(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleOptionTranslation = (optEs: string) => {
    setOptionTranslations(prev => ({
      ...prev,
      [optEs]: !prev[optEs]
    }));
  };

  // Calculate winner details
  const getWinner = () => {
    if (players[0].score > players[1].score) return players[0];
    if (players[1].score > players[0].score) return players[1];
    return null; // Tie
  };

  const winner = getWinner();

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden pb-12">
      
      {/* HEADER BAR */}
      <header className="border-b border-slate-700 bg-slate-900/80 sticky top-0 z-30 px-6 py-4 flex justify-between items-center backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-amber-500 animate-spin-slow" />
            <h1 className="font-display font-black text-xl md:text-2xl tracking-tighter text-amber-500 uppercase">
              Ruleta de España
            </h1>
          </div>
          <p className="text-[10px] md:text-xs text-slate-400 font-mono tracking-widest uppercase">
            Իսպանիայի Վիկտորինա • Gor & Gayane Edition
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 text-slate-300"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-amber-500" /> : <VolumeX className="w-5 h-5" />}
          </button>
          
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs border border-slate-700 text-slate-300 transition-colors font-mono uppercase tracking-widest"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </header>

      {/* GAME WRAPPER */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* SETUP STAGE */}
        {stage === "setup" && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8 mt-8 shadow-2xl text-center"
          >
            <div className="relative inline-block mb-4">
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
              </span>
              <div className="p-4 bg-slate-900 border border-slate-700 rounded-2xl text-amber-500">
                <Trophy className="w-10 h-10" />
              </div>
            </div>

            <h2 className="font-display font-black text-2xl md:text-3xl text-amber-500 uppercase tracking-tighter mb-2">
              Ruleta de España
            </h2>
            <p className="text-slate-300 text-xs md:text-sm max-w-md mx-auto mb-6">
              ¡Disfruta de un juego interactivo de preguntas y respuestas en <strong>español (A2)</strong> con traducción al <strong>armenio</strong>! Gira la gran rueda de la fortuna, responde diálogos y revela la palabra secreta.
            </p>

            {/* Players card config display */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Gor Profile card */}
              <div className="bg-slate-900 border border-slate-700 hover:border-amber-500/50 rounded-xl p-4 flex flex-col items-center transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-3xl mb-2">
                  👦
                </div>
                <span className="font-bold text-sm text-slate-200">Gor</span>
                <span className="text-[10px] text-slate-400 font-mono">Գոռ</span>
                <p className="text-[10px] text-slate-500 italic mt-2">"Vamos, ¡vamos!"</p>
              </div>

              {/* Gayane Profile card */}
              <div className="bg-slate-900 border border-slate-700 hover:border-amber-500/50 rounded-xl p-4 flex flex-col items-center transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-3xl mb-2">
                  👧
                </div>
                <span className="font-bold text-sm text-slate-200">Gayane</span>
                <span className="text-[10px] text-slate-400 font-mono">Գայանե</span>
                <p className="text-[10px] text-slate-500 italic mt-2">"¡Qué divertido!"</p>
              </div>
            </div>

            <button
              onClick={() => {
                audio.playSuccess();
                setStage("playing");
              }}
              className="w-full py-3.5 px-6 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/15 active:scale-[0.98] transition-all text-sm md:text-base flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              Comenzar Juego (Սկսել Խաղը)
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* PLAYING STAGE */}
        {stage === "playing" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT / TOP PANEL: Word Display & Main Control Feed (8 Columns) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* STATUS TICKER / MESSAGE BANNER */}
              <div className="bg-amber-500/15 border border-amber-500/20 rounded-xl p-4 flex gap-3 items-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                <div className="bg-amber-500/20 p-2 rounded-lg text-amber-500 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-amber-500 text-sm md:text-base font-semibold tracking-wide uppercase font-mono">
                    {gameStateMsg.es}
                  </p>
                  <p className="text-slate-300 text-xs md:text-sm mt-0.5 leading-relaxed font-sans font-medium">
                    {gameStateMsg.hy}
                  </p>
                </div>
              </div>

              {/* SECRET WORD PANELS (RAPIDAMENTE) */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 md:p-7 shadow-2xl relative">
                <div className="absolute top-2.5 right-3 text-xs font-mono text-amber-500 uppercase tracking-widest flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  <span>Palabra Secreta</span>
                </div>
                
                <h3 className="text-sm font-mono text-amber-500 tracking-[0.15em] mb-4 uppercase font-semibold flex items-center gap-1.5">
                  <span>Palabra Secreta / Գաղտնի Բառ:</span>
                  {hasPendingLetterReveal && (
                    <span className="text-amber-400 animate-pulse text-xs font-sans normal-case tracking-normal">
                      ← ¡Toca un cuadro para revelar! (Հպվիր տառին)
                    </span>
                  )}
                </h3>

                {/* Wood/Gold Tiles Board */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 my-4">
                  {targetWord.split("").map((letter, idx) => {
                    const isRevealed = revealedLetters[idx];
                    return (
                      <div 
                        key={idx}
                        onClick={() => handleRevealTile(idx)}
                        className={`w-10 h-14 md:w-14 md:h-18 rounded-lg relative cursor-pointer perspective-1000 transition-all ${
                          hasPendingLetterReveal && !isRevealed 
                            ? "hover:scale-105 hover:border-amber-500 animate-bounce-subtle" 
                            : ""
                        }`}
                      >
                        <div className={`w-full h-full duration-500 transform-style-3d relative rounded-lg border-2 ${
                          isRevealed 
                            ? "rotate-y-180 border-amber-500 bg-slate-900 text-amber-500 border-b-4" 
                            : "border-slate-700 bg-slate-950 text-slate-400"
                        }`}>
                          
                          {/* Back Side (Hidden letter) */}
                          <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center rounded-lg bg-slate-950">
                            <span className="font-display font-bold text-lg md:text-xl text-slate-700">_</span>
                            {hasPendingLetterReveal && (
                              <span className="text-[7px] text-amber-500 font-bold uppercase animate-pulse">
                                Toca
                              </span>
                            )}
                          </div>

                          {/* Front Side (Revealed letter) */}
                          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex items-center justify-center rounded-lg bg-slate-900 border-b-4 border-amber-500">
                            <span className="font-display font-extrabold text-2xl md:text-3xl text-amber-500 text-shadow-sm">
                              {letter}
                            </span>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap justify-between items-center gap-3 mt-4 pt-4 border-t border-slate-700">
                  <div className="text-xs md:text-sm text-slate-400">
                    Sugerencia: ¡Una palabra de 11 letras que significa "rápidamente" en español!
                  </div>
                  
                  <button
                    onClick={() => {
                      setSolveFeedback(null);
                      setSolveInput("");
                      setShowSolveModal(true);
                    }}
                    disabled={hasPendingLetterReveal || isSpinning}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-500/10 flex items-center gap-1.5 uppercase tracking-widest"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Adivinar Palabra (Գուշակել ամբողջ բառը)
                  </button>
                </div>
              </div>

              {/* ACTIVE QUIZ PORTION / ACTION WINDOW */}
              <AnimatePresence mode="wait">
                {currentQuestion ? (
                  <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-800 border border-slate-700 rounded-2xl p-5 md:p-6 shadow-2xl relative"
                  >
                    {/* Header with toggle instructions */}
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-4 pb-3 border-b border-slate-700">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded bg-slate-700 text-slate-100 text-xs font-mono uppercase tracking-wider">
                          Tema {currentQuestion.id}: {currentQuestion.categoryEs}
                        </span>
                        <span className="text-slate-500 text-xs sm:inline hidden">•</span>
                        <span className="text-xs px-2 py-1 bg-slate-700 rounded text-amber-500 font-mono sm:inline hidden">
                          Nivel A2
                        </span>
                      </div>
                      
                      {/* Hint tooltip */}
                      <div className="flex items-center gap-1 text-xs text-slate-400 font-mono tracking-wide">
                        <Languages className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                        <span>Տեքստի վրա սեղմիր հայերեն թարգմանության համար</span>
                      </div>
                    </div>

                    {/* Dialogue Context Area */}
                    <div className="bg-slate-900 rounded-xl p-4 mb-5 border border-slate-700 space-y-3.5 max-h-64 overflow-y-auto">
                      {currentQuestion.dialogue.map((line, idx) => {
                        const isTranslated = dialogueTranslations[idx] || false;
                        return (
                          <div 
                            key={idx}
                            onClick={() => toggleDialogueTranslation(idx)}
                            className="group cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition-colors border-l-2 border-transparent hover:border-amber-500 pl-3"
                          >
                            <div className="flex items-baseline gap-2">
                              <span className="font-bold text-sm text-amber-500 group-hover:text-amber-400 shrink-0 uppercase tracking-wide font-mono">
                                {line.speaker}:
                              </span>
                              <span className="text-base text-slate-100 leading-relaxed font-sans font-medium">
                                {line.textEs}
                              </span>
                            </div>
                            
                            {/* Armenian Translation */}
                            {isTranslated ? (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="text-sm text-slate-400 mt-1 pl-4 border-l border-amber-500/30"
                              >
                                <span className="font-semibold text-slate-300">{line.speakerHy}․</span> {line.textHy}
                              </motion.div>
                            ) : (
                              <div className="text-xs text-slate-500 mt-0.5 pl-4 flex items-center gap-1 italic opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>(Տեսնել թարգմանությունը)</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Options list */}
                    <div className="space-y-3">
                      <span className="text-sm font-mono text-amber-500 uppercase tracking-widest block mb-1.5">
                        Selecciona la respuesta correcta (Ընտրիր ճիշտ պատասխանը):
                      </span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {shuffledOptions.map((opt, oIdx) => {
                          const isSelected = selectedOption === opt;
                          const isCorrect = opt.letter === currentQuestion.correctLetter;
                          const showCorrectness = hasAnswered && isCorrect;
                          const showWrongness = hasAnswered && isSelected && !isCorrect;
                          
                          const isTranslated = optionTranslations[opt.textEs] || false;

                          let btnStyle = "border-slate-600 bg-slate-800 hover:border-amber-500 hover:bg-slate-700 text-slate-100";
                          if (isSelected && !hasAnswered) {
                            btnStyle = "border-amber-500 bg-slate-700 text-slate-100";
                          }
                          if (showCorrectness) {
                            btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-100";
                          }
                          if (showWrongness) {
                            btnStyle = "border-red-500 bg-red-500/20 text-red-100";
                          }

                          return (
                            <div 
                              key={oIdx} 
                              className={`border-2 rounded-xl p-3 transition-all relative ${btnStyle} flex flex-col justify-between`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <button
                                  onClick={() => handleSelectOption(opt)}
                                  disabled={hasAnswered}
                                  className="text-left w-full cursor-pointer disabled:cursor-default"
                                >
                                  <div className="flex gap-2.5">
                                    <span className="font-mono text-sm font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-500">
                                      {opt.letter}
                                    </span>
                                    <span className="text-sm md:text-base font-bold leading-tight pt-0.5 mb-1 block">
                                      {opt.textEs}
                                    </span>
                                  </div>
                                </button>

                                {/* Translation toggle button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOptionTranslation(opt.textEs);
                                  }}
                                  className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-amber-500 shrink-0 transition-colors"
                                  title="Translate option"
                                >
                                  <Languages className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Armenian option translation */}
                              {isTranslated && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  className="mt-2 text-xs md:text-sm text-slate-400 pl-3 border-l border-amber-500/30 font-sans italic"
                                >
                                  — {opt.textHy}
                                </motion.div>
                              )}

                              {/* Feedback icon indicators */}
                              {showCorrectness && (
                                <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-slate-900">
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                              )}
                              {showWrongness && (
                                <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-slate-100">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer dialogue translation notification */}
                    <div className="text-xs text-slate-500 text-center mt-6">
                      Սեղմեք տեքստի վրա՝ թարգմանությունը տեսնելու համար
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 shadow-inner flex flex-col items-center justify-center text-center py-12">
                    <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center text-amber-500 mb-3 animate-pulse">
                      <RotateCw className="w-6 h-6" />
                    </div>
                    
                    <h4 className="font-mono font-medium text-sm text-slate-300">
                      Gira la rueda para conseguir una pregunta
                    </h4>
                    <p className="text-slate-500 text-xs mt-1 max-w-xs">
                      Sectores del círculo te otorgarán puntos o acciones. ¡Responde correctamente para poder revelar las letras de la palabra secreta!
                    </p>

                    {hasPendingLetterReveal && (
                      <div className="mt-4 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold animate-bounce mt-6">
                        🌟 ¡Tienes una revelación pendiente! Selecciona un cuadro arriba.
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>

            </div>

            {/* RIGHT PANEL: Spinning Wheel & Players Info (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* PLAYERS SCOREBOARD */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
                <h3 className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-500" />
                  <span>Jugadores (Խաղացողներ):</span>
                </h3>

                <div className="space-y-4">
                  {players.map((p, idx) => {
                    const isActive = idx === activePlayerIndex;
                    return (
                      <div 
                        key={idx}
                        className={`border-2 rounded-xl p-4 relative transition-all ${
                          isActive 
                            ? "border-amber-500 bg-slate-900 shadow-lg" 
                            : "border-slate-700 bg-slate-900 opacity-50"
                        }`}
                      >
                        {/* Current turn indicator ribbon */}
                        {isActive && (
                          <div className="absolute -top-2.5 right-3 bg-amber-500 text-slate-900 font-extrabold text-[10px] md:text-xs px-2 py-0.5 rounded uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-slate-900 animate-pulse" />
                            <span>Su turno (Հերթը)</span>
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          {/* Avatar icon */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${
                            isActive ? "border-amber-500" : "border-slate-700"
                          } bg-slate-800`}>
                            {p.avatarId === "gor" ? "👦" : "👧"}
                          </div>

                          <div className="grow">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-bold text-base md:text-lg text-slate-200">{p.name}</span>
                              <span className="text-xs text-slate-400">({p.nameHy})</span>
                            </div>
                            <span className="text-xs text-slate-500 font-mono">
                              {p.avatarId === "gor" ? "Gor, ¡vamos!" : "Gayane, ¡qué divertido!"}
                            </span>
                          </div>

                          {/* Points */}
                          <div className="text-right shrink-0">
                            <span className="font-mono font-black text-xl md:text-2xl text-amber-500 block tracking-tight">
                              {p.score}
                            </span>
                            <span className="text-xs text-slate-400 font-mono uppercase tracking-widest block">
                              Pts
                            </span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* WHEEL SECTOR */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl flex flex-col items-center">
                
                <h3 className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-4 w-full text-center">
                  Rueda de la Fortuna (Անիվ)
                </h3>

                {/* SVG SPINNING WHEEL */}
                <div className="relative w-72 h-72 my-2 flex items-center justify-center">
                  
                  {/* Wheel Pointer/Marker at the top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="w-6 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b-md shadow-lg border border-black/50 flex items-center justify-center" style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}>
                    </div>
                    {/* Glowing indicator light */}
                    <div className="w-2.5 h-2.5 rounded-full bg-white absolute top-0.5 left-1/2 -translate-x-1/2 animate-ping" />
                  </div>

                  {/* Rotary physical container */}
                  <div 
                    ref={wheelRef}
                    style={{ 
                      transform: `rotate(${wheelRotation}deg)`,
                      transition: isSpinning ? "transform 5000ms cubic-bezier(0.1, 0.8, 0.15, 1)" : "none" 
                    }}
                    className="w-[280px] h-[280px] rounded-full border-[12px] border-slate-700 relative overflow-hidden flex items-center justify-center shadow-2xl shadow-amber-500/10 select-none bg-slate-900"
                  >
                    
                    {/* SVG graphic layers */}
                    <svg viewBox="0 0 300 300" className="w-full h-full transform -rotate-90">
                      {/* Drop shadow filter */}
                      <defs>
                        <radialGradient id="goldGrad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#b45309" />
                        </radialGradient>
                        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="70%" stopColor="#000000" stopOpacity="0" />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
                        </radialGradient>
                      </defs>

                      {/* Sectors */}
                      {sectors.map((sector, idx) => {
                        const midAngle = idx * 30 + 15;
                        const rad = Math.PI / 180;
                        const textR = 98; // radius from center for sector label text
                        
                        // Text positioning
                        const tx = 150 + textR * Math.cos(midAngle * rad);
                        const ty = 150 + textR * Math.sin(midAngle * rad);
                        
                        return (
                          <g key={idx}>
                            <path 
                              d={drawSlicePath(idx)} 
                              fill={sector.color}
                              className="stroke-black/30 stroke-1"
                            />
                            
                            {/* Text labels styled inside sectors */}
                            <text 
                              x={tx} 
                              y={ty} 
                              fill="#ffffff"
                              fontSize="8"
                              fontWeight="900"
                              fontFamily="Montserrat, sans-serif"
                              textAnchor="middle"
                              alignmentBaseline="middle"
                              transform={`rotate(${midAngle}, ${tx}, ${ty})`}
                              className="text-shadow-sm font-mono tracking-tight"
                            >
                              {sector.label}
                            </text>
                          </g>
                        );
                      })}

                      {/* Inner slate hub overlay */}
                      <circle cx="150" cy="150" r="32" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
                      <circle cx="150" cy="150" r="142" fill="url(#innerGlow)" pointerEvents="none" />
                    </svg>

                    {/* Central Hub Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-xs text-amber-500 font-bold italic shadow-inner pointer-events-none">
                      ★
                    </div>

                  </div>

                </div>

                {/* Spin Button */}
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || hasPendingLetterReveal || currentQuestion !== null}
                  className="mt-4 w-full py-3.5 px-6 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/10 active:scale-[0.98] transition-all text-sm md:text-base flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-45 disabled:cursor-not-allowed"
                >
                  <RotateCw className={`w-5 h-5 ${isSpinning ? "animate-spin" : ""}`} />
                  {isSpinning ? "GIRANDO..." : "Girar / Պտտել"}
                </button>

                {/* Landed slice prompt */}
                {landedSector && !isSpinning && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 px-4 py-2 w-full rounded-xl bg-slate-900 border border-slate-700 text-center"
                  >
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">Lanzamiento / Անիվը:</span>
                    <span className="font-display font-extrabold text-base text-amber-500 uppercase">
                      {landedSector.labelHy}
                    </span>
                  </motion.div>
                )}

              </div>

              {/* QUICK STATISTICS BAR */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-xs text-slate-400 space-y-1 w-full">
                <div className="flex justify-between">
                  <span>Intentos de giros totales (Ընդհանուր պտույտներ):</span>
                  <span className="font-mono font-bold text-slate-300">{totalSpins}</span>
                </div>
                <div className="flex justify-between">
                  <span>Respuestas correctas (Ճիշտ պատասխաններ):</span>
                  <span className="font-mono font-bold text-slate-300">{correctAnswersCount}</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* GAMEOVER STAGE */}
        {stage === "gameover" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-slate-800 border border-slate-700 rounded-3xl p-6 md:p-10 shadow-2xl text-center mt-12 relative overflow-hidden"
          >
            {/* Celebration ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

            <div className="inline-block p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 mb-4 animate-bounce">
              👑
            </div>

            <h2 className="font-mono font-black text-3xl md:text-4xl text-amber-500 mb-2 uppercase tracking-tight">
              ¡Viaje Completado!
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-md mx-auto mb-6 font-medium">
              ¡La palabra secreta <strong className="text-amber-500 font-mono">RAPIDAMENTE</strong> ha sido revelada con éxito por nuestros intrépidos viajeros!
            </p>

            {/* Results score panel */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8 max-w-md mx-auto">
              <h3 className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-4">
                Puntuaciones Finales (Վերջնական Միավորներ):
              </h3>
              
              <div className="space-y-4">
                {players.map((p, idx) => {
                  const isWinner = winner && winner.name === p.name;
                  return (
                    <div 
                      key={idx} 
                      className={`flex justify-between items-center p-3 rounded-xl border ${
                        isWinner ? "bg-amber-500/10 border-amber-500/20" : "bg-slate-950 border-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{p.avatarId === "gor" ? "👦" : "👧"}</span>
                        <div className="text-left">
                          <span className="font-bold text-sm block text-slate-200">{p.name} {isWinner && "🏆"}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{p.nameHy}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="font-mono font-black text-lg text-amber-500 block">{p.score}</span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest">Pts</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={resetGame}
                className="py-3.5 px-6 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/10 active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-1.5 uppercase tracking-widest"
              >
                <RefreshCw className="w-4 h-4" />
                Jugar de nuevo (Խաղալ նորից)
              </button>
            </div>
          </motion.div>
        )}

      </main>

      {/* GUESS WHOLE WORD MODAL */}
      <AnimatePresence>
        {showSolveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl relative"
            >
              <h3 className="font-mono font-bold text-lg text-amber-500 mb-1 uppercase tracking-wide">
                Adivinar la palabra secreta
              </h3>
              <p className="text-slate-400 text-xs mb-4 leading-relaxed font-sans font-medium">
                Escribe la palabra completa en español. Si aciertas, ¡obtienes <strong className="text-amber-500">+1000 puntos</strong>! Si fallas, pierdes <strong className="text-red-400">150 puntos</strong> y pierdes el turno.
              </p>

              <form onSubmit={handleSolveWordSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block mb-1.5">
                    Tu respuesta (Escribe en mayúsculas):
                  </label>
                  <input
                    type="text"
                    value={solveInput}
                    onChange={(e) => setSolveInput(e.target.value)}
                    placeholder="Escribe la palabra aquí..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 uppercase tracking-widest font-mono text-center text-amber-500 placeholder:text-slate-700"
                    disabled={solveFeedback !== null}
                    autoFocus
                  />
                </div>

                {/* Solve feedback message box */}
                {solveFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`p-3 rounded-lg text-xs font-semibold ${
                      solveFeedback.success 
                        ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300" 
                        : "bg-red-500/15 border border-red-500/30 text-red-300"
                    }`}
                  >
                    <p>{solveFeedback.es}</p>
                    <p className="text-[10px] opacity-80 mt-1 font-sans">{solveFeedback.hy}</p>
                  </motion.div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSolveModal(false)}
                    disabled={solveFeedback !== null}
                    className="w-1/2 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors uppercase tracking-widest"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!solveInput.trim() || solveFeedback !== null}
                    className="w-1/2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-bold transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-1 uppercase tracking-widest"
                  >
                    Enviar (Ուղարկել)
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER ACCENTS */}
      <footer className="text-center text-[10px] text-slate-500 mt-16 max-w-xs mx-auto flex flex-col gap-1 select-none font-mono tracking-widest uppercase">
        <div>Gor & Gayane Traveling Quiz en España</div>
        <div>Hecho con amor • Nivel A2 Español / Armenio</div>
      </footer>

    </div>
  );
}
