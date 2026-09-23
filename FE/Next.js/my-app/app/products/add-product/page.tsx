"use client";

import { useActionState } from "react";
import dynamic from 'next/dynamic'
import { addProduct } from "./actions";

// lazy loading
const ProductForm = dynamic(() => import('./ProductForm'), { ssr: false });

export default function AddProductPage() {
  // client-side React re-render when the server action is called and returns a new state
  const [state, formAction] = useActionState(addProduct, null);

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Add a product</h1>
      <ProductForm formAction={formAction} />
      {state?.success && (
        <p className="mt-4 rounded bg-green-100 p-2 text-green-800">
          Product added successfully!
        </p>
      )}
    </main>
  );
}
