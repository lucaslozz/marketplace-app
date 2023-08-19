import { create } from 'zustand';

type ProductQuality = 'true' | 'false' | 'disabled';

interface SearchParamsProps {
  query: string;
  is_new: string;
  accept_trade: string;
  payment_methods: string[];
}

const InitialParamsToSearch = {
  query: '',
  accept_trade: '',
  is_new: '',
  payment_methods: [],
};

type State = {
  isNew: ProductQuality;
  paramsToSearch: SearchParamsProps;
  setIsNew: (value: ProductQuality) => void;
  setParamsToSearch: (value: SearchParamsProps) => void;
};

export const useFilterStore = create<State>((set) => ({
  isNew: 'disabled',
  paramsToSearch: InitialParamsToSearch,
  setIsNew: (value) => set(() => ({ isNew: value })),
  setParamsToSearch: (value) => set(() => ({ paramsToSearch: value })),
}));
