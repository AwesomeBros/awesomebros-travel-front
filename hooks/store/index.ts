import { DetailFilterType, FilterProps } from "@/type/types";
import { create } from "zustand";

interface DetailFilterStore {
  detailFilter: null | DetailFilterType;
  setDetailFilter: (filter: null | DetailFilterType) => void;
}

export const useDetailFilterStore = create<DetailFilterStore>((set) => ({
  detailFilter: null,
  setDetailFilter: (filter) => set({ detailFilter: filter }),
}));

export interface FilterStore {
  filterValue: FilterProps;
  setFilterValue: (filterValue: FilterProps) => void;
  showFilter: boolean;
  setShowFilter: (show: boolean) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filterValue: {
    country: { name: "", id: 0 },
    city: { name: "", id: 0 },
    district: { name: "", id: 0 },
  },
  showFilter: false,
  setShowFilter: (show) => set({ showFilter: show }),
  setFilterValue: (filterValue) => set({ filterValue }),
}));

interface PostOpenState {
  id?: number;
  isOpen: boolean;
  onOpen: (id?: number) => void;
  onClose: () => void;
}

export const usePostOpenStore = create<PostOpenState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));
