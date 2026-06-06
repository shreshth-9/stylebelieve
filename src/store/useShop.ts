import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface ShopState {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  quickView: Product | null;
  coupon: string | null;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  setCartOpen: (open: boolean) => void;
  setQuickView: (product: Product | null) => void;
  applyCoupon: (code: string) => boolean;
}

const keyOf = (id: string, size: string, color: string) => `${id}-${size}-${color}`;

export const COUPONS: Record<string, number> = {
  BELIEVE10: 0.1,
  STYLE20: 0.2,
};

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      cartOpen: false,
      quickView: null,
      coupon: null,
      addToCart: (product, size, color, quantity = 1) => {
        const key = keyOf(product.id, size, color);
        const existing = get().cart.find((i) => i.id === key);
        if (existing) {
          set({
            cart: get().cart.map((i) =>
              i.id === key ? { ...i, quantity: i.quantity + quantity } : i,
            ),
            cartOpen: true,
          });
        } else {
          set({
            cart: [...get().cart, { id: key, product, size, color, quantity }],
            cartOpen: true,
          });
        }
      },
      removeFromCart: (key) => set({ cart: get().cart.filter((i) => i.id !== key) }),
      updateQuantity: (key, quantity) =>
        set({
          cart: get()
            .cart.map((i) => (i.id === key ? { ...i, quantity: Math.max(1, quantity) } : i)),
        }),
      clearCart: () => set({ cart: [], coupon: null }),
      toggleWishlist: (id) =>
        set({
          wishlist: get().wishlist.includes(id)
            ? get().wishlist.filter((w) => w !== id)
            : [...get().wishlist, id],
        }),
      setCartOpen: (open) => set({ cartOpen: open }),
      setQuickView: (product) => set({ quickView: product }),
      applyCoupon: (code) => {
        const normalized = code.trim().toUpperCase();
        if (COUPONS[normalized]) {
          set({ coupon: normalized });
          return true;
        }
        return false;
      },
    }),
    { name: "style-believe-shop" },
  ),
);

export const cartCount = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + item.quantity, 0);

export const cartSubtotal = (cart: CartItem[]) =>
  cart.reduce(
    (sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity,
    0,
  );