import { useState } from "react";
import { generateProducts, type Product } from "./Product";

export const ProductPage = () => {
  const [name, setName] = useState("");

  const [products] = useState(() => generateProducts(500));

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <ProductGrid products={products} />
    </>
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
const ProductCard = ({ product }: { product: Product }) => {
  console.log("ProductCard rendered");
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
    </div>
  );
};
