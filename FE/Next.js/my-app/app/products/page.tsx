import PostDetail from "./postDetail";

export default async function ProductPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return (
    <div>
      <h1>Product page</h1>
      {/* pass data from server component to client component */}
      <PostDetail data={data}/>
    </div>
  );
}