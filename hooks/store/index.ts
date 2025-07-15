import { DetailFilterType, FilterProps, PostFormType } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface OpenStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePostOpenStore = create<OpenStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface EditOpenStore {
  id?: number;
  isOpen: boolean;
  onOpen: (id?: number) => void;
  onClose: () => void;
}

export const usePostEditOpenStore = create<EditOpenStore>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));

const POST_FORM_INITIAL: PostFormType = {
  title: "",
  locations: [],
  content: "",
  cities_id: 0,
  countries_id: 0,
  districts_id: 0,
  url: "",
  slug: "",
};

interface PostFormStore {
  postForm: PostFormType;
  setPostForm: (form: PostFormType) => void;
  resetPostForm: () => void;
}

export const usePostFormStore = create<PostFormStore>()(
  persist(
    (set) => ({
      postForm: { ...POST_FORM_INITIAL },
      setPostForm: (form) => set({ postForm: form }),
      resetPostForm: () => set({ postForm: { ...POST_FORM_INITIAL } }),
    }),
    {
      name: "post-form-storage",
    }
  )
);

interface PostTypeStore {
  postType: "list" | "gallery";
  setPostType: (type: "list" | "gallery") => void;
}

export const usePostTypeStore = create<PostTypeStore>()(
  persist(
    (set) => ({
      postType: "list",
      setPostType: (type) => set({ postType: type }),
    }),
    {
      name: "post-type",
    }
  )
);

interface SearchStore {
  q?: string;
  setQ: (q: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  q: "",
  setQ: (q) => set({ q }),
}));

export const useShareOpenStore = create<OpenStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useCommentEditOpenStore = create<EditOpenStore>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));

interface UserEditOpenStore {
  id?: string;
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
}

export const useUserEditOpenStore = create<UserEditOpenStore>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));
