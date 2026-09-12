import { useCartStore } from "./cartStore";
import { beforeEach, describe, expect, it } from "vitest";

describe("useCartStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [] }); // Reset the store state before each test to ensure tests are isolated and do not affect each other.
  });

  it("should add an item to the cart", () => {
    const item = { id: "1", name: "Product 1", price: 10 };
    useCartStore.getState().addItem(item);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({ ...item, quantity: 1 });
  });
  it("should increase quantity if the same item is added again", () => {
    const item = { id: "1", name: "Product 1", price: 10 };
    useCartStore.getState().addItem(item);
    useCartStore.getState().addItem(item);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({ ...item, quantity: 2 });
  });
  it("should remove an item from the cart", () => {
    const item = { id: "1", name: "Product 1", price: 10 };
    useCartStore.getState().addItem(item);
    useCartStore.getState().removeItem("1");
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(0);
  });

  it("should keep the cart unchanged when removing a missing item", () => {
    const item = { id: "1", name: "Product 1", price: 10 };
    useCartStore.getState().addItem(item);

    useCartStore.getState().removeItem("2");

    expect(useCartStore.getState().items).toEqual([{ ...item, quantity: 1 }]);
  });

  it("should clear the cart", () => {
    const item1 = { id: "1", name: "Product 1", price: 10 };
    const item2 = { id: "2", name: "Product 2", price: 20 };
    useCartStore.getState().addItem(item1);
    useCartStore.getState().addItem(item2);
    useCartStore.getState().clearCart();
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(0);
  });

  it("should keep the cart empty when clearing an already empty cart", () => {
    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
