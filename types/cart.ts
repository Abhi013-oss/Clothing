import { Product } from './product';

export interface StoredCartItem {
  productId: string;
  quantity: number;
}

export interface StoredCart {
  version: number;
  items: StoredCartItem[];
}

export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  thumbnailUrl: string;
  categoryName?: string;
  price?: number;
  quantity: number;
  isAvailable?: boolean;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  totalItemCount: number;
  subtotal: number | null; // null if any item is unpriced
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  removedItemsNotice: string[];
  clearRemovedItemsNotice: () => void;
  validateCartWithRegistry: () => void;
}
