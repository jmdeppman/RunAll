import React from 'react';

export const IntervalTimerTab: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-black text-white px-4 pt-6 pb-20 justify-between">
      {/* Configuração superior */}
      <div className="flex justify-end pr-2">
        <button className="text-gray-400">⚙️</button>
      </div>

      {/* Selectores de Tempo (Pickers) */}
      <div className="grid grid-cols-2 gap-4 text-center my-2">
        <div>
          <p className="text-sm text-gray-300 mb-2 font-medium">Corrida:</p>
          <div className="bg-black py-2">
            <p className="text-xs text-gray-600">3'</p>
            <p className="text-xs text-gray-500 my-1">12'</p>
            <p className="text-2xl font-bold text-white bg-surfaceCard rounded-xl py-1">3' 30"</p>
            <p className="text-xs text-gray-500 my-1">30</p>
            <p className="text-xs text-gray-600">45</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-300 mb-2 font-medium">Caminhada:</p>
          <div className="bg-black py-2">
            <p className="text-xs text-gray-600">2</p>
            <p className="text-xs text-gray-500 my-1">00</p>
            <p className="text-2xl font-bold text-white bg-surfaceCard rounded-xl py-1">2' 0"</p>
            <p className="text-xs text-gray-500 my-1">0'</p>
            <p className="text-xs text-gray-600">0</p>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">Treino: 30 min.</p>

      {/* Gráfico de Barras do Treino */}
      <div className="bg-black p-4 rounded-2xl border border-gray-900 my-2">
        <div className="flex justify-center gap-4 mb-3">
          <span className="w-8 h-2 bg-runGreen rounded-full"></span>
          <span className="w-8 h-2 bg-runGreen rounded-full"></span>
        </div>

        <div className="flex items-end justify-between h-28 gap-1 px-2">
          <div className="w-full bg-runGreen h-[40%] rounded-t-sm"></div>
          <div className="w-full bg-runGreen h-[70%] rounded-t-sm"></div>
          <div className="w-full bg-runGreen h-[55%] rounded-t-sm"></div>
          <div className="w-full bg-runGreen h-[85%] rounded-t-sm"></div>
          <div className="w-full bg-walkBlue h-[60%] rounded-t-sm"></div>
          <div className="w-full bg-runGreen h-[90%] rounded-t-sm"></div>
          <div className="w-full bg-runGreen h-[75%] rounded-t-sm"></div>
          <div className="w-full bg-walkBlue h-[50%] rounded-t-sm"></div>
          <div className="w-full bg-runGreen h-[100%] rounded-t-sm"></div>
          <div className="w-full bg-runGreen h-[80%] rounded-t-sm"></div>
          <div className="w-full bg-walkBlue h-[65%] rounded-t-sm"></div>
        </div>

        <div className="flex justify-between text-[10px] text-gray-500 mt-2 px-1">
          <span>0</span>
          <span>30 min</span>
          <span>30 min</span>
        </div>
      </div>

      {/* Botão Sincronizar */}
      <button className="w-full bg-[#D4FF00] text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md active:opacity-90">
        💾 Sincronizar com o Relógio
      </button>
    </div>
  );
};