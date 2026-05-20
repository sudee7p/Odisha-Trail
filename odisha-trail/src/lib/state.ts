import { useEffect, useState } from "react";

const KEY = "odishatrail.v2";
type Persisted = {
  cart: string[];
  wishlist: string[];
  dark: boolean;
  user: { name: string; email: string } | null;
  hotelId: string | null;
  budget: number;
  travelers: number;
  startDate: string | null;
  endDate: string | null;
  optimize: boolean;
};

const DEFAULT: Persisted = {
  cart: [], wishlist: [], dark: false, user: null,
  hotelId: null, budget: 25000, travelers: 2,
  startDate: null, endDate: null, optimize: true,
};

function load(): Persisted {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

function save(p: Persisted) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {}
}

let state: Persisted = load();
const listeners = new Set<() => void>();

function emit() {
  save(state);
  listeners.forEach((l) => l());
}

export function useAppState() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((x) => x + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);

  return {
    cart: new Set(state.cart),
    wishlist: new Set(state.wishlist),
    dark: state.dark,
    user: state.user,
    toggleCart(id: string) {
      const s = new Set(state.cart);
      if (s.has(id)) s.delete(id); else s.add(id);
      state = { ...state, cart: [...s] };
      emit();
    },
    toggleWishlist(id: string) {
      const s = new Set(state.wishlist);
      if (s.has(id)) s.delete(id); else s.add(id);
      state = { ...state, wishlist: [...s] };
      emit();
    },
    clearCart() {
      state = { ...state, cart: [] };
      emit();
    },
    setDark(v: boolean) {
      state = { ...state, dark: v };
      emit();
    },
    setUser(u: Persisted["user"]) {
      state = { ...state, user: u };
      emit();
    },
    hotelId: state.hotelId,
    setHotel(id: string | null) {
      state = { ...state, hotelId: state.hotelId === id ? null : id };
      emit();
    },
    budget: state.budget,
    setBudget(n: number) { state = { ...state, budget: n }; emit(); },
    travelers: state.travelers,
    setTravelers(n: number) { state = { ...state, travelers: Math.max(1, n) }; emit(); },
    startDate: state.startDate,
    endDate: state.endDate,
    setDates(start: string | null, end: string | null) {
      state = { ...state, startDate: start, endDate: end };
      emit();
    },
    optimize: state.optimize,
    setOptimize(v: boolean) { state = { ...state, optimize: v }; emit(); },
  };
}

// Apply theme class
if (typeof window !== "undefined") {
  const apply = () => {
    document.documentElement.classList.toggle("dark", state.dark);
  };
  apply();
  listeners.add(apply);
}
