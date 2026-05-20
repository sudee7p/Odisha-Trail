import { X, Heart, Star, Clock, Ticket, MapPin, Calendar, Plus, Check } from "lucide-react";
import { useEffect } from "react";
import type { Place } from "@/data/places";
import { TYPE_GRADIENT } from "@/data/places";

type Props = {
  place: Place | null;
  inCart: boolean;
  inWish: boolean;
  onClose: () => void;
  onToggleCart: () => void;
  onToggleWish: () => void;
};

export function DetailModal({ place, inCart, inWish, onClose, onToggleCart, onToggleWish }: Props) {
  useEffect(() => {
    if (!place) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [place, onClose]);

  if (!place) return null;
  const grad = TYPE_GRADIENT[place.type] || "from-orange-500 to-amber-600";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-up"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-2xl overflow-hidden overflow-y-auto rounded-3xl bg-card shadow-2xl"
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=70";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground transition hover:scale-110"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span
              className={`inline-flex items-center rounded-full bg-gradient-to-r ${grad} px-3 py-1 text-[10px] font-semibold uppercase tracking-wide shadow`}
            >
              {place.type}
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight">{place.name}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs opacity-90">
              <span className="inline-flex items-center gap-1"><MapPin size={13} /> {place.district} · {place.region}</span>
              <span className="inline-flex items-center gap-1 text-amber-300">
                <Star size={13} fill="currentColor" /> {place.rating}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-muted p-3">
              <Clock size={16} className="mx-auto text-primary" />
              <div className="mt-1 text-sm font-semibold">{place.duration}h</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Duration</div>
            </div>
            <div className="rounded-xl bg-muted p-3">
              <Ticket size={16} className="mx-auto text-primary" />
              <div className="mt-1 text-sm font-semibold">{place.entryFee === 0 ? "Free" : `₹${place.entryFee}`}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Entry</div>
            </div>
            <div className="rounded-xl bg-muted p-3">
              <Calendar size={16} className="mx-auto text-primary" />
              <div className="mt-1 text-sm font-semibold">{place.bestTime}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Best time</div>
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">{place.desc}</p>

          <div className="mt-5 rounded-2xl border bg-muted/50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-primary">Famous for</div>
            <div className="mt-1 text-sm">{place.famous}</div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onToggleCart}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                inCart
                  ? "bg-gradient-to-r from-primary to-amber-500 text-white shadow-lg shadow-primary/30"
                  : "border-2 border-primary text-primary hover:bg-primary/10"
              }`}
            >
              {inCart ? <><Check size={16} /> In Itinerary</> : <><Plus size={16} /> Add to Itinerary</>}
            </button>
            <button
              onClick={onToggleWish}
              className="grid h-12 w-12 place-items-center rounded-xl border text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-950"
            >
              <Heart size={18} fill={inWish ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
