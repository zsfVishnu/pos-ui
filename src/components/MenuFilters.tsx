'use client';

import { MenuFilters, SortOption } from '@/types/menu';

interface MenuFiltersProps {
  filters: MenuFilters;
  onFiltersChange: (filters: MenuFilters) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  categories: string[];
}

export function MenuFiltersComponent({ 
  filters, 
  onFiltersChange, 
  sortBy, 
  onSortChange,
  categories 
}: MenuFiltersProps) {
  const updateFilter = (key: keyof MenuFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleDietary = (dietary: string) => {
    const newDietary = filters.dietary.includes(dietary)
      ? filters.dietary.filter(d => d !== dietary)
      : [...filters.dietary, dietary];
    updateFilter('dietary', newDietary);
  };

  const toggleSpiceLevel = (level: number) => {
    const newSpiceLevel = filters.spiceLevel.includes(level)
      ? filters.spiceLevel.filter(l => l !== level)
      : [...filters.spiceLevel, level];
    updateFilter('spiceLevel', newSpiceLevel);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search menu items..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary Filters */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Dietary:</span>
            {['vegetarian', 'vegan', 'gluten_free'].map(dietary => (
              <button
                key={dietary}
                onClick={() => toggleDietary(dietary)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filters.dietary.includes(dietary)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {dietary.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Spice Level */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Spice:</span>
            {[1, 2, 3, 4, 5].map(level => (
              <button
                key={level}
                onClick={() => toggleSpiceLevel(level)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  filters.spiceLevel.includes(level)
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {level}🌶️
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Price:</span>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilter('priceRange', [0, parseInt(e.target.value)])}
              className="w-20"
            />
            <span className="text-xs text-gray-600">₹{filters.priceRange[1]}</span>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2 ml-auto">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}