import { useMemo } from "react";
import { Link } from "wouter";
import {
  TrendingUp, MapPin, Calendar, Sparkles, ArrowRight, Star,
  Clock, Wallet, Globe2,
} from "lucide-react";
import { PLACES, EVENTS } from "@/data/places";
import { useAppState } from "@/lib/state";

function StatCard({
  icon: Icon, label, value, sub, gradient,
}: {
  icon: any; label: string; value: string | number; sub?: string; gradient: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
      <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-2xl`} />
      <div className="relative">
        <div className={`mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
          <Icon size={18} />
        </div>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
        {sub && <div className="mt-1 text-[10px] text-emerald-600">{sub}</div>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const s = useAppState();

  const { totalCost, totalHours, regionsCovered } = useMemo(() => {
    const items = PLACES.filter((p) => s.cart.has(p.id));
    return {
      totalCost: items.reduce((a, b) => a + b.entryFee, 0),
      totalHours: items.reduce((a, b) => a + b.duration, 0),
      regionsCovered: new Set(items.map((p) => p.region)).size,
    };
  }, [s.cart]);

  const featured = useMemo(() => PLACES.filter((p) => p.rating >= 4.7).slice(0, 6), []);
  const trending = useMemo(
    () => [...PLACES].sort((a, b) => b.rating - a.rating).slice(0, 4),
    []
  );

  // region distribution
  const regionStats = useMemo(() => {
    const m = new Map<string, number>();
    PLACES.forEach((p) => m.set(p.region, (m.get(p.region) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, []);
  const maxRegion = Math.max(...regionStats.map((r) => r[1]));

  return (
    <div className="space-y-8 p-4 pb-24 lg:p-8 lg:pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 shadow-sm dark:from-orange-950/40 dark:via-amber-950/30 dark:to-rose-950/30 lg:p-10">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1609947017136-71d36ec90c43?auto=format&fit=crop&w=1600&q=60"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
        </div>
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            <Sparkles size={12} /> Welcome back{s.user ? `, ${s.user.name.split(" ")[0]}` : ""}
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-balance lg:text-5xl">
            Discover the soul of <span className="bg-gradient-to-r from-primary via-amber-500 to-rose-500 bg-clip-text text-transparent">Odisha</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground lg:text-base">
            42 curated destinations, six iconic festivals, live maps, and a smart planner — all in one beautifully crafted travel companion.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/explore" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:shadow-xl">
              Explore destinations <ArrowRight size={15} />
            </Link>
            <Link href="/map" className="inline-flex items-center gap-2 rounded-xl border bg-card px-5 py-2.5 text-sm font-semibold transition hover:bg-muted">
              Open the map
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        <StatCard icon={MapPin} label="Destinations" value={PLACES.length} gradient="from-orange-500 to-amber-500" sub="across 9 regions" />
        <StatCard icon={Calendar} label="Festivals" value={EVENTS.length} gradient="from-rose-500 to-pink-600" sub="year-round" />
        <StatCard icon={Star} label="In your itinerary" value={s.cart.size} gradient="from-emerald-500 to-teal-600" sub={regionsCovered ? `${regionsCovered} regions` : "Add places"} />
        <StatCard icon={Wallet} label="Estimated cost" value={`₹${totalCost.toLocaleString("en-IN")}`} gradient="from-violet-500 to-purple-600" sub={totalHours ? `${totalHours}h total` : "—"} />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Featured carousel */}
        <section className="lg:col-span-2">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-xl font-semibold lg:text-2xl">Editor's picks</h2>
              <p className="text-xs text-muted-foreground">Top-rated places you can't miss</p>
            </div>
            <Link href="/explore" className="text-xs font-semibold text-primary hover:underline">View all →</Link>
          </div>
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scroll-hide lg:mx-0 lg:px-0">
            {featured.map((p) => (
              <Link key={p.id} href={`/explore?focus=${p.id}`} className="group relative w-72 shrink-0 overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-40 overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-bold text-amber-600">
                    <Star size={11} fill="currentColor" /> {p.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[10px] uppercase tracking-widest opacity-80">{p.type}</div>
                    <div className="font-serif text-lg leading-tight">{p.name}</div>
                    <div className="text-[10px] opacity-80">{p.district}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Region distribution */}
        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Globe2 size={16} className="text-primary" />
            <h2 className="font-serif text-lg font-semibold">By region</h2>
          </div>
          <div className="space-y-3">
            {regionStats.map(([r, n]) => (
              <div key={r}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium">{r}</span>
                  <span className="text-muted-foreground">{n}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-amber-500 transition-all"
                    style={{ width: `${(n / maxRegion) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Trending + Festivals */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            <h2 className="font-serif text-lg font-semibold">Trending now</h2>
          </div>
          <div className="space-y-3">
            {trending.map((p, i) => (
              <Link key={p.id} href={`/explore?focus=${p.id}`} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-muted">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
                  #{i + 1}
                </div>
                <img src={p.image} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.name}</div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{p.district}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 text-amber-500">
                      <Star size={10} fill="currentColor" /> {p.rating}
                    </span>
                  </div>
                </div>
                <Clock size={13} className="shrink-0 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">{p.duration}h</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              <h2 className="font-serif text-lg font-semibold">Upcoming festivals</h2>
            </div>
            <Link href="/festivals" className="text-xs font-semibold text-primary hover:underline">All →</Link>
          </div>
          <div className="space-y-3">
            {EVENTS.slice(0, 4).map((e) => (
              <div key={e.id} className="flex items-center gap-3 overflow-hidden rounded-xl border">
                <img src={e.image} alt="" className="h-16 w-20 shrink-0 object-cover" />
                <div className="min-w-0 flex-1 pr-3">
                  <div className="truncate text-sm font-semibold">{e.name}</div>
                  <div className="text-[11px] text-muted-foreground">{e.date} · {e.duration}d</div>
                </div>
                <span className="mr-3 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {e.entry === 0 ? "Free" : `₹${e.entry}`}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
