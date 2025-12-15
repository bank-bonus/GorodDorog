import React, { useState, useEffect, useCallback } from 'react';
import { Resources, BuildingType, GridCell, LogEntry } from './types';
import { BUILDINGS, Icons } from './constants';
import { StatsBar } from './components/StatsBar';
import { BuildingMenu } from './components/BuildingMenu';
import { Grid } from './components/Grid';
import { getCityAdvice } from './services/geminiService';

const GRID_SIZE = 6;
const TICK_RATE_MS = 2000;

// Helper to init grid
const createGrid = (size: number): GridCell[][] => {
  return Array(size).fill(null).map((_, y) =>
    Array(size).fill(null).map((_, x) => ({
      x,
      y,
      building: BuildingType.NONE
    }))
  );
};

export default function App() {
  const [grid, setGrid] = useState<GridCell[][]>(() => createGrid(GRID_SIZE));
  const [resources, setResources] = useState<Resources>({
    money: 500,
    materials: 100,
    energy: 10,
    population: 0,
    maxPopulation: 10
  });
  
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setLogs(prev => [{ id, message, type, timestamp: Date.now() }, ...prev].slice(0, 5));
  }, []);

  // Game Loop (Resources Calculation)
  useEffect(() => {
    const interval = setInterval(() => {
      setResources(prev => {
        let moneyProd = 0;
        let matProd = 0;
        let energyProd = 0;
        let energyCons = 0;
        let matCons = 0;
        let maxPop = 0;

        // Flatten grid to iterate once
        const cells = grid.flat();
        let buildingCount = 0;

        cells.forEach(cell => {
          if (cell.building === BuildingType.NONE) return;
          buildingCount++;
          const stats = BUILDINGS[cell.building];
          
          moneyProd += stats.production.money || 0;
          matProd += stats.production.materials || 0;
          energyProd += stats.production.energy || 0;
          
          energyCons += stats.consumption.energy || 0;
          matCons += stats.consumption.materials || 0;
          
          maxPop += stats.housing || 0;
        });

        const netEnergy = energyProd - energyCons;
        const efficiency = netEnergy < 0 ? 0.5 : 1; // Penalize if low energy

        // New population growth logic (simple)
        let newPop = prev.population;
        if (prev.population < maxPop && netEnergy >= 0) {
            newPop += 1;
        }

        return {
          money: prev.money + (moneyProd * efficiency),
          materials: Math.max(0, prev.materials + (matProd * efficiency) - matCons),
          energy: netEnergy,
          population: Math.min(newPop, maxPop),
          maxPopulation: maxPop
        };
      });
    }, TICK_RATE_MS);

    return () => clearInterval(interval);
  }, [grid]);

  // Handle Building Placement
  const handleCellClick = (x: number, y: number) => {
    if (selectedBuilding === null) return; // Info mode (not implemented in MVP but placeholder exists)

    const currentCell = grid[y][x];

    // Destroy Logic
    if (selectedBuilding === BuildingType.NONE) {
      if (currentCell.building !== BuildingType.NONE) {
        setGrid(prev => {
          const newGrid = [...prev.map(row => [...row])];
          newGrid[y][x] = { ...newGrid[y][x], building: BuildingType.NONE };
          return newGrid;
        });
        addLog('Здание снесено', 'alert');
        // Partially refund? (Not implemented for simplicity)
      }
      return;
    }

    // Build Logic
    if (currentCell.building !== BuildingType.NONE) {
      addLog('Место занято!', 'alert');
      return;
    }

    const buildingStats = BUILDINGS[selectedBuilding];
    if (resources.money >= buildingStats.cost.money && resources.materials >= buildingStats.cost.materials) {
      // Deduct cost
      setResources(prev => ({
        ...prev,
        money: prev.money - buildingStats.cost.money,
        materials: prev.materials - buildingStats.cost.materials
      }));

      // Place building
      setGrid(prev => {
        const newGrid = [...prev.map(row => [...row])];
        newGrid[y][x] = { ...newGrid[y][x], building: selectedBuilding };
        return newGrid;
      });
      
      addLog(`Построено: ${buildingStats.name}`, 'success');
    } else {
      addLog('Недостаточно ресурсов!', 'alert');
    }
  };

  const handleAskAdvisor = async () => {
    if (isAiLoading) return;
    setIsAiLoading(true);
    addLog('Советник анализирует данные...', 'info');
    
    const buildingCount = grid.flat().filter(c => c.building !== BuildingType.NONE).length;
    const advice = await getCityAdvice(resources, buildingCount);
    
    addLog(advice, 'ai');
    setIsAiLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-900 font-sans">
      <StatsBar resources={resources} />
      
      {/* Advisor Button */}
      <div className="fixed top-24 right-4 z-10">
        <button
            onClick={handleAskAdvisor}
            disabled={isAiLoading}
            className={`
                flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full shadow-lg transition-all
                ${isAiLoading ? 'opacity-70 cursor-wait' : ''}
            `}
        >
            <Icons.Bot className="w-5 h-5" />
            <span className="hidden sm:inline font-bold text-sm">Советник</span>
        </button>
      </div>

      {/* Notifications / News Ticker */}
      <div className="fixed top-20 left-4 z-10 flex flex-col items-start gap-2 pointer-events-none">
        {logs.map(log => (
            <div 
                key={log.id} 
                className={`
                    grid-fade-enter max-w-xs sm:max-w-md px-4 py-2 rounded-r-lg border-l-4 shadow-md backdrop-blur-md text-sm
                    ${log.type === 'alert' ? 'bg-red-900/80 border-red-500' : ''}
                    ${log.type === 'success' ? 'bg-green-900/80 border-green-500' : ''}
                    ${log.type === 'info' ? 'bg-slate-800/80 border-slate-500' : ''}
                    ${log.type === 'ai' ? 'bg-purple-900/90 border-purple-400 text-purple-100 font-medium' : ''}
                `}
            >
                {log.message}
            </div>
        ))}
      </div>

      <Grid 
        grid={grid} 
        onCellClick={handleCellClick} 
        selectedBuilding={selectedBuilding}
        resources={resources}
      />

      <BuildingMenu 
        selectedBuilding={selectedBuilding} 
        onSelect={setSelectedBuilding}
        resources={resources} 
      />
    </div>
  );
}