import React from "react";
import { SearchIcon, FilterIcon, XIcon } from "lucide-react";
import FilterChip from "./FilterChip";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFilter, clearFilters } from "../../store/filterSlice";

import type { Option } from "./FilterChip";

interface FilterBarProps {
    centerOptions: Option[];
}

const FilterBar: React.FC<FilterBarProps> = ({ centerOptions }) => {
    const dispatch = useAppDispatch();
    const { services, types, centers, searchText } = useAppSelector(
        (state) => state.filter
    );

    const totalActiveFilters =
        services.length +
        types.length +
        centers.length +
        (searchText.trim() ? 1 : 0);

    const handleClearSearch = () => {
        dispatch(setFilter({ key: "searchText", value: "" }));
    };

    return (
        <div className="bg-white border rounded-lg p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <FilterIcon size={20} className="text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Filters</h3>
                    {totalActiveFilters > 0 && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                            {totalActiveFilters}
                        </span>
                    )}
                </div>
                {totalActiveFilters > 0 && (
                    <button
                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                        onClick={() => dispatch(clearFilters())}
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Search */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Search Providers
                </label>
                <div className="relative">
                    <SearchIcon
                        size={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Enter provider name..."
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
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

            {/* Filter Chips */}
            <div className="space-y-4">
                <FilterChip
                    label="Services"
                    options={[
                        { key: "therapist", label: "Therapist" },
                        { key: "psychiatrist", label: "Psychiatrist" },
                    ]}
                    selected={services}
                    onChange={(val) =>
                        dispatch(setFilter({ key: "services", value: val }))
                    }
                />

                <FilterChip
                    label="Provider Types"
                    options={[
                        { key: "inhouse", label: "In-house" },
                        { key: "external", label: "External" },
                    ]}
                    selected={types}
                    onChange={(val) =>
                        dispatch(setFilter({ key: "types", value: val }))
                    }
                />

                <FilterChip
                    label="Centers"
                    options={centerOptions}
                    selected={centers}
                    onChange={(val) =>
                        dispatch(setFilter({ key: "centers", value: val }))
                    }
                />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4 border-t">
                <button
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
                    onClick={() => dispatch(clearFilters())}
                    disabled={totalActiveFilters === 0}
                >
                    Reset
                </button>
                <button
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
                    onClick={() => {
                        /* filters apply automatically */
                    }}
                >
                    Apply
                </button>
            </div>

            {/* Quick Stats */}
            <div className="pt-4 border-t">
                <div className="text-xs text-gray-500 mb-2">
                    You can search up to 5 provider to view their availability
                    specifically.
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-100 rounded mr-1"></div>
                        <span>Online</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-100 rounded mr-1"></div>
                        <span>Offline</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-100 rounded mr-1"></div>
                        <span>Both</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-100 rounded mr-1"></div>
                        <span>Blocked</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
