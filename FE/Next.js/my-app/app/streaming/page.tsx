import { Suspense } from "react";
import SlowSalesPanel from "./slow-sales-panel";

export const dynamic = "force-dynamic";

function FastActivityPanel() {
  return (
    <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
            Fast source
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Recent activity
          </h2>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          Ready now
        </span>
      </div>
      <ul className="space-y-4 text-sm text-slate-600">
        <li className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span>New team member joined</span>
          <span className="text-slate-400">2 min ago</span>
        </li>
        <li className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span>Documentation updated</span>
          <span className="text-slate-400">18 min ago</span>
        </li>
        <li className="flex items-center justify-between">
          <span>Deployment completed</span>
          <span className="text-slate-400">42 min ago</span>
        </li>
      </ul>
    </section>
  );
}

function SlowSalesSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading sales summary"
      className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
    >
      <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-7 w-44 animate-pulse rounded bg-slate-200" />
      <div className="mt-8 h-24 animate-pulse rounded-xl bg-slate-200" />
      <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-slate-200" />
    </section>
  );
}

export default function StreamingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-950 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-2xl text-white">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">
            Rendering lab / streaming
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            The dashboard arrives in pieces.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            The activity panel is fast. The sales panel waits two seconds behind
            its own Suspense boundary.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <FastActivityPanel />
          <Suspense fallback={<SlowSalesSkeleton />}>
            <SlowSalesPanel />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
