import React from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFilter, clearFilters, applyFilters } from "../../store/filterSlice";

import type { Option } from "./FilterSelect";
import FilterSelect from "./FilterSelect";

interface FilterBarProps {
    centerOptions: Option[];
}

const FilterBar: React.FC<FilterBarProps> = ({ centerOptions }) => {
    const dispatch = useAppDispatch();
    const { searchText, pendingServices, pendingTypes, pendingCenters } =
        useAppSelector((state) => state.filter);

    const totalActiveFilters =
        pendingServices.length + pendingTypes.length + pendingCenters.length;

    const handleClearSearch = () => {
        dispatch(setFilter({ key: "searchText", value: "" }));
    };

    const handleApply = () => {
        dispatch(applyFilters());
    };

    const handleReset = () => {
        dispatch(clearFilters());
    };

    return (
        <div className="border border-[#e0e0e0] rounded-lg p-4 space-y-6">
            <div className="space-y-4">
                <FilterSelect
                    label="Services"
                    options={[
                        { key: "therapist", label: "Therapist" },
                        { key: "psychiatrist", label: "Psychiatrist" },
                    ]}
                    selected={pendingServices}
                    onChange={(val) =>
                        dispatch(setFilter({ key: "services", value: val }))
                    }
                />

                <FilterSelect
                    label="Provider Types"
                    options={[
                        { key: "inhouse", label: "In-house" },
                        { key: "external", label: "External" },
                    ]}
                    selected={pendingTypes}
                    onChange={(val) =>
                        dispatch(setFilter({ key: "types", value: val }))
                    }
                />

                <FilterSelect
                    label="Centers"
                    options={centerOptions}
                    selected={pendingCenters}
                    onChange={(val) =>
                        dispatch(setFilter({ key: "centers", value: val }))
                    }
                />
            </div>

            <div className="flex space-x-2 pt-4 border-t border-[#e0e0e0]">
                <button
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
                    onClick={handleReset}
                    disabled={totalActiveFilters === 0}
                >
                    Reset
                </button>
                <button
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
                    onClick={handleApply}
                >
                    Apply
                </button>
            </div>

            <div className="space-y-2">
                <div className="relative">
                    <SearchIcon
                        size={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Enter provider name..."
                        className="w-full pl-10 pr-10 py-2 border border-[#e0e0e0] rounded-md focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-colors outline-none"
                        value={searchText}
                        onChange={(e) =>
                            dispatch(
                                setFilter({
                                    key: "searchText",
                                    value: e.target.value,
                                })
                            )
                        }
                    />
                    {searchText && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <XIcon size={16} />
                        </button>
                    )}
                </div>
                {searchText && (
                    <div className="text-xs text-gray-500">
                        Searching for &ldquo;{searchText}&rdquo;
                    </div>
                )}
            </div>
            <div>
                <div className="text-xs text-gray-500 mb-2">
                    You can search up to 5 provider to view their availability
                    specifically.
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
