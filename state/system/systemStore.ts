import { create } from 'zustand';

interface SystemState {
  isWatchdogRunning: boolean;
  lastMountTimestamp: number | null;
  mountHealth: 'healthy' | 'unstable' | 'failed';
  
  setWatchdog: (running: boolean) => void;
  reportMount: () => void;
  setMountHealth: (health: 'healthy' | 'unstable' | 'failed') => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  isWatchdogRunning: false,
  lastMountTimestamp: null,
  mountHealth: 'healthy',

  setWatchdog: (running) => set({ isWatchdogRunning: running }),

  reportMount: () => set({ lastMountTimestamp: Date.now(), mountHealth: 'healthy' }),

  setMountHealth: (health) => set({ mountHealth: health }),
}));
