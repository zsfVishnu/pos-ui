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

export type FilterType = 'vegetarian' | 'gluten_free' | 'beverages' | 'mains';

export interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  variant?: Variant;
  addOns: AddOn[];
}

export interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem, variant?: Variant, addOns?: AddOn[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}
