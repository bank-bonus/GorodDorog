import React from 'react';

export type ResourceType = 'money' | 'materials' | 'energy' | 'population';

export interface Resources {
  money: number;
  materials: number;
  energy: number;
  population: number;
  maxPopulation: number;
}

export enum BuildingType {
  NONE = 'none',
  RESIDENTIAL = 'residential',
  INDUSTRIAL = 'industrial',
  COMMERCIAL = 'commercial',
  POWER_PLANT = 'power_plant',
  PARK = 'park'
}

export interface BuildingStats {
  id: BuildingType;
  name: string;
  description: string;
  cost: {
    money: number;
    materials: number;
  };
  production: {
    money?: number;
    materials?: number;
    energy?: number;
  };
  consumption: {
    energy?: number;
    materials?: number;
  };
  housing?: number; // Adds to maxPopulation
  color: string;
  icon: React.FC<{ className?: string }>;
}

export interface GridCell {
  x: number;
  y: number;
  building: BuildingType;
}

export interface LogEntry {
  id: string;
  message: string;
  type: 'info' | 'alert' | 'success' | 'ai';
  timestamp: number;
}