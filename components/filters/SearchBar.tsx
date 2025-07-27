import React, { useState, useRef, useEffect } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFilter } from "../../store/filterSlice";

interface Provider {
    id: number;
    name: string;
    clinic_details: { name: string };
    provider_usertype: string;
    is_inhouse: boolean;
}

interface SelectedProvider {
    id: number;
    name: string;
    clinic: string;
    type: string;
}

interface SearchBarProps {
    allProviders?: Provider[];
    onProvidersSelected?: (providers: SelectedProvider[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    allProviders = [],
    onProvidersSelected,
}) => {
    const dispatch = useAppDispatch();
    const { searchText } = useAppSelector((state) => state.filter);
    const [selectedProviders, setSelectedProviders] = useState<
        SelectedProvider[]
    >([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchText.trim()) {
            const filtered = allProviders.filter(
                (provider) =>
                    provider.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) &&
                    !selectedProviders.some(
                        (selected) => selected.id === provider.id
                    )
            );
            setFilteredProviders(filtered);
            setShowSuggestions(true);
        } else {
            setFilteredProviders([]);
            setShowSuggestions(false);
        }
    }, [searchText, allProviders, selectedProviders]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        onProvidersSelected?.(selectedProviders);
    }, [selectedProviders, onProvidersSelected]);

    const handleClearSearch = () => {
        dispatch(setFilter({ key: "searchText", value: "" }));
        setShowSuggestions(false);
    };

    const handleRemoveProvider = (providerId: number) => {
        setSelectedProviders((prev) => prev.filter((p) => p.id !== providerId));
    };

    const handleSelectProvider = (provider: Provider) => {
        if (selectedProviders.length < 5) {
            const newProvider: SelectedProvider = {
                id: provider.id,
                name: provider.name,
                clinic: provider.clinic_details.name,
                type: provider.provider_usertype,
            };
            setSelectedProviders((prev) => [...prev, newProvider]);
            dispatch(setFilter({ key: "searchText", value: "" }));
            setShowSuggestions(false);
            inputRef.current?.focus();
        }
    };

    const handleClearAll = () => {
        setSelectedProviders([]);
        dispatch(setFilter({ key: "searchText", value: "" }));
        setShowSuggestions(false);
    };

    const handleInputFocus = () => {
        if (searchText.trim() && filteredProviders.length > 0) {
            setShowSuggestions(true);
        }
    };

    return (
        <div className="border border-[#e0e0e0] rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Search Providers</h3>
                {selectedProviders.length > 0 && (
                    <button
                        onClick={handleClearAll}
                        className="text-sm text-red-600 hover:text-red-700 underline"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="relative" ref={dropdownRef}>
                <div className="relative">
                    <SearchIcon
                        size={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search provider names..."
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
                        onFocus={handleInputFocus}
                        disabled={selectedProviders.length >= 5}
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

                {showSuggestions && filteredProviders.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        {filteredProviders.slice(0, 10).map((provider) => (
                            <button
                                key={provider.id}
                                onClick={() => handleSelectProvider(provider)}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                            >
                                <div className="font-medium text-gray-900">
                                    {provider.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {provider.clinic_details.name} •{" "}
                                    {provider.provider_usertype} •{" "}
                                    {provider.is_inhouse
                                        ? "In-house"
                                        : "External"}
                                </div>
                            </button>
                        ))}
                        {filteredProviders.length > 10 && (
                            <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50">
                                Showing 10 of {filteredProviders.length} results
                            </div>
                        )}
                    </div>
                )}

                {showSuggestions &&
                    searchText.trim() &&
                    filteredProviders.length === 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e0e0e0] rounded-lg shadow-lg z-50 px-4 py-3">
                            <div className="text-sm text-gray-500">
                                No providers found matching &ldquo;{searchText}
                                &rdquo;
                            </div>
                        </div>
                    )}
            </div>

            {selectedProviders.length > 0 && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-700">
                            Selected Providers ({selectedProviders.length}/5)
                        </div>
                        {selectedProviders.length >= 5 && (
                            <div className="text-xs text-orange-600">
                                Maximum reached
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        {selectedProviders.map((provider) => (
                            <div
                                key={provider.id}
                                className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-blue-900 truncate">
                                        {provider.name}
                                    </div>
                                    <div className="text-sm text-blue-700 truncate">
                                        {provider.clinic} • {provider.type}
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        handleRemoveProvider(provider.id)
                                    }
                                    className="ml-2 p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors flex-shrink-0"
                                    title={`Remove ${provider.name}`}
                                >
                                    <XIcon size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="text-xs text-gray-500">
                {selectedProviders.length >= 5 ? (
                    <div className="text-orange-600">
                        Maximum 5 providers selected. Remove some to add more.
                    </div>
                ) : (
                    <div>
                        Search and select up to 5 providers to view their
                        availability in the calendar.
                        {selectedProviders.length > 0 &&
                            ` ${5 - selectedProviders.length} slots remaining.`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
