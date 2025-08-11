'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMenu } from '@/lib/api';
import { MenuSection, FilterType } from '@/types/menu';
import { SectionNav } from '@/components/SectionNav';
import { MenuItemCard } from '@/components/MenuItemCard';
import { Filters } from '@/components/Filters';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore } from '@/lib/cart';
import { formatMoney } from '@/lib/money';

export default function MenuPage() {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: menuData, isLoading, error } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  });

  const cartTotal = useCartStore((state) => state.getTotal());
  const cartItemCount = useCartStore((state) => 
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const filteredSections = useMemo(() => {
    if (!menuData?.menu.sections) {
      console.log('Menu data structure:', menuData);
      return [];
    }
    
    // Debug logging to see the actual sections structure
    console.log('Menu sections:', menuData.menu.sections);
    
    return menuData.menu.sections.map(section => {
      console.log('Processing section:', section);
      console.log('Section items:', section.items);
      
      return {
        ...section,
        items: section.items.filter(item => {
          // Debug logging for each item
          console.log('Processing item:', item);
          console.log('Item pricing:', item.pricing);
          
          // Search filter
          const matchesSearch = searchQuery === '' || 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
          
          if (!matchesSearch) return false;
          
          // Dietary and section filters
          if (activeFilters.length === 0) return true;
          
          return activeFilters.some(filter => {
            switch (filter) {
              case 'vegetarian':
                return item.dietaryTags?.includes('vegetarian');
              case 'gluten_free':
                return item.dietaryTags?.includes('gluten_free');
              case 'beverages':
                return section.id === 'sec_coolers' || section.id === 'sec_coffee';
              case 'mains':
                return section.id === 'sec_starters' || section.id === 'sec_mains';
              default:
                return false;
            }
          });
        })
      };
    }).filter(section => section.items.length > 0);
  }, [menuData, activeFilters, searchQuery]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load menu</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">The Peck</h1>
              <span className="ml-2 text-gray-500">— Menu</span>
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Open cart"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Section Navigation */}
      <SectionNav sections={filteredSections} isMobile />

      {/* Filters */}
      <Filters activeFilters={activeFilters} onFilterChange={handleFilterChange} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <SectionNav sections={filteredSections} />
          
          {/* Menu Content */}
          <main className="flex-1">
            {filteredSections.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items match your current filters</p>
                <button
                  onClick={() => {
                    setActiveFilters([]);
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredSections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.items.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Cart Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total ({cartItemCount} items)</p>
            <p className="text-lg font-bold text-gray-900">{formatMoney(cartTotal)}</p>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            View Cart
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
