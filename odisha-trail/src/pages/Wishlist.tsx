import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Heart } from "lucide-react";
import { PLACES } from "@/data/places";
import type { Place } from "@/data/places";
import { PlaceCard } from "@/components/PlaceCard";
import { DetailModal } from "@/components/DetailModal";
import { useAppState } from "@/lib/state";

export default function Wishlist() {
  const s = useAppState();
  const items = useMemo(() => PLACES.filter((p) => s.wishlist.has(p.id)), [s.wishlist]);
  const [active, setActive] = useState<Place | null>(null);

  if (items.length === 0) {
    return (
      <div className="grid min-h-[60vh] place-items-center p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-rose-100 text-rose-500 dark:bg-rose-950">
            <Heart size={26} />
          </div>
          <h2 className="font-serif text-2xl font-semibold">Save your favourites</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap the heart on any destination to keep it here for later.
          </p>
          <Link href="/explore" className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-primary to-amber-500 px-6 py-3 text-sm font-semibold text-white">
            Browse destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 pb-24 lg:p-8 lg:pb-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold lg:text-3xl">Wishlist</h1>
        <p className="text-xs text-muted-foreground">{items.length} saved places</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <PlaceCard
            key={p.id}
            place={p}
            inCart={s.cart.has(p.id)}
            inWish
            onToggleCart={() => s.toggleCart(p.id)}
            onToggleWish={() => s.toggleWishlist(p.id)}
            onOpen={() => setActive(p)}
          />
        ))}
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
