import React from "react";

type Option = {
    key: string;
    label: string;
}

interface FilterSelectProps {
    label: string;
    options: Option[];
    selected: string[];
    onChange: (vals: string[]) => void;
    multiple?: boolean;
}

const FilterSelect = ({ label, options, selected, onChange, multiple }: FilterSelectProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                value={selected}
                onChange={(e) =>
                    onChange(
                        multiple
                            ? Array.from(e.target.selectedOptions, (o) => o.value)
                            : [e.target.value]
                    )
                }
                multiple={multiple}
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-2
                    text-gray-700
                    shadow-sm
                   focus:ring-orange-200 focus:border-orange-400
                    focus:outline-none
                    appearance-none
                "
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.5em 1.5em",
                }}
            >
                {!multiple && (
                    <option value="" disabled hidden>
                        Enter Text
                    </option>
                )}
                {options.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterSelect;
