import { useEffect, useRef } from "react";
import type { Place } from "@/data/places";

declare global { interface Window { L: any } }

type Props = {
  places: Place[];
  cart: Set<string>;
  selectedId?: string | null;
  onSelect?: (p: Place) => void;
  height?: number | string;
};

const TYPE_COLOR: Record<string, string> = {
  Temple: "#E8570C", Beach: "#0EA5E9", Wildlife: "#16A34A", Waterfall: "#06B6D4",
  Monument: "#A855F7", Cave: "#78716C", Caves: "#78716C", Lake: "#14B8A6",
  Hill: "#64748B", Cultural: "#EC4899", Nature: "#65A30D", Dam: "#3B82F6",
  Sanctuary: "#10B981", Birding: "#6366F1", "Hot spring": "#EF4444",
};

export function LeafletMap({ places, cart, selectedId, onSelect, height = 520 }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const mksRef = useRef<Record<string, any>>({});

  useEffect(() => {
    const init = () => {
      const L = window.L;
      if (!L || !divRef.current || mapRef.current) return;
      const map = L.map(divRef.current, { zoomControl: true, scrollWheelZoom: true })
        .setView([20.5, 84.8], 7);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap · CARTO", maxZoom: 18,
      }).addTo(map);
      mapRef.current = map;

      const route = places.filter((p) => p.rating >= 4.7).slice(0, 8).map((p) => [p.lat, p.lng]);
      if (route.length > 1) {
        L.polyline(route, { color: "#E8570C", weight: 2.5, opacity: 0.5, dashArray: "10,12" }).addTo(map);
      }

      places.forEach((p) => {
        const inPlan = cart.has(p.id);
        const top = p.rating >= 4.7;
        const tc = TYPE_COLOR[p.type] || "#E8570C";
        const sz = top ? 36 : 28;
        const bg = inPlan ? "#F59E0B" : tc;
        const brd = inPlan ? "#E8570C" : top ? "#FBBF24" : "white";
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:${bg};color:white;width:${sz}px;height:${sz}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2.5px solid ${brd};box-shadow:0 4px 14px rgba(0,0,0,.35);cursor:pointer;">${p.rating}</div>`,
          iconSize: [sz, sz], iconAnchor: [sz / 2, sz / 2],
        });
        const mk = L.marker([p.lat, p.lng], { icon, riseOnHover: true }).addTo(map);
        mk.bindPopup(`
          <div style="font-family:system-ui;padding:6px 4px;min-width:220px">
            <strong style="font-size:14px">${p.name}</strong>
            <div style="font-size:11px;color:#888;margin:3px 0">${p.district} · ${p.region}</div>
            <div style="font-size:11px;margin:6px 0">★ ${p.rating} · ${p.duration}h · ${p.entryFee === 0 ? "Free" : "₹" + p.entryFee}</div>
            <div style="font-size:11px;line-height:1.5;color:#444">${p.desc.slice(0, 110)}…</div>
          </div>
        `, { maxWidth: 260 });
        mk.on("click", () => onSelect?.(p));
        mksRef.current[p.id] = mk;
      });
    };

    if (window.L) { init(); }
    else {
      if (!document.getElementById("lf-css")) {
        const lk = document.createElement("link");
        lk.id = "lf-css"; lk.rel = "stylesheet";
        lk.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(lk);
      }
      if (!document.getElementById("lf-js")) {
        const sc = document.createElement("script");
        sc.id = "lf-js"; sc.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        sc.onload = init;
        document.head.appendChild(sc);
      } else {
        const poll = setInterval(() => { if (window.L) { clearInterval(poll); init(); } }, 100);
      }
    }

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; mksRef.current = {}; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedId || !mapRef.current || !mksRef.current[selectedId]) return;
    const p = places.find((x) => x.id === selectedId);
    if (!p) return;
    mapRef.current.flyTo([p.lat, p.lng], 11, { duration: 1.1 });
    setTimeout(() => mksRef.current[selectedId]?.openPopup(), 1000);
  }, [selectedId, places]);

  return <div ref={divRef} style={{ height, width: "100%" }} className="rounded-2xl overflow-hidden border" />;
}
