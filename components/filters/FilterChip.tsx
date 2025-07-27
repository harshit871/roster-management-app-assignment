import React from "react";
import { CheckIcon } from "lucide-react";

export interface Option {
    key: string;
    label: string;
}

interface FilterChipProps {
    label: string;
    options: Option[];
    selected: string[];
    onChange: (vals: string[]) => void;
}

const FilterChip: React.FC<FilterChipProps> = ({
    label,
    options,
    selected,
    onChange,
}) => {
    const toggle = (key: string) => {
        onChange(
            selected.includes(key)
                ? selected.filter((k) => k !== key)
                : [...selected, key]
        );
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
                {selected.length > 0 && (
                    <span className="text-xs text-gray-500">
                        {selected.length} selected
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {options.map((opt) => {
                    const isSelected = selected.includes(opt.key);
                    return (
                        <button
                            key={opt.key}
                            className={`
                relative px-3 py-2 border rounded-md text-sm font-medium transition-all duration-200
                ${
                    isSelected
                        ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                        : "bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50"
                }
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1
              `}
                            onClick={() => toggle(opt.key)}
                        >
                            <span className="flex items-center space-x-1">
                                {isSelected && <CheckIcon size={12} />}
                                <span>{opt.label}</span>
                            </span>
                        </button>
                    );
                })}
            </div>

            {selected.length === 0 && (
                <div className="text-xs text-gray-400 italic">
                    No {label.toLowerCase()} selected
                </div>
            )}
        </div>
    );
};

export default FilterChip;
