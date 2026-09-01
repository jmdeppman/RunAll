import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Saúde', icon: '💚' },
    { id: 'timer', label: 'Treino', icon: '🏋️' },
    { id: 'equipment', label: 'Tênis', icon: '👟' },
    { id: 'history', label: 'Histórico', icon: '🔄' },
  ];

  return (
    <nav className="fixed bottom-0 max-w-md w-full bg-black border-t border-gray-900 flex justify-around p-3 z-50">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center transition-all ${
              isActive ? 'text-[#D4FF00]' : 'text-gray-500'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span className={`text-[11px] mt-1 ${isActive ? 'font-bold text-[#D4FF00]' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};