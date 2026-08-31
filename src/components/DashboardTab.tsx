import React from 'react';
import { ReadinessData } from '../types';

export const DashboardTab: React.FC = () => {
  const readiness: ReadinessData = {
    score: 88,
    restingHeartRate: 54,
    sleepHours: 7.5
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard e Saúde</h2>

      {/* Card Anel de Prontidão */}
      <div className="bg-[#171717] p-6 rounded-3xl border border-gray-800 text-center relative overflow-hidden">
        <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Indicador de Prontidão</span>
        <div className="my-4 flex justify-center items-center">
          <div className="w-32 h-32 rounded-full border-8 border-[#CCFF00] flex items-center justify-center bg-[#0A0A0A] shadow-[0_0_20px_rgba(204,255,0,0.2)]">
            <span className="text-3xl font-black text-[#CCFF00]">{readiness.score}%</span>
          </div>
        </div>
        <p className="text-sm font-bold text-[#10B981]">Status: Pronto para Treinar</p>
      </div>

      {/* Métricas Consolidadas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#171717] p-4 rounded-2xl border border-gray-800">
          <span className="text-xs text-gray-400">FC Repouso</span>
          <p className="text-xl font-bold text-white mt-1">{readiness.restingHeartRate} <span className="text-xs font-normal text-gray-400">BPM</span></p>
        </div>
        <div className="bg-[#171717] p-4 rounded-2xl border border-gray-800">
          <span className="text-xs text-gray-400">Último Sono</span>
          <p className="text-xl font-bold text-white mt-1">{readiness.sleepHours} <span className="text-xs font-normal text-gray-400">horas</span></p>
        </div>
      </div>

      {/* Card de Próximo Treino */}
      <div className="bg-[#171717] p-5 rounded-2xl border border-[#CCFF00]/30">
        <span className="text-xs text-[#CCFF00] font-bold uppercase">Sugerido para Hoje</span>
        <h3 className="text-lg font-bold text-white mt-1">Sessão Intervalada de 20 min</h3>
        <p className="text-xs text-gray-400 mt-1">3 min Corrida / 2 min Caminhada (4 ciclos)</p>
      </div>
    </div>
  );
};