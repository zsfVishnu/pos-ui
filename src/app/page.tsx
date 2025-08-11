'use client';

import { useState, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MenuSection, FilterType, MenuFilters, SortOption, MenuItem } from '@/types/menu';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ReviewSummary } from '@/components/ReviewSummary';
import { ReviewCarousel } from '@/components/ReviewCarousel';
import { DiscoverySection } from '@/components/DiscoverySection';
import { MenuFiltersComponent } from '@/components/MenuFilters';
import { MenuGrid } from '@/components/MenuGrid';
import { CartDrawer } from '@/components/CartDrawer';
import { Toast } from '@/components/Toast';
import { useCartStore } from '@/lib/cart';
import { useToast } from '@/hooks/useToast';
import { cafeSummary, reviews, enhancedMenuData } from '@/lib/mockData';

export default function MenuPage() {
  const [filters, setFilters] = useState<MenuFilters>({
    category: '',
    dietary: [],
    spiceLevel: [],
    priceRange: [0, 1000],
    search: ''
  });
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { toast, showToast, hideToast } = useToast();
  
  // Using mock data instead of API call for demo
  const { data: menuData, isLoading, error } = useQuery({
    queryKey: ['menu'],
    queryFn: () => Promise.resolve(enhancedMenuData),
  });

  const cartTotal = useCartStore((state) => state.getTotal());
  const cartItemCount = useCartStore((state) => state.getItemCount());

  // Get all unique categories
  const categories = useMemo(() => {
    if (!menuData?.menu.sections) return [];
    const cats = new Set<string>();
    menuData.menu.sections.forEach(section => {
      section.items.forEach(item => {
        cats.add(item.category);
      });
    });
    return Array.from(cats);
  }, [menuData]);

  // Get all menu items flattened
  const allItems = useMemo(() => {
    if (!menuData?.menu.sections) return [];
    return menuData.menu.sections.flatMap(section => section.items);
  }, [menuData]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let items = allItems.filter(item => {
      // Search filter
      if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !item.description?.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // Dietary filters
      if (filters.dietary.length > 0) {
        const hasMatchingDietary = filters.dietary.some(dietary => 
          item.dietaryTags?.includes(dietary)
        );
        if (!hasMatchingDietary) return false;
      }

      // Spice level filter
      if (filters.spiceLevel.length > 0) {
        if (!item.spiceLevel || !filters.spiceLevel.includes(item.spiceLevel)) {
          return false;
        }
      }

      // Price range filter
      if (item.pricing.basePrice > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort items
    items.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricing.basePrice - b.pricing.basePrice;
        case 'price-high':
          return b.pricing.basePrice - a.pricing.basePrice;
        case 'newest':
          return b.id.localeCompare(a.id); // Assuming newer items have higher IDs
        case 'popularity':
        default:
          // Popular items first, then trending, then others
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          if (a.isTrending && !b.isTrending) return -1;
          if (!a.isTrending && b.isTrending) return 1;
          return 0;
      }
    });

    return items;
  }, [allItems, filters, sortBy]);

  // Discovery sections
  const trendingItems = useMemo(() => 
    allItems.filter(item => item.isTrending), [allItems]
  );
  
  const spicyItems = useMemo(() => 
    allItems.filter(item => item.isSpicy), [allItems]
  );
  
  const popularItems = useMemo(() => 
    allItems.filter(item => item.isPopular), [allItems]
  );

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDiscoveryFilter = (type: 'trending' | 'spicy' | 'popular') => {
    const newFilters = { ...filters };
    
    switch (type) {
      case 'trending':
        // Filter to show only trending items
        setFilters({ ...newFilters, search: '' });
        setSortBy('newest');
        break;
      case 'spicy':
        // Filter to show only spicy items
        setFilters({ ...newFilters, spiceLevel: [1, 2, 3, 4, 5], search: '' });
        break;
      case 'popular':
        // Filter to show popular items
        setFilters({ ...newFilters, search: '' });
        setSortBy('popularity');
        break;
    }
    
    scrollToMenu();
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
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm shadow-sm border-b border-gray-200 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">{cafeSummary.name}</h1>
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
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <Hero cafeSummary={cafeSummary} onViewMenu={scrollToMenu} />

        {/* About Section */}
        <About cafeSummary={cafeSummary} />

        {/* Reviews Summary */}
        <ReviewSummary reviews={reviews} />

        {/* Reviews Carousel */}
        <ReviewCarousel reviews={reviews} />

        {/* Discovery Sections */}
        {trendingItems.length > 0 && (
          <DiscoverySection
            title="Trending Now"
            items={trendingItems}
            onViewAll={() => handleDiscoveryFilter('trending')}
          />
        )}
        
        {spicyItems.length > 0 && (
          <DiscoverySection
            title="Spicy Picks"
            items={spicyItems}
            onViewAll={() => handleDiscoveryFilter('spicy')}
          />
        )}
        
        {popularItems.length > 0 && (
          <DiscoverySection
            title="Most Popular"
            items={popularItems}
            onViewAll={() => handleDiscoveryFilter('popular')}
          />
        )}

        {/* Full Menu Section */}
        <div ref={menuRef} className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Full Menu</h2>
            
            {/* Menu Filters */}
            <MenuFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              categories={categories}
            />
            
            {/* Menu Grid */}
            <div className="mt-8">
              <MenuGrid items={filteredItems} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {/* Mobile Cart Bar */}
        {cartItemCount > 0 && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total ({cartItemCount} items)</p>
                <p className="text-lg font-bold text-gray-900">₹{cartTotal.toFixed(0)}</p>
              </div>
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-6 py-3 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700"
              >
                View Cart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}
