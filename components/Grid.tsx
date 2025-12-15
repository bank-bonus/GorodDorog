import React from 'react';
import { GridCell, BuildingType, Resources } from '../types';
import { BUILDINGS } from '../constants';

interface GridProps {
  grid: GridCell[][];
  onCellClick: (x: number, y: number) => void;
  selectedBuilding: BuildingType | null;
  resources: Resources;
}

export const Grid: React.FC<GridProps> = ({ grid, onCellClick, selectedBuilding, resources }) => {
  return (
    <div className="flex justify-center p-4 pt-24 pb-32 min-h-screen items-center overflow-auto">
      <div 
        className="grid gap-1.5 p-3 bg-slate-800 rounded-xl shadow-2xl border-4 border-slate-700"
        style={{ 
          gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))` 
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => {
            const building = BUILDINGS[cell.building];
            const Icon = building.icon;
            
            // Check affordability for hover preview effect
            const canAfford = selectedBuilding && selectedBuilding !== BuildingType.NONE
              ? resources.money >= BUILDINGS[selectedBuilding].cost.money && 
                resources.materials >= BUILDINGS[selectedBuilding].cost.materials
              : true;

            return (
              <button
                key={`${x}-${y}`}
                onClick={() => onCellClick(x, y)}
                className={`
                  w-12 h-12 sm:w-16 sm:h-16 rounded-md flex items-center justify-center transition-all duration-200 relative group
                  ${cell.building === BuildingType.NONE ? 'bg-slate-700/50 hover:bg-slate-700' : building.color}
                  ${selectedBuilding ? 'cursor-crosshair' : 'cursor-pointer'}
                  hover:scale-105 hover:z-10
                `}
              >
                {cell.building !== BuildingType.NONE && (
                   <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-md" />
                )}
                
                {/* Construction Preview */}
                {cell.building === BuildingType.NONE && selectedBuilding && selectedBuilding !== BuildingType.NONE && (
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 rounded-md flex items-center justify-center ${canAfford ? 'bg-green-500' : 'bg-red-500'}`}>
                    {canAfford && <span className="text-white text-2xl font-bold">+</span>}
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};