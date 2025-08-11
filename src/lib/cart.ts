import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartState, MenuItem, Variant, AddOn } from '@/types/menu';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: MenuItem, variant?: Variant, addOns: AddOn[] = []) => {
        const { items } = get();
        
        // Debug logging to see the item structure
        console.log('Adding item to cart:', item);
        console.log('Item pricing:', item.pricing);
        
        // Safely get the base price with fallback
        const basePrice = item.pricing?.basePrice || 0;
        
        if (basePrice === 0) {
          console.warn('Warning: Item has no base price:', item);
        }
        
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
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
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
        
        set({
          items: get().items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce((total, item) => {
          const itemPrice = item.basePrice + 
            (item.variant?.priceDelta || 0) + 
            item.addOns.reduce((sum, addOn) => sum + addOn.price, 0);
          return total + (itemPrice * item.quantity);
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
