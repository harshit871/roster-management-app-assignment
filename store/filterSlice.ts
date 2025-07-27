import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
    services: string[];
    types: string[];
    centers: string[];
    searchText: string;
    pendingServices: string[];
    pendingTypes: string[];
    pendingCenters: string[];
}

const initialState: FilterState = {
    services: [],
    types: [],
    centers: [],
    searchText: "",
    pendingServices: [],
    pendingTypes: [],
    pendingCenters: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter: (
            state,
            action: PayloadAction<{ key: string; value: any }>
        ) => {
            const { key, value } = action.payload;
            if (key === "searchText") {
                (state as any)[key] = value;
            } else {
                (state as any)[
                    `pending${key.charAt(0).toUpperCase()}${key.slice(1)}`
                ] = value;
            }
        },
        applyFilters: (state) => {
            state.services = [...state.pendingServices];
            state.types = [...state.pendingTypes];
            state.centers = [...state.pendingCenters];
        },
        clearFilters: (state) => {
            state.services = [];
            state.types = [];
            state.centers = [];
            state.searchText = "";
            state.pendingServices = [];
            state.pendingTypes = [];
            state.pendingCenters = [];
        },
    },
});

export const { setFilter, applyFilters, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
