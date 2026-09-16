import PostDetail from "../postDetail";

export default async function NoStoreProductPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  const data = await res.json();
  const generatedAt = new Date().toISOString();

  return (
    <div>
      <h1>Products: no-store</h1>
      <p>Page generated at: {generatedAt}</p>
      <p>Refresh this page to generate a new timestamp on every request.</p>
      <PostDetail data={data} />
    </div>
  );
}