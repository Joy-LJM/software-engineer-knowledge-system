import PostDetail from "./postDetail";

export default async function ProductPage() {
  // Using the next.tags option with fetch for caching external API requests:
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 30, tags: ["products"] },
  });
  const data = await res.json();
  const generatedAt = new Date().toISOString();

  return (
    <div>
      <h1>Products: revalidate</h1>
      <p>Page generated at: {generatedAt}</p>
      <p>Refresh this page within 30 seconds to see the same timestamp.</p>
      {/* pass data from server component to client component */}
      <PostDetail data={data} />
    </div>
  );
}