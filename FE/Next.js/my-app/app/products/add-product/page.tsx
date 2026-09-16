import { addProduct } from './actions';

export default function AddProductPage() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Add a product</h1>
      <form action={addProduct} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          Product name
          <input
            name="name"
            type="text"
            placeholder="Product name"
            minLength={2}
            maxLength={80}
            required
            className="rounded border border-zinc-300 p-2"
          />
        </label>
        <label className="flex flex-col gap-2">
          Comments
          <textarea
            name="comments"
            placeholder="What should we know about this product?"
            minLength={1}
            maxLength={500}
            required
            className="min-h-32 rounded border border-zinc-300 p-2"
          />
        </label>
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Add product
        </button>
      </form>
    </main>
  );
}