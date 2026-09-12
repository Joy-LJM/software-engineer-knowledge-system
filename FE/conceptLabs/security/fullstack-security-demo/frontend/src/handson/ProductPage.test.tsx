import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductPage } from "./ProductPage";
import { useCartStore } from "../store/cartStore";

vi.mock("./product", () => ({
  generateProducts: () => [
    { id: "1", name: "Laptop", price: 999, category: "Tech", imageColor: "red" },
    { id: "2", name: "Mouse", price: 49, category: "Tech", imageColor: "blue" },
  ],
}));

describe("product page", () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [] });
  });

  it("should increment the cart badge when Add to Cart button is clicked", async () => {
    render(<ProductPage />);

    await userEvent.click(screen.getAllByRole("button", { name: /add to cart/i })[0]);

    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
