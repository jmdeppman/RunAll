import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Saúde', icon: '❤️' },
    { id: 'timer', label: 'Treino', icon: '⏱️' },
    { id: 'equipment', label: 'Tênis', icon: '👟' },
    { id: 'history', label: 'Histórico', icon: '🏆' },
  ];

  return (
    <nav className="fixed bottom-0 max-w-md w-full bg-[#0A0A0A]/95 backdrop-blur-md border-t border-gray-900 flex justify-around p-2 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all ${
            activeTab === tab.id
              ? 'text-[#CCFF00] bg-[#171717] font-bold scale-105'
              : 'text-gray-500 font-medium hover:text-gray-300'
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span className="text-[10px] mt-1">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};