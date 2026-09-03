'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { CartItem, CartContextType, StoredCart } from '@/types/cart';
import { Product } from '@/types/product';
import { products as authoritativeProducts } from '@/data/products';
import { loadCartFromStorage, saveCartToStorage } from '@/lib/cart/storage';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [removedItemsNotice, setRemovedItemsNotice] = useState<string[]>([]);

  /**
   * Reconciles stored ID references against the authoritative product repository.
   * Purges deleted or hidden items and notifies the customer.
   */
  const reconcileCart = useCallback((stored: StoredCart): CartItem[] => {
    const validItems: CartItem[] = [];
    const purgedNames: string[] = [];

    for (const storedItem of stored.items) {
      const realProduct = authoritativeProducts.find(
        (p) => p.id === storedItem.productId && p.isActive
      );

      if (!realProduct) {
        // Product no longer exists in catalogue or was deactivated
        purgedNames.push(storedItem.productId);
        continue;
      }

      if (realProduct.availability === 'out_of_stock') {
        // Product became unavailable
        purgedNames.push(realProduct.name);
        continue;
      }

      const primaryImg = realProduct.images.find((img) => img.isPrimary) || realProduct.images[0];

      validItems.push({
        productId: realProduct.id,
        productName: realProduct.name,
        productSlug: realProduct.slug,
        thumbnailUrl: primaryImg ? primaryImg.imageUrl : '',
        categoryName: realProduct.categoryName,
        price: realProduct.price,
        quantity: Math.min(Math.max(storedItem.quantity, 1), 10),
        isAvailable: true,
      });
    }

    if (purgedNames.length > 0) {
      setRemovedItemsNotice(purgedNames);
    }

    return validItems;
  }, []);

  // Initialize and reconcile cart on client mount
  useEffect(() => {
    const stored = loadCartFromStorage();
    const reconciled = reconcileCart(stored);
    setItems(reconciled);
    setIsHydrated(true);

    // Cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bch_cart_v2' || e.key === 'bch_cart_items_v1') {
        const updatedStored = loadCartFromStorage();
        setItems(reconcileCart(updatedStored));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [reconcileCart]);

  // Persist valid references to localStorage on changes
  useEffect(() => {
    if (isHydrated) {
      const storedPayload: StoredCart = {
        version: 1,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      };
      saveCartToStorage(storedPayload);
    }
  }, [items, isHydrated]);

  const addItem = (product: Product, quantity: number = 1) => {
    if (!product.isActive || product.availability === 'out_of_stock') {
      return;
    }

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.productId === product.id);
      const primaryImg = product.images.find((img) => img.isPrimary) || product.images[0];
      const thumb = primaryImg ? primaryImg.imageUrl : '';

      if (existingIndex > -1) {
        // Increment quantity of existing line item (capped at 10)
        const updated = [...prev];
        const newQty = Math.min(updated[existingIndex].quantity + quantity, 10);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        // Create new line item
        const newItem: CartItem = {
          productId: product.id,
          productName: product.name,
          productSlug: product.slug,
          thumbnailUrl: thumb,
          categoryName: product.categoryName,
          price: product.price,
          quantity: Math.min(Math.max(quantity, 1), 10),
          isAvailable: true,
        };
        return [...prev, newItem];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(Math.floor(quantity), 10) }
          : item
      )
    );
  };

  const incrementQuantity = (productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
          : item
      )
    );
  };

  const decrementQuantity = (productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // Invariant: Never drops below 1
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (productId: string): boolean => {
    return items.some((i) => i.productId === productId);
  };

  const clearRemovedItemsNotice = () => {
    setRemovedItemsNotice([]);
  };

  const validateCartWithRegistry = () => {
    const stored = loadCartFromStorage();
    const reconciled = reconcileCart(stored);
    setItems(reconciled);
  };

  // Total item quantity count across all lines
  const totalItemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  // Subtotal calculation (null if any item is unpriced)
  const subtotal = useMemo(() => {
    if (items.length === 0) return 0;
    let sum = 0;
    for (const item of items) {
      if (item.price === undefined || item.price === null) {
        return null;
      }
      sum += item.price * item.quantity;
    }
    return sum;
  }, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isInCart,
    totalItemCount,
    subtotal,
    isOpen,
    setIsOpen,
    removedItemsNotice,
    clearRemovedItemsNotice,
    validateCartWithRegistry,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
