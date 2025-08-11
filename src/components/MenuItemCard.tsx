'use client';

import { useState } from 'react';
import { MenuItem, Variant, AddOn } from '@/types/menu';
import { formatMoney, calculateItemPrice } from '@/lib/money';
import { useCartStore } from '@/lib/cart';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(
    item.pricing.variants?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [showCustomize, setShowCustomize] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);
  
  const hasVariants = item.pricing.variants && item.pricing.variants.length > 0;
  const hasAddOns = item.addOns && item.addOns.length > 0;
  const canCustomize = hasVariants || hasAddOns;
  
  const currentPrice = calculateItemPrice(
    item.pricing.basePrice,
    selectedVariant,
    selectedAddOns
  );

  const handleAddToCart = () => {
    addItem(item, selectedVariant, selectedAddOns);
  };

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns(prev => 
      prev.find(a => a.id === addOn.id)
        ? prev.filter(a => a.id !== addOn.id)
        : [...prev, addOn]
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">
            {formatMoney(currentPrice, item.pricing.currency)}
          </div>
          {hasVariants && (
            <div className="text-sm text-gray-500">
              {selectedVariant?.name}
            </div>
          )}
        </div>
      </div>

      {item.description && (
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
      )}

      {item.dietaryTags && item.dietaryTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {item.dietaryTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
            >
              {tag.replace('_', ' ')}
            </span>
          ))}
        </div>
      )}

      {canCustomize && (
        <button
          onClick={() => setShowCustomize(!showCustomize)}
          className="text-blue-600 text-sm font-medium hover:text-blue-800 mb-3"
          aria-expanded={showCustomize}
        >
          {showCustomize ? 'Hide options' : 'Customize'}
        </button>
      )}

      {showCustomize && (
        <div className="space-y-3 mb-4">
          {hasVariants && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <div className="flex gap-2">
                {item.pricing.variants?.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3 py-1 text-sm rounded border transition-colors ${
                      selectedVariant?.id === variant.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasAddOns && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add-ons
              </label>
              <div className="space-y-2">
                {item.addOns?.map((addOn) => (
                  <label key={addOn.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.some(a => a.id === addOn.id)}
                      onChange={() => toggleAddOn(addOn)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {addOn.name} (+{formatMoney(addOn.price, item.pricing.currency)})
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}
