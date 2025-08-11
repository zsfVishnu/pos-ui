export function formatMoney(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateItemPrice(
  basePrice: number,
  variant?: { priceDelta: number },
  addOns: { price: number }[] = []
): number {
  const variantPrice = variant ? variant.priceDelta : 0;
  const addOnsPrice = addOns.reduce((sum, addOn) => sum + addOn.price, 0);
  return basePrice + variantPrice + addOnsPrice;
}
