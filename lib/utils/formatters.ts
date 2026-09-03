export function formatPrice(price?: number | null): string {
  if (price === undefined || price === null || price <= 0) {
    return 'Price on Request';
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatIndianNumber(num: number): string {
  return num.toLocaleString('en-IN');
}
