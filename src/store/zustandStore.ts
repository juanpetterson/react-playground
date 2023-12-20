import { create } from 'zustand';

type CountStore = {
  count: number;
  increaseCount: () => void;
};

export const useCountStore = create<CountStore>((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
}));
