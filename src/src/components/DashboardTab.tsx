import React from 'react';

export const DashboardTab: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-black text-white px-4 pt-6 pb-20 justify-between">
      {/* Topo: Ícone de Notificação */}
      <div className="flex justify-end pr-2">
        <button className="text-gray-400 hover:text-white">🔔</button>
      </div>

      {/* Gráfico Circular Prontidão */}
      <div className="flex flex-col items-center my-4">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" stroke="#2C2C2E" strokeWidth="8" fill="transparent" />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#D4FF00"
              strokeWidth="8"
              strokeDasharray="264"
              strokeDashoffset="60"
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-lg font-bold leading-tight">Prontidão<br />do Dia</p>
          </div>
        </div>

        {/* Métricas de Sono e FC */}
        <div className="flex justify-around w-full max-w-xs mt-6 text-center">
          <div>
            <p className="text-xs text-textSecondary flex items-center justify-center gap-1">🌙 Sono</p>
            <p className="text-xl font-bold mt-1">7h 15m</p>
          </div>
          <div className="border-r border-gray-800 h-8 self-center" />
          <div>
            <p className="text-xs text-textSecondary flex items-center justify-center gap-1">❤️ FC de Repouso</p>
            <p className="text-xl font-bold mt-1">62 BPM</p>
          </div>
        </div>
      </div>

      {/* Card Destaque Branco: Próximo Treino */}
      <div className="bg-white text-black rounded-3xl p-6 text-center shadow-lg my-auto">
        <p className="text-sm font-semibold text-gray-500">Próximo Treino:</p>
        <h2 className="text-2xl font-black mt-1">Intervalado de 20 min</h2>
        
        {/* Paginação de Pontos */}
        <div className="flex justify-center gap-1.5 mt-6">
          <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
        </div>
      </div>
    </div>
  );
};