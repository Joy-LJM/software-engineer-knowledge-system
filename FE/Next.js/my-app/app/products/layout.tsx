// Layout for /products/* routes
export default function ProductLayout({ children }: LayoutProps<"/products">) {
  return (
    <div
      lang="en"
      style={{colorScheme: "light", backgroundColor: "white",color: "black", height: "100vh"}}
    >
      <div className="min-h-full flex flex-col">{children}</div>
    </div>
  );
}