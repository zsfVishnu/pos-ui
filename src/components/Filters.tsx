'use client';

import { FilterType } from '@/types/menu';

interface FiltersProps {
  activeFilters: FilterType[];
  onFilterChange: (filter: FilterType) => void;
}

const filterLabels: Record<FilterType, string> = {
  vegetarian: 'Vegetarian',
  gluten_free: 'Gluten-free',
  beverages: 'Beverages',
  mains: 'Mains',
};

export function Filters({ activeFilters, onFilterChange }: FiltersProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex flex-wrap gap-3">
        {Object.entries(filterLabels).map(([key, label]) => {
          const filterKey = key as FilterType;
          const isActive = activeFilters.includes(filterKey);
          
          return (
            <button
              key={filterKey}
              onClick={() => onFilterChange(filterKey)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
