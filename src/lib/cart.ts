import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartState, MenuItem, Variant, AddOn } from '@/types/menu';

const TAX_RATE = 0.08; // 8% tax rate
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: MenuItem, variant?: Variant, addOns: AddOn[] = []) => {
        const { items } = get();
        
        // Safely get the base price with fallback
        const basePrice = item.pricing?.basePrice || 0;
        
        const itemPrice = basePrice + 
          (variant?.priceDelta || 0) + 
          addOns.reduce((sum, addOn) => sum + addOn.price, 0);
        
        const existingItemIndex = items.findIndex(
          (cartItem) => 
            cartItem.id === item.id && 
            cartItem.variant?.id === variant?.id &&
            JSON.stringify(cartItem.addOns.sort((a, b) => a.id.localeCompare(b.id))) === 
            JSON.stringify(addOns.sort((a, b) => a.id.localeCompare(b.id)))
        );

        if (existingItemIndex >= 0) {
          set({
            items: items.map((cartItem, index) =>
              index === existingItemIndex
                ? { 
                    ...cartItem, 
                    quantity: cartItem.quantity + 1,
                    lineTotal: itemPrice * (cartItem.quantity + 1)
                  }
                : cartItem
            ),
          });
        } else {
          const newCartItem: CartItem = {
            id: item.id,
            name: item.name,
            basePrice: basePrice,
            quantity: 1,
            variant,
            addOns,
            lineTotal: itemPrice,
          };
          set({ items: [...items, newCartItem] });
        }
      },

      removeItem: (itemId: string) => {
        set({ items: get().items.filter(item => item.id !== itemId) });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        
        const item = get().items.find(item => item.id === itemId);
        if (!item) return;
        
        const itemPrice = item.basePrice + 
          (item.variant?.priceDelta || 0) + 
          item.addOns.reduce((sum, addOn) => sum + addOn.price, 0);
        
        set({
          items: get().items.map(item =>
            item.id === itemId 
              ? { ...item, quantity, lineTotal: itemPrice * quantity }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.lineTotal, 0);
      },

      getTax: () => {
        return get().getSubtotal() * TAX_RATE;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax();
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
