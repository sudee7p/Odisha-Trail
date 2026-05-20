import { Calendar, Clock, Ticket } from "lucide-react";
import { EVENTS } from "@/data/places";

export default function Festivals() {
  return (
    <div className="space-y-6 p-4 pb-24 lg:p-8 lg:pb-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold lg:text-3xl">Festivals & Events</h1>
        <p className="text-xs text-muted-foreground">Time your trip with Odisha's most beautiful celebrations</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((e) => (
          <article key={e.id} className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="relative h-44 overflow-hidden">
              <img src={e.image} alt={e.name} loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-primary">
                <Calendar size={11} /> {e.date}
              </span>
              <h3 className="absolute bottom-3 left-3 right-3 font-serif text-xl font-semibold text-white">{e.name}</h3>
            </div>
            <div className="p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock size={12} /> {e.duration} day{e.duration > 1 ? "s" : ""}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                  <Ticket size={11} /> {e.entry === 0 ? "Free entry" : `₹${e.entry}`}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
