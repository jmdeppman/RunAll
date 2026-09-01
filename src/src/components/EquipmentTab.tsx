import React from 'react';

export const EquipmentTab: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-black text-white px-4 pt-6 pb-20">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Meu Equipamento</h1>
        <button className="text-gray-400">⚙️</button>
      </div>

      {/* Card Tênis */}
      <div className="bg-surfaceCard rounded-3xl p-6 text-center border border-gray-800">
        <h2 className="text-lg font-bold mb-4">Pegasus 39</h2>
        
        {/* Ilustração do Tênis */}
        <div className="my-6 flex justify-center py-4">
          <div className="text-6xl transform -scale-x-100">👟</div>
        </div>

        {/* Barra de Vida Útil */}
        <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden mb-3">
          <div className="bg-warningOrange h-full w-[85%] rounded-full"></div>
        </div>

        <p className="text-xs text-gray-400 font-medium">515 km / 600 km</p>
      </div>

      {/* Alerta de Troca */}
      <div className="flex items-center gap-2 mt-4 px-2">
        <span className="w-2.5 h-2.5 rounded-full bg-warningOrange"></span>
        <p className="text-xs text-gray-300">Atenção: Troca recomendada em breve</p>
      </div>
    </div>
  );
};