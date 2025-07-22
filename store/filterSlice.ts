import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  services: string[];
  types: string[];
  centers: string[];
  searchText: string;
}

const initialState: FilterState = { services: [], types: [], centers: [], searchText: '' };

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: function <K extends keyof FilterState>(
      state: FilterState,
      action: PayloadAction<{ key: K; value: FilterState[K] }>
    ) {
      state[action.payload.key] = action.payload.value;
    },
    clearFilters: () => initialState,
  },
});

export const { setFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;