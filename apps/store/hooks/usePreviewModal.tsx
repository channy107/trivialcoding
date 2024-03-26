import { create } from "zustand";
import { TSelectStoreProduct } from "@/db/schema";

interface PreviewModalStore {
  isOpen: boolean;
  data?: TSelectStoreProduct;
  onOpen: (data: TSelectStoreProduct) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: TSelectStoreProduct) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
