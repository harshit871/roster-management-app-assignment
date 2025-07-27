import React from "react";
import { ChevronDownIcon } from "lucide-react";

export interface Option {
    key: string;
    label: string;
}

interface FilterSelectProps {
    label: string;
    options: Option[];
    selected: string[];
    onChange: (vals: string[]) => void;
    placeholder?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
    label,
    options,
    selected,
    onChange,
    placeholder = "Enter Text",
}) => {
    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value;
        if (value && !selected.includes(value)) {
            onChange([...selected, value]);
        }
    };

    const removeSelection = (valueToRemove: string) => {
        onChange(selected.filter((val) => val !== valueToRemove));
    };

    const selectedLabels = selected.map(
        (val) => options.find((opt) => opt.key === val)?.label || val
    );

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            {/* Selected items display */}
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {selectedLabels.map((label, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                        >
                            {label}
                            <button
                                onClick={() => removeSelection(selected[index])}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Dropdown */}
            <div className="relative">
                <select
                    value=""
                    onChange={handleSelectChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-colors outline-none appearance-none cursor-pointer"
                >
                    <option value="" disabled className="text-gray-400">
                        {placeholder}
                    </option>
                    {options
                        .filter((option) => !selected.includes(option.key))
                        .map((option) => (
                            <option key={option.key} value={option.key}>
                                {option.label}
                            </option>
                        ))}
                </select>
                <ChevronDownIcon
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
            </div>
        </div>
    );
};

export default FilterSelect;
