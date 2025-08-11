export interface Money {
  basePrice: number;
  currency: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface Variant {
  id: string;
  name: string;
  priceDelta: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  dietaryTags?: string[];
  pricing: Money & { variants?: Variant[] };
  addOns?: AddOn[];
  category: string;
  tags?: string[];
  spiceLevel?: number;
  image?: string;
  isPopular?: boolean;
  isTrending?: boolean;
  isSpicy?: boolean;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface MenuResponse {
  menu: {
    sections: MenuSection[];
  };
}

export type FilterType = 'vegetarian' | 'gluten_free' | 'vegan' | 'beverages' | 'mains' | 'spicy' | 'popular' | 'trending';

export interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  variant?: Variant;
  addOns: AddOn[];
  modifiers?: string[];
  lineTotal: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem, variant?: Variant, addOns?: AddOn[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getItemCount: () => number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  source: string;
}

export interface CafeSummary {
  name: string;
  tagline: string;
  about: string;
  heroImage?: string;
}

export type SortOption = 'popularity' | 'price-low' | 'price-high' | 'newest';

export interface MenuFilters {
  category: string;
  dietary: string[];
  spiceLevel: number[];
  priceRange: [number, number];
  search: string;
}