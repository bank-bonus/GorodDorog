import React from 'react';
import { BuildingStats, BuildingType } from './types';

// Simple SVG Icons components
export const Icons = {
  Money: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
  ),
  Materials: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
  ),
  Energy: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Population: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  House: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Factory: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>
  ),
  Shop: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  ),
  Zap: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Tree: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22v-5"/><path d="M5 12c0-5 2.5-10 7-10s7 5 7 10a7 7 0 0 1-14 0z"/></svg>
  ),
  Bulldozer: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 21h18"/><path d="M5 21v-7"/><path d="M19 21v-7"/><path d="M9 21v-6h6v6"/><path d="M12 2a4 4 0 0 0-4 4v3h8V6a4 4 0 0 0-4-4Z"/></svg>
  ),
  Bot: ({ className }: { className?: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
  )
};

export const BUILDINGS: Record<BuildingType, BuildingStats> = {
  [BuildingType.NONE]: {
    id: BuildingType.NONE,
    name: 'Пусто',
    description: 'Пустой участок земли',
    cost: { money: 0, materials: 0 },
    production: {},
    consumption: {},
    color: 'bg-slate-800',
    icon: () => null
  },
  [BuildingType.RESIDENTIAL]: {
    id: BuildingType.RESIDENTIAL,
    name: 'Жилой Дом',
    description: 'Увеличивает макс. население. Генерирует небольшой доход.',
    cost: { money: 100, materials: 20 },
    production: { money: 2 },
    consumption: { energy: 1 },
    housing: 15,
    color: 'bg-green-600',
    icon: Icons.House
  },
  [BuildingType.INDUSTRIAL]: {
    id: BuildingType.INDUSTRIAL,
    name: 'Завод',
    description: 'Производит материалы. Потребляет много энергии.',
    cost: { money: 200, materials: 0 },
    production: { materials: 5 },
    consumption: { energy: 4 },
    housing: 0,
    color: 'bg-orange-600',
    icon: Icons.Factory
  },
  [BuildingType.COMMERCIAL]: {
    id: BuildingType.COMMERCIAL,
    name: 'ТЦ',
    description: 'Генерирует много денег. Требует материалы для обслуживания.',
    cost: { money: 150, materials: 50 },
    production: { money: 15 },
    consumption: { energy: 2, materials: 1 },
    housing: 0,
    color: 'bg-blue-600',
    icon: Icons.Shop
  },
  [BuildingType.POWER_PLANT]: {
    id: BuildingType.POWER_PLANT,
    name: 'АЭС',
    description: 'Генерирует огромное количество энергии.',
    cost: { money: 400, materials: 100 },
    production: { energy: 20 },
    consumption: {},
    housing: 0,
    color: 'bg-yellow-600',
    icon: Icons.Zap
  },
  [BuildingType.PARK]: {
    id: BuildingType.PARK,
    name: 'Парк',
    description: 'Повышает привлекательность города (декорация).',
    cost: { money: 50, materials: 10 },
    production: { money: 1 },
    consumption: {},
    housing: 0,
    color: 'bg-emerald-500',
    icon: Icons.Tree
  }
};