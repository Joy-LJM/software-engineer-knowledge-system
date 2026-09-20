import type { Metadata } from "next";
import Image from "next/image";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Product ${id}`,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  return <div>product detail page of {id}
  {/* <img src="https://wimg.mk.co.kr/news/cms/202603/11/news-p.v1.20260311.9acbf71fa9c5490daded6f07793a3c88_P1.jpg" alt="image" width={500} height={500}/> */}
  {/* remote image need to set width and height */}
  <Image src="https://wimg.mk.co.kr/news/cms/202603/11/news-p.v1.20260311.9acbf71fa9c5490daded6f07793a3c88_P1.jpg" alt="image" width={500} height={500}/>
  </div>;
}