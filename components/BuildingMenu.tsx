import React from 'react';
import { BUILDINGS, Icons } from '../constants';
import { BuildingType, Resources } from '../types';

interface BuildingMenuProps {
  selectedBuilding: BuildingType | null;
  onSelect: (type: BuildingType | null) => void;
  resources: Resources;
}

export const BuildingMenu: React.FC<BuildingMenuProps> = ({ selectedBuilding, onSelect, resources }) => {
  const buildingList = [
    BuildingType.RESIDENTIAL,
    BuildingType.INDUSTRIAL,
    BuildingType.COMMERCIAL,
    BuildingType.POWER_PLANT,
    BuildingType.PARK
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-slate-900/95 border-t border-slate-700 p-2 pb-6 md:pb-2">
      <div className="flex overflow-x-auto gap-2 max-w-4xl mx-auto px-2 pb-2 scrollbar-hide">
        <button
          onClick={() => onSelect(null)}
          className={`flex-shrink-0 flex flex-col items-center justify-center w-20 h-24 rounded-xl border-2 transition-all ${
            selectedBuilding === null 
              ? 'border-blue-400 bg-blue-900/20' 
              : 'border-slate-700 hover:bg-slate-800'
          }`}
        >
          <div className="text-2xl mb-1">Cursor</div>
          <span className="text-xs text-center font-bold">Обзор</span>
        </button>

        <button
          onClick={() => onSelect(BuildingType.NONE)}
          className={`flex-shrink-0 flex flex-col items-center justify-center w-20 h-24 rounded-xl border-2 transition-all ${
            selectedBuilding === BuildingType.NONE 
              ? 'border-red-400 bg-red-900/20' 
              : 'border-slate-700 hover:bg-slate-800'
          }`}
        >
          <Icons.Bulldozer className="w-6 h-6 mb-2 text-red-400" />
          <span className="text-xs text-center font-bold text-red-200">Снос</span>
        </button>

        <div className="w-px bg-slate-700 mx-1 flex-shrink-0" />

        {buildingList.map((type) => {
          const stats = BUILDINGS[type];
          const canAfford = resources.money >= stats.cost.money && resources.materials >= stats.cost.materials;
          const isSelected = selectedBuilding === type;

          return (
            <button
              key={type}
              disabled={!canAfford}
              onClick={() => onSelect(type)}
              className={`flex-shrink-0 flex flex-col p-2 w-28 h-24 rounded-xl border-2 transition-all relative ${
                isSelected
                  ? 'border-green-400 bg-green-900/20 shadow-[0_0_15px_rgba(74,222,128,0.2)]' 
                  : canAfford 
                    ? 'border-slate-700 hover:bg-slate-800 hover:border-slate-500'
                    : 'border-slate-800 bg-slate-900 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <stats.icon className="w-5 h-5" />
                <span className="text-[10px] font-bold truncate">{stats.name}</span>
              </div>
              
              <div className="flex flex-col gap-0.5 mt-auto">
                <div className={`flex items-center text-xs ${resources.money < stats.cost.money ? 'text-red-400' : 'text-slate-300'}`}>
                   <Icons.Money className="w-3 h-3 mr-1" /> {stats.cost.money}
                </div>
                {stats.cost.materials > 0 && (
                  <div className={`flex items-center text-xs ${resources.materials < stats.cost.materials ? 'text-red-400' : 'text-slate-300'}`}>
                    <Icons.Materials className="w-3 h-3 mr-1" /> {stats.cost.materials}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};