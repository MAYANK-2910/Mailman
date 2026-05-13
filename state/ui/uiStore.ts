import { create } from 'zustand';

interface UIState {
  expandedStacks: Set<string>;
  selectedThreads: Set<string>;
  isCommandPaletteOpen: boolean;
  
  toggleStack: (stackId: string) => void;
  toggleThread: (threadId: string) => void;
  setCommandPalette: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  expandedStacks: new Set(),
  selectedThreads: new Set(),
  isCommandPaletteOpen: false,

  toggleStack: (stackId) => set((state) => {
    const next = new Set(state.expandedStacks);
    if (next.has(stackId)) next.delete(stackId);
    else next.add(stackId);
    return { expandedStacks: next };
  }),

  toggleThread: (threadId) => set((state) => {
    const next = new Set(state.selectedThreads);
    if (next.has(threadId)) next.delete(threadId);
    else next.add(threadId);
    return { selectedThreads: next };
  }),

  setCommandPalette: (open) => set({ isCommandPaletteOpen: open }),
}));
