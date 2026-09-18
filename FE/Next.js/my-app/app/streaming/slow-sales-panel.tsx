async function getSlowSales() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    revenue: "$48,290",
    change: "+12.8%",
    note: "Compared with the previous 30 days",
  };
}

export default async function SlowSalesPanel() {
  const sales = await getSlowSales();

  return (
    <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-700">
            Slow source
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Sales summary
          </h2>
        </div>
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800">
          Streamed later
        </span>
      </div>
      <p className="text-5xl font-semibold tracking-tight text-slate-950">
        {sales.revenue}
      </p>
      <p className="mt-3 text-sm text-slate-600">
        <span className="font-semibold text-emerald-700">{sales.change}</span>{" "}
        {sales.note}
      </p>
    </section>
  );
}
