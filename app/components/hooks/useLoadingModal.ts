import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useLoadingModal = create<LoginModalStore>((set) => ({
  isOpen: true,
  open: () => set({ isOpen: false }),
  close: () => set({ isOpen: true }),
}));

export default useLoadingModal;
