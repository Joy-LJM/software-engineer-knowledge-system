export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageColor: string;
}
const categories = ["Electronics", "Clothes", "Shoes", "Books", "Sports"];
export function generateProducts(count: number): Product[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000),
    category: categories[Math.floor(Math.random() * categories.length)],
    imageColor: `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,
  }));
}
