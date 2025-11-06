import { useMemo } from 'react';
import { ArrowUpRight, ExternalLink, Leaf, ShieldCheck, Star, TrendingUp } from 'lucide-react';

// Mock recommendation logic for UI demo; replace with backend integration later
function generateMock(gadget, usage, budget) {
  const items = [
    {
      name: `${gadget} Alpha Pro`,
      price: Math.max(199, Math.min(budget, 1499)),
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
      specs: ['Intel/AMD latest-gen', '16GB RAM', '512GB SSD', '120Hz display'],
      launched: '2024-09',
      pros: ['Great performance', 'Solid battery', 'Bright display'],
      cons: ['No SD slot'],
      invest: 8.7,
      sustain: 7.9,
      priceTrend: 'falling',
    },
    {
      name: `${gadget} Neo Max`,
      price: Math.max(149, Math.min(budget * 0.8, 999)),
      img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
      specs: ['OLED', '8GB RAM', '256GB storage', 'Dolby Atmos'],
      launched: '2024-06',
      pros: ['Vibrant screen', 'Lightweight'],
      cons: ['Average speakers'],
      invest: 8.2,
      sustain: 8.4,
      priceTrend: 'stable',
    },
    {
      name: `${gadget} Core Lite`,
      price: Math.max(99, Math.min(budget * 0.6, 699)),
      img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop',
      specs: ['IPS display', '8GB RAM', 'Fast charge'],
      launched: '2023-12',
      pros: ['Value for money', 'Good cameras'],
      cons: ['Plastic build'],
      invest: 7.6,
      sustain: 8.1,
      priceTrend: 'rising',
    },
  ];
  return items.map((it, idx) => ({ ...it, rank: idx + 1, suitability: Math.min(99, Math.floor(70 + Math.random() * 25)) }));
}

export default function Recommendations({ query }) {
  const data = useMemo(() => {
    if (!query) return [];
    return generateMock(query.gadget, query.usage, query.budget);
  }, [query]);

  if (!query) return null;

  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Top picks for you</h2>
        <div className="text-sm text-slate-300">Sorted by suitability • Filters coming soon</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {data.map((item) => (
          <article key={item.name} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <img src={item.img} alt={item.name} className="h-48 w-full object-cover md:col-span-2 md:h-full" />
              <div className="p-5 md:col-span-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">{item.rank}. {item.name}</h3>
                  <span className="rounded-lg bg-cyan-500/10 px-2 py-1 text-sm text-cyan-300">{item.suitability}% match</span>
                </div>
                <div className="mt-1 text-slate-300">Launched {item.launched}</div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  {item.specs.map((s) => (
                    <span key={s} className="rounded-lg bg-white/10 px-2 py-1 text-white/90">{s}</span>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <ul className="list-inside list-disc text-emerald-300">
                    {item.pros.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  <ul className="list-inside list-disc text-rose-300">
                    {item.cons.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1 text-emerald-300"><ShieldCheck className="h-4 w-4"/> Invest {item.invest}</span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-lime-500/10 px-2 py-1 text-lime-300"><Leaf className="h-4 w-4"/> Sustain {item.sustain}</span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 px-2 py-1 text-amber-300"><TrendingUp className="h-4 w-4"/> {item.priceTrend}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-white">${item.price}</span>
                    <a href="#" className="inline-flex items-center gap-1 rounded-xl bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-cyan-400">
                      View deals <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 text-sm text-slate-300">
                  <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 text-yellow-300"/> AI-summarized reviews</span>
                  <a href="#" className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200">Watch video review <ArrowUpRight className="h-4 w-4"/></a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
