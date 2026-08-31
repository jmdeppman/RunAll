import React, { useState, useEffect, useRef } from 'react';
import { WorkoutPhase, Shoe } from '../types';

interface Props {
  activeShoe: Shoe | null;
  onWorkoutComplete: (distanceKm: number, timeSeconds: number) => void;
}

export const IntervalTimerTab: React.FC<Props> = ({ activeShoe, onWorkoutComplete }) => {
  const [runDuration, setRunDuration] = useState<number>(180); // 3 min
  const [walkDuration, setWalkDuration] = useState<number>(120); // 2 min
  const [totalSessionMin, setTotalSessionMin] = useState<number>(20);

  const [phase, setPhase] = useState<WorkoutPhase>('idle');
  const [currentBlockTime, setCurrentBlockTime] = useState<number>(0);
  const [totalTimeRemaining, setTotalTimeRemaining] = useState<number>(0);
  const [currentCycle, setCurrentCycle] = useState<number>(1);
  const [totalCycles, setTotalCycles] = useState<number>(1);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sintetizador de Voz Nativo e Som
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.error(e);
    }
  };

  const triggerVibration = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const startWorkout = () => {
    const totalSecs = totalSessionMin * 60;
    const cycleTime = runDuration + walkDuration;
    const cycles = Math.max(1, Math.floor(totalSecs / cycleTime));

    setTotalCycles(cycles);
    setCurrentCycle(1);
    setTotalTimeRemaining(totalSecs);
    setCurrentBlockTime(runDuration);
    setPhase('running');
    speakText('Treino iniciado. Corra!');
    triggerVibration(300);
  };

  const stopWorkout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('idle');
  };

  useEffect(() => {
    if (phase === 'running' || phase === 'walking') {
      timerRef.current = setInterval(() => {
        setTotalTimeRemaining((prevTotal) => {
          if (prevTotal <= 1) {
            finishWorkout();
            return 0;
          }
          return prevTotal - 1;
        });

        setCurrentBlockTime((prevBlock) => {
          if (prevBlock <= 4 && prevBlock > 1) {
            playBeep();
            triggerVibration(100);
          }

          if (prevBlock <= 1) {
            switchPhase();
            return 0;
          }
          return prevBlock - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, runDuration, walkDuration]);

  const switchPhase = () => {
    if (phase === 'running') {
      setPhase('walking');
      setCurrentBlockTime(walkDuration);
      speakText('Caminhe!');
      triggerVibration([200, 100, 200]);
    } else if (phase === 'walking') {
      setPhase('running');
      setCurrentBlockTime(runDuration);
      setCurrentCycle((prev) => prev + 1);
      speakText('Corra!');
      triggerVibration(400);
    }
  };

  const finishWorkout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('finished');
    speakText('Parabéns! Treino concluído com sucesso.');
    triggerVibration([500, 200, 500]);

    // Estimativa de distância média para iniciantes (8.5 km/h)
    const estimatedKm = parseFloat(((totalSessionMin / 60) * 8.5).toFixed(2));
    onWorkoutComplete(estimatedKm, totalSessionMin * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Cores Semânticas de Fundo Originais
  const getPhaseBg = () => {
    switch (phase) {
      case 'running': return 'bg-[#10B981] text-white'; // Verde Ritmo
      case 'walking': return 'bg-[#3B82F6] text-white'; // Azul Caminhada
      case 'finished': return 'bg-[#171717] text-[#CCFF00]';
      default: return 'bg-[#171717] text-white';
    }
  };

  return (
    <div className={`min-h-[80vh] rounded-3xl p-6 transition-colors duration-500 flex flex-col justify-between ${getPhaseBg()}`}>
      {phase === 'idle' ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Configurar Treino Alternado</h2>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Bloco de Corrida (Segundos)</label>
            <input
              type="number"
              value={runDuration}
              onChange={(e) => setRunDuration(Number(e.target.value))}
              className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl p-4 text-white font-mono text-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Bloco de Caminhada (Segundos)</label>
            <input
              type="number"
              value={walkDuration}
              onChange={(e) => setWalkDuration(Number(e.target.value))}
              className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl p-4 text-white font-mono text-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Duração Total (Máx 60 Minutos)</label>
            <input
              type="number"
              max={60}
              value={totalSessionMin}
              onChange={(e) => setTotalSessionMin(Math.min(60, Number(e.target.value)))}
              className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl p-4 text-white font-mono text-xl"
            />
          </div>

          {activeShoe && (
            <p className="text-xs text-gray-400">
              👟 Tênis Ativo: <strong className="text-white">{activeShoe.brandAndModel}</strong>
            </p>
          )}

          <button
            onClick={startWorkout}
            className="w-full bg-[#CCFF00] text-black font-black text-lg py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
          >
            INICIAR TREINO NO CELULAR
          </button>
        </div>
      ) : phase === 'finished' ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4">
          <span className="text-6xl">🏁</span>
          <h2 className="text-3xl font-black">TREINO CONCLUÍDO!</h2>
          <p className="text-gray-300">Sua quilometragem foi computada no tênis ativo.</p>
          <button
            onClick={() => setPhase('idle')}
            className="bg-[#CCFF00] text-black font-bold px-8 py-3 rounded-xl mt-4"
          >
            Voltar
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-between flex-1 py-8 text-center">
          <div>
            <span className="text-xs uppercase tracking-widest font-black opacity-80">
              {phase === 'running' ? '⚡ FASE DE CORRIDA' : '💧 FASE DE CAMINHADA'}
            </span>
            <p className="text-7xl font-black font-mono tracking-tighter mt-4">{formatTime(currentBlockTime)}</p>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-bold">
              Bloco {currentCycle} de {totalCycles}
            </p>
            <p className="text-sm opacity-80">Tempo Restante Total: {formatTime(totalTimeRemaining)}</p>
          </div>

          <button
            onClick={stopWorkout}
            className="bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors"
          >
            Parar Treino
          </button>
        </div>
      )}
    </div>
  );
};