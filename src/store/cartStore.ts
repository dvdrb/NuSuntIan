// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import type { ClothesType } from "./data";
import { clothes } from "./data";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OmitClothes = Omit<ClothesType, "quantity" | "size">;
type OmitClothesCN = Omit<ClothesType, "className">;

type CartStore = {
  availableItems: OmitClothes[];
  cart: OmitClothesCN[];
  order: OmitClothesCN[];
  openMenu: boolean;
  toggleMenu: () => void;
  addToCart: (item: ClothesType) => void;
  addToOrder: (item: ClothesType) => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, updatedItem: Partial<OmitClothesCN>) => void;
  clearCart: () => void;
  clearOrder: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      order: [],
      openMenu: false,
      availableItems: clothes,
      addToCart: (item) =>
        set((state) => {
          const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            className,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            availableSizes,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ...itemWithoutAdditionalProps
          } = item;
          const existingItemIndex = state.cart.findIndex(
            (cartItem) =>
              cartItem.size === item.size &&
              cartItem.color.color === item.color.color &&
              cartItem.name.title === item.name.title &&
              cartItem.name.type === item.name.type
          );
          if (existingItemIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: updatedCart[existingItemIndex].quantity + 1,
            };
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, itemWithoutAdditionalProps] };
          }
        }),
      addToOrder: () => set((state) => ({ order: state.cart })),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      updateCartItem: (id, updatedItem) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item.id === id) {
              return { ...item, ...updatedItem };
            }
            return item;
          }),
        })),
      clearCart: () => set({ cart: [] }),
      clearOrder: () => set({ order: [] }),
      toggleMenu: () => set((state) => ({ openMenu: !state.openMenu })),
    }),
    {
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["availableItems", "openMenu"].includes(key)
          )
        ),
      name: "cart",
    }
  )
);
