import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// A store that persists the cart state in localStorage. This is useful for maintaining the cart state across page reloads.
// A store holds the application state. it's created using the `create` function and returns a hook that can be used to access the state and actions. The `persist` middleware is used to persist the state in localStorage.
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [], // state: the data your store holds.
      addItem: (
        item, // actions: are functions that modify the state. They use the `set` function to update the state. The `set` function takes a callback that receives the current state and returns the new state.
      ) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          } else {
            return {
              items: [...state.items, { ...item, quantity: 1 }],
            };
          }
        }),
      removeItem: (id) =>
        set((state) => {
          return {
            items: state.items.filter((i) => i.id !== id),
          };
        }),
      clearCart: () =>
        set(() => {
          return {
            items: [],
          };
        }),
    }),
    {
      name: "cart-storage", // localStorage key
      partialize: (state) => ({ items: state.items }), // Only persist the parts of the store that we actually want to keep.
    },
  ),
);
