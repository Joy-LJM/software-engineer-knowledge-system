import { useState,memo } from "react";
import { generateProducts, type Product } from "./product";
import { useCartStore } from "../store/cartStore";

export const ProductPage = () => {
  const [name, setName] = useState("");

  // a lazy initializer (function form of useState), which only runs once on mount.
  const [products] = useState(() => generateProducts(500));

  return (
    <div style={{position:'relative'}}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CartBadge />
      <div>
        {/* getState():allows you to retrieve the current state of the store without triggering a re-render. it is useful in scenarios where you need to access the state for computation or logic that does not require updating the UI. */}
        <button onClick={useCartStore.getState().clearCart}>Clear Cart</button>
      </div>
      <ProductGrid products={products} />
    </div>
  );
};

const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "1rem",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductCard = memo(({ product }: { product: Product }) => {
  console.log("ProductCard rendered");
  // useStore is used to create reactive state in React components. When you use useStore, any changes to the state will trigger re-renders of the components that depend on that state.
  const addToCart = useCartStore((state) => state.addItem);

  return (
    <div style={{ border: "1px solid black", padding: "1rem" }}>
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: product.imageColor,
        }}
      ></div>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.category}</p>
      <button
        onClick={() => addToCart(product)}
        style={{
          borderRadius: "5px",
          padding: "5px 10px",
          border: 0,
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
});

const CartBadge = () => {
  const count = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0),
  );
  return (
    <div
      style={{
        position: "absolute",
        top: "-10px",
        right: "60px",
        backgroundColor: "red",
        color: "white",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {count}
    </div>
  );
};
