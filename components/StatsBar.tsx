import React from 'react';
import { Resources } from '../types';
import { Icons } from '../constants';

interface StatsBarProps {
  resources: Resources;
}

const StatItem = ({ icon: Icon, value, label, subValue, danger }: any) => (
  <div className={`flex items-center space-x-2 bg-slate-800/50 backdrop-blur rounded-lg px-3 py-1.5 border ${danger ? 'border-red-500/50' : 'border-slate-700'}`}>
    <Icon className={`w-4 h-4 ${danger ? 'text-red-400' : 'text-blue-300'}`} />
    <div className="flex flex-col leading-none">
      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</span>
      <span className="font-bold font-mono text-sm">
        {Math.floor(value)}
        {subValue && <span className="text-slate-500 text-xs">/{subValue}</span>}
      </span>
    </div>
  </div>
);

export const StatsBar: React.FC<StatsBarProps> = ({ resources }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 p-2 bg-slate-900/90 border-b border-slate-700 shadow-xl">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-between gap-2">
        <StatItem icon={Icons.Money} value={resources.money} label="Казна" />
        <StatItem icon={Icons.Materials} value={resources.materials} label="Материалы" />
        <StatItem icon={Icons.Energy} value={resources.energy} label="Энергия" danger={resources.energy < 0} />
        <StatItem icon={Icons.Population} value={resources.population} subValue={resources.maxPopulation} label="Жители" />
      </div>
    </div>
  );
};