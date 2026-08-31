import React, { useState } from 'react';
import { Shoe } from '../types';

interface Props {
  shoes: Shoe[];
  onAddShoe: (brandAndModel: string) => void;
  onSelectActive: (id: string) => void;
}

export const EquipmentTab: React.FC<Props> = ({ shoes, onAddShoe, onSelectActive }) => {
  const [modelInput, setModelInput] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelInput.trim()) return;
    onAddShoe(modelInput.trim());
    setModelInput('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Meu Equipamento</h2>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          placeholder="Ex: Nike Pegasus 40"
          value={modelInput}
          onChange={(e) => setModelInput(e.target.value)}
          className="flex-1 bg-[#171717] border border-gray-800 rounded-xl px-4 py-3 text-white"
        />
        <button type="submit" className="bg-[#CCFF00] text-black font-bold px-4 rounded-xl">
          Adicionar
        </button>
      </form>

      <div className="space-y-4">
        {shoes.map((shoe) => {
          const percentage = Math.min(100, (shoe.currentKm / shoe.maxKm) * 100);
          const isWarning = percentage >= 85 && percentage < 100;
          const isExpired = percentage >= 100;

          return (
            <div
              key={shoe.id}
              onClick={() => onSelectActive(shoe.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                shoe.isActive ? 'border-[#CCFF00] bg-[#171717]' : 'border-gray-800 bg-[#0A0A0A]'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white text-lg">{shoe.brandAndModel}</h3>
                {shoe.isActive && <span className="text-xs bg-[#CCFF00] text-black px-2 py-1 rounded-md font-bold">Ativo</span>}
              </div>

              <div className="w-full bg-gray-800 rounded-full h-3 mb-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isExpired ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-[#CCFF00]'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-400">
                <span>{shoe.currentKm.toFixed(1)} km rodados</span>
                <span>Limite: {shoe.maxKm} km</span>
              </div>

              {isWarning && (
                <div className="mt-3 text-xs bg-amber-500/10 text-amber-500 p-2 rounded-lg border border-amber-500/20 font-medium">
                  ⚠️ Atenção: Troca recomendada em breve (85% do limite).
                </div>
              )}

              {isExpired && (
                <div className="mt-3 text-xs bg-red-500/10 text-red-500 p-2 rounded-lg border border-red-500/20 font-bold">
                  🚨 Perigo de lesão: Amortecimento vencido.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};