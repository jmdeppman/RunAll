export type TabType = 'dashboard' | 'timer' | 'equipment' | 'history';

export type WorkoutPhase = 'idle' | 'running' | 'walking' | 'finished';

export interface Shoe {
  id: string;
  brandAndModel: string;
  currentKm: number;
  maxKm: number;
  isActive: boolean;
}

export interface WorkoutSession {
  id: string;
  date: string;
  totalTimeSeconds: number;
  distanceKm: number;
  paceMinKm: string;
}

export interface ReadinessData {
  score: number;
  restingHeartRate: number;
  sleepHours: number;
}