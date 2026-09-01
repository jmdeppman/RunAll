import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TabType, Shoe, WorkoutSession } from './types';
import { IntervalTimerTab } from './components/IntervalTimerTab';
import { EquipmentTab } from './components/TempTab';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('timer');
  
  const [shoes, setShoes] = useLocalStorage<Shoe[]>('runall_shoes', [
    { id: '1', brandAndModel: 'Nike Pegasus 40', currentKm: 512, maxKm: 600, isActive: true }
  ]);
  
  const [history, setHistory] = useLocalStorage<WorkoutSession[]>('runall_history', []);

  const activeShoe = shoes.find((s) => s.isActive) || null;

  const handleWorkoutComplete = (distanceKm: number, timeSeconds: number) => {
    // 1. Atualizar a distância do tênis ativo no localStorage
    if (activeShoe) {
      setShoes((prevShoes) =>
        prevShoes.map((shoe) =>
          shoe.id === activeShoe.id ? { ...shoe, currentKm: shoe.currentKm + distanceKm } : shoe
        )
      );
    }

    // 2. Salvar histórico da sessão no localStorage
    const newSession: WorkoutSession = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      totalTimeSeconds: timeSeconds,
      distanceKm,
      paceMinKm: '5:40'
    };
    setHistory((prev) => [newSession, ...prev]);
  };

  const handleAddShoe = (brandAndModel: string) => {
    const newShoe: Shoe = {
      id: Date.now().toString(),
      brandAndModel,
      currentKm: 0,
      maxKm: 600,
      isActive: shoes.length === 0
    };
    setShoes([...shoes, newShoe]);
  };

  const handleSelectActiveShoe = (id: string) => {
    setShoes(shoes.map((s) => ({ ...s, isActive: s.id === id })));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col max-w-md mx-auto border-x border-gray-900">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-gray-900">
        <h1 className="text-xl font-black italic tracking-wider text-[#CCFF00]">RUNALL</h1>
        <span className="text-xs bg-gray-900 text-gray-400 px-3 py-1 rounded-full border border-gray-800">
          Local Storage Safe
        </span>
      </header>

      {/* Conteúdo Aba */}
      <main className="flex-1 p-4 pb-24">
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="bg-[#171717] p-6 rounded-2xl border border-gray-800 text-center">
              <span className="text-sm text-gray-400">Prontidão para Treino</span>
              <p className="text-4xl font-black text-[#CCFF00] mt-1">92% (Pronto)</p>
            </div>
          </div>
        )}

        {activeTab === 'timer' && (
          <IntervalTimerTab activeShoe={activeShoe} onWorkoutComplete={handleWorkoutComplete} />
        )}

        {activeTab === 'equipment' && (
          <EquipmentTab shoes={shoes} onAddShoe={handleAddShoe} onSelectActive={handleSelectActiveShoe} />
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Histórico</h2>
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhum treino gravado localmente.</p>
            ) : (
              history.map((h) => (
                <div key={h.id} className="bg-[#171717] p-4 rounded-xl border border-gray-800 flex justify-between">
                  <div>
                    <p className="font-bold">{h.date}</p>
                    <p className="text-xs text-gray-400">{Math.round(h.totalTimeSeconds / 60)} min de treino</p>
                  </div>
                  <span className="text-[#CCFF00] font-bold font-mono">{h.distanceKm} km</span>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 max-w-md w-full bg-[#0A0A0A]/95 backdrop-blur-md border-t border-gray-900 flex justify-around p-3">
        {(['dashboard', 'timer', 'equipment', 'history'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs capitalize font-bold py-2 px-3 rounded-lg transition-colors ${
              activeTab === tab ? 'text-[#CCFF00] bg-[#171717]' : 'text-gray-500'
            }`}
          >
            {tab === 'timer' ? 'Treino' : tab === 'equipment' ? 'Tênis' : tab}
          </button>
        ))}
      </nav>
    </div>
  );
};