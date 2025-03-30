import { create } from "zustand";

type UIState = {
  isSidebarOpen: boolean;
  toggelSidebar: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  toggelSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
