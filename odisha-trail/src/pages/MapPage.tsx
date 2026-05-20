import { useMemo, useState } from "react";
import { LeafletMap } from "@/components/LeafletMap";
import { PLACES, REGIONS, TYPES } from "@/data/places";
import type { Place } from "@/data/places";
import { DetailModal } from "@/components/DetailModal";
import { useAppState } from "@/lib/state";
import { Star, MapPin } from "lucide-react";

export default function MapPage() {
  const s = useAppState();
  const [region, setRegion] = useState("All Regions");
  const [type, setType] = useState("All Types");
  const [active, setActive] = useState<Place | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => PLACES.filter((p) =>
      (region === "All Regions" || p.region === region) &&
      (type === "All Types" || p.type === type || (type === "Caves" && p.type === "Cave"))
    ),
    [region, type]
  );

  return (
    <div className="space-y-4 p-4 pb-24 lg:p-8 lg:pb-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-semibold lg:text-3xl">Live Map</h1>
          <p className="text-xs text-muted-foreground">{filtered.length} destinations · suggested route shown in dashed gold</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-lg border bg-card px-3 py-2 text-sm outline-none">
            {REGIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border bg-card px-3 py-2 text-sm outline-none">
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <LeafletMap
          places={filtered}
          cart={s.cart}
          selectedId={selectedId}
          onSelect={(p) => { setSelectedId(p.id); setActive(p); }}
          height={620}
        />
        <aside className="hidden max-h-[620px] overflow-y-auto rounded-2xl border bg-card p-3 lg:block">
          <div className="mb-2 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Top picks</div>
          <div className="space-y-2">
            {filtered.filter((p) => p.rating >= 4.6).slice(0, 12).map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedId(p.id); }}
                className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition ${
                  selectedId === p.id ? "bg-primary/10" : "hover:bg-muted"
                }`}
              >
                <img src={p.image} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.name}</div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin size={9} /> {p.district}</span>
                    <span className="inline-flex items-center gap-1 text-amber-500">
                      <Star size={9} fill="currentColor" /> {p.rating}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <DetailModal
        place={active}
        inCart={active ? s.cart.has(active.id) : false}
        inWish={active ? s.wishlist.has(active.id) : false}
        onClose={() => setActive(null)}
        onToggleCart={() => active && s.toggleCart(active.id)}
        onToggleWish={() => active && s.toggleWishlist(active.id)}
      />
    </div>
  );
}
