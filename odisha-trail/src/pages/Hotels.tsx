import { useMemo, useState } from "react";
import { Hotel as HotelIcon } from "lucide-react";
import { HOTELS } from "@/data/hotels";
import { HotelCard } from "@/components/HotelCard";
import { useAppState } from "@/lib/state";

const CITIES = ["All cities", ...Array.from(new Set(HOTELS.map((h) => h.city)))];

export default function Hotels() {
  const s = useAppState();
  const [city, setCity] = useState("All cities");
  const [maxPrice, setMaxPrice] = useState(8000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<"rating" | "price">("rating");

  const nights = useMemo(() => {
    if (!s.startDate || !s.endDate) return 1;
    const ms = new Date(s.endDate).getTime() - new Date(s.startDate).getTime();
    return Math.max(1, Math.round(ms / 86400000));
  }, [s.startDate, s.endDate]);

  const list = useMemo(() => {
    let arr = HOTELS.filter(
      (h) =>
        (city === "All cities" || h.city === city) &&
        h.pricePerNight <= maxPrice &&
        h.rating >= minRating
    );
    arr.sort((a, b) =>
      sort === "rating" ? b.rating - a.rating : a.pricePerNight - b.pricePerNight
    );
    return arr;
  }, [city, maxPrice, minRating, sort]);

  return (
    <div className="space-y-6 p-4 pb-24 lg:p-8 lg:pb-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-semibold lg:text-3xl">Hotels & Stays</h1>
          <p className="text-xs text-muted-foreground">
            {list.length} of {HOTELS.length} stays · select one to add to your trip ({nights} night{nights > 1 ? "s" : ""})
          </p>
        </div>
        {s.hotelId && (
          <button
            onClick={() => s.setHotel(null)}
            className="rounded-xl border border-destructive/30 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"
          >
            Clear booking
          </button>
        )}
      </div>

      <div className="grid gap-3 rounded-2xl border bg-card p-4 shadow-sm lg:grid-cols-4">
        <Field label="City">
          <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none">
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label={`Max price: ₹${maxPrice.toLocaleString("en-IN")}/night`}>
          <input type="range" min={1000} max={10000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-[hsl(var(--primary))]" />
        </Field>
        <Field label={`Min rating: ${minRating || "any"}`}>
          <input type="range" min={0} max={5} step={0.5} value={minRating} onChange={(e) => setMinRating(+e.target.value)} className="w-full accent-[hsl(var(--primary))]" />
        </Field>
        <Field label="Sort by">
          <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none">
            <option value="rating">Top rated</option>
            <option value="price">Cheapest first</option>
          </select>
        </Field>
      </div>

      {list.length === 0 ? (
        <div className="grid place-items-center rounded-2xl border bg-card p-12 text-center">
          <HotelIcon className="mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No hotels match these filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((h) => (
            <HotelCard
              key={h.id}
              hotel={h}
              nights={nights}
              selected={s.hotelId === h.id}
              onSelect={() => s.setHotel(h.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}
