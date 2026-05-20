import { Star, MapPin, Wifi, Check } from "lucide-react";
import type { Hotel } from "@/data/hotels";

type Props = {
  hotel: Hotel;
  selected: boolean;
  onSelect: () => void;
  nights?: number;
};

export function HotelCard({ hotel, selected, onSelect, nights = 1 }: Props) {
  const total = hotel.pricePerNight * Math.max(1, nights);
  return (
    <article className={`group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${selected ? "ring-2 ring-primary" : ""}`}>
      <div className="relative h-40 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=70";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-bold text-amber-600">
          <Star size={11} fill="currentColor" /> {hotel.rating}
        </span>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-serif text-base font-semibold leading-tight">{hotel.name}</h3>
          <div className="mt-0.5 flex items-center gap-1 text-[11px] opacity-90">
            <MapPin size={10} /> {hotel.city}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap gap-1">
          {hotel.amenities.slice(0, 3).map((a) => (
            <span key={a} className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              <Wifi size={9} /> {a}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <div className="font-serif text-xl font-semibold">₹{hotel.pricePerNight.toLocaleString("en-IN")}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">per night</div>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <div>{nights} night{nights > 1 ? "s" : ""}</div>
            <div className="font-bold text-foreground">₹{total.toLocaleString("en-IN")}</div>
          </div>
        </div>
        <button
          onClick={onSelect}
          className={`mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition ${
            selected
              ? "bg-gradient-to-r from-primary to-amber-500 text-white shadow-md shadow-primary/30"
              : "border border-primary/40 text-primary hover:bg-primary/10"
          }`}
        >
          {selected ? <><Check size={14} /> Booked for trip</> : "Book for trip"}
        </button>
      </div>
    </article>
  );
}
