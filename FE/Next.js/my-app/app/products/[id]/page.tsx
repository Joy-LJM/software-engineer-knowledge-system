export default async function ProductDetailPage({params}:{params:Promise<{id:string}>}){
  // Next.js 16, dynamic route props are async
  const {id} = await params;
  return <div>product detail page of {await id}</div>
}