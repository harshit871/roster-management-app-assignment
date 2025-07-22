import React from 'react';

export interface Option { key: string; label: string; }
interface FilterChipProps {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (vals: string[]) => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, options, selected, onChange }) => {
  const toggle = (key: string) => {
    onChange(selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key]);
  };
  return (
    <div>
      <div className="mb-1 font-medium">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.key}
            className={`px-3 py-1 border rounded ${selected.includes(opt.key) ? 'bg-orange-500 text-white' : 'bg-white'}`}
            onClick={() => toggle(opt.key)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
export default FilterChip;