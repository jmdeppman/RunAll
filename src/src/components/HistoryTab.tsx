import React from 'react';

export const HistoryTab: React.FC = () => {
  const runs = [
    { id: 1, date: '06/02/2023', time: '13:30', distance: '3.5 km', pace: '6:00 min/km' },
    { id: 2, date: '04/02/2023', time: '13:30', distance: '3.5 km', pace: '6:00 min/km' },
    { id: 3, date: '18/08/2023', time: '20:30', distance: '3.5 km', pace: '6:00 min/km' },
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white px-4 pt-6 pb-20 justify-between">
      {/* Topo */}
      <div className="flex justify-end pr-2 mb-2">
        <button className="text-gray-400">⚙️</button>
      </div>

      {/* Cards de Treinos com Mapa */}
      <div className="space-y-3 overflow-y-auto">
        {runs.map((run) => (
          <div key={run.id} className="bg-white text-black p-3.5 rounded-2xl flex items-center justify-between shadow">
            <div className="flex items-center gap-3">
              {/* Thumbnail Mapa */}
              <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 flex items-center justify-center">
                <svg className="w-12 h-12 text-runGreen stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">{run.date}</p>
                <p className="text-[10px] text-gray-500">🕒 {run.time}</p>
                <p className="text-[10px] text-gray-500">📈 Avég pace</p>
                <p className="text-xs font-bold mt-1">Treino de Ontem | {run.distance} | {run.pace}</p>
              </div>
            </div>
            <span className="text-gray-400 text-sm">›</span>
          </div>
        ))}
      </div>

      {/* Painel Inferior Claro de Conquistas */}
      <div className="bg-surfaceLight text-black rounded-3xl p-4 mt-4">
        <h3 className="text-sm font-bold mb-3">Conquistas</h3>
        <div className="grid grid-cols-4 gap-3 text-center">
          {/* Conquistas Desbloqueadas */}
          <div className="w-10 h-10 mx-auto rounded-full bg-[#D4FF00] border-2 border-black flex items-center justify-center font-bold text-sm">✓</div>
          <div className="w-10 h-10 mx-auto rounded-full bg-[#D4FF00] border-2 border-black flex items-center justify-center font-bold text-sm">✓</div>
          <div className="w-10 h-10 mx-auto rounded-full bg-[#D4FF00] border-2 border-black flex items-center justify-center font-bold text-sm">✓</div>
          <div className="w-10 h-10 mx-auto rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center font-bold text-sm text-gray-500">✓</div>

          {/* Conquistas Bloqueadas */}
          <div className="w-10 h-10 mx-auto rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center font-bold text-sm text-gray-500">✓</div>
          <div className="w-10 h-10 mx-auto rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center font-bold text-sm text-gray-500">✓</div>
          <div className="w-10 h-10 mx-auto rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center font-bold text-sm text-gray-500">✓</div>
          <div className="w-10 h-10 mx-auto rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center font-bold text-sm text-gray-500">✓</div>
        </div>
      </div>
    </div>
  );
};