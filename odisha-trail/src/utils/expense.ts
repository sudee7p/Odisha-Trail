import type { Place } from "@/data/places";
import type { Hotel } from "@/data/hotels";
import { totalRouteDistance } from "./distance";

export const FOOD_PER_DAY = 600;          // ₹/person
export const FUEL_COST_PER_KM = 12;       // ₹/km — taxi/cab average

export type ExpenseInput = {
  places: Place[];
  hotel: Hotel | null;
  nights: number;
  travelers: number;
  budget: number;
};

export type ExpenseBreakdown = {
  travel: number;
  hotel: number;
  food: number;
  entry: number;
  total: number;
  remaining: number;
  exceeded: boolean;
  distanceKm: number;
};

export function calcExpense({ places, hotel, nights, travelers, budget }: ExpenseInput): ExpenseBreakdown {
  const distanceKm = totalRouteDistance(places);
  const travel = Math.round(distanceKm * FUEL_COST_PER_KM);
  const hotelCost = hotel ? hotel.pricePerNight * Math.max(1, nights) : 0;
  const food = FOOD_PER_DAY * Math.max(1, nights) * Math.max(1, travelers);
  const entry = places.reduce((s, p) => s + p.entryFee, 0) * Math.max(1, travelers);
  const total = travel + hotelCost + food + entry;
  return {
    travel,
    hotel: hotelCost,
    food,
    entry,
    total,
    remaining: budget - total,
    exceeded: total > budget && budget > 0,
    distanceKm,
  };
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/** Try to extract month numbers (0-11) covered by the event's `date` string like "Dec 1-5", "Nov 2025", "Jan 14". */
function eventMonths(date: string): number[] {
  const found: number[] = [];
  MONTHS.forEach((m, i) => {
    if (date.toLowerCase().includes(m.toLowerCase())) found.push(i);
  });
  return found;
}

/** Returns true if the event likely overlaps the [start, end] trip window (month-level matching). */
export function eventMatchesTrip(eventDate: string, start: Date, end: Date): boolean {
  const months = eventMonths(eventDate);
  if (!months.length) return false;
  const s = start.getMonth();
  const e = end.getMonth();
  const range: number[] = [];
  if (s <= e) for (let i = s; i <= e; i++) range.push(i);
  else { for (let i = s; i < 12; i++) range.push(i); for (let i = 0; i <= e; i++) range.push(i); }
  return months.some((m) => range.includes(m));
}
