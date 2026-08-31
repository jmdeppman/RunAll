import React from 'react';
import { WorkoutSession } from '../types';

interface Props {
  history: WorkoutSession[];
}

export const HistoryTab: React.FC<Props> = ({ history }) => {
  const badges = [
    { id: 1, title: 'Primeiro KM', icon: '🥇', unlocked: history.length > 0 },
    { id: 2, title: 'Consistência 3x', icon: '🔥', unlocked: history.length >= 3 },
    { id: 3, title: 'Meta 10 KM', icon: '⚡', unlocked: history.reduce((acc, curr) => acc + curr.distanceKm, 0) >= 10 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Histórico e Conquistas</h2>

      {/* Seção de Conquistas */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Conquistas</h3>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border text-center ${
                badge.unlocked ? 'bg-[#171717] border-[#CCFF00]' : 'bg-[#0A0A0A] border-gray-900 opacity-40'
              }`}
            >
              <span className="text-2xl">{badge.icon}</span>
              <p className="text-[10px] font-bold text-white mt-1">{badge.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Histórico */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Treinos Concluídos</h3>
        {history.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhum treino gravado localmente no dispositivo.</p>
        ) : (
          <div className="space-y-3">
            {history.map((session) => (
              <div key={session.id} className="bg-[#171717] p-4 rounded-2xl border border-gray-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white text-sm">{session.date}</p>
                  <p className="text-xs text-gray-400">{Math.round(session.totalTimeSeconds / 60)} min de treino</p>
                </div>
                <div className="text-right">
                  <span className="text-[#CCFF00] font-black text-lg font-mono">{session.distanceKm} km</span>
                  <p className="text-[10px] text-gray-400">Pace: {session.paceMinKm} min/km</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};