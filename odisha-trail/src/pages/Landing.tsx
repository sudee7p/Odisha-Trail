import { useState, type FormEvent } from "react";
import { Flower2, Compass, Sparkles, MapPin, Waves, Mountain, Calendar, ArrowRight, Mail, User as UserIcon, Star, Sun } from "lucide-react";
import { useAppState } from "@/lib/state";

const HERO = "https://upload.wikimedia.org/wikipedia/commons/4/47/Konarka_Temple.jpg";
const STRIP = [
  { url: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Shri_Jagannath_temple.jpg", label: "Puri Jagannath" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/9/94/Birds_eyeview_of_Chilika_Lake.jpg", label: "Chilika Lake" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/b/be/Simlipal_tiger_reserve.jpg", label: "Simlipal" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Barehipani_Falls.jpg", label: "Barehipani Falls" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Shanti_Stupa%2C_Dhauli_01.jpg/900px-Shanti_Stupa%2C_Dhauli_01.jpg", label: "Dhauli Stupa" },
];

const STATS = [
  { k: "42", v: "curated destinations" },
  { k: "13", v: "classical dance forms" },
  { k: "480 km", v: "of golden coastline" },
  { k: "62", v: "tribal communities" },
];

const REASONS = [
  {
    icon: Mountain,
    title: "An ancient soul",
    body: "From the Sun Temple at Konark to the Lingaraj spires of Bhubaneswar — a thousand-year-old story carved in stone, untouched by mass tourism.",
  },
  {
    icon: Waves,
    title: "Where the land meets the sea",
    body: "480 km of unspoilt coast, the brackish wonder of Chilika Lake, and Olive Ridley turtles arriving by the million at Gahirmatha.",
  },
  {
    icon: Compass,
    title: "Forests few have walked",
    body: "Simlipal’s tiger reserve, the twin-leap of Barehipani Falls, and tribal hamlets in the Eastern Ghats that still keep their own calendars.",
  },
  {
    icon: Sparkles,
    title: "Festivals that stop time",
    body: "Rath Yatra, Konark Dance Festival, Bali Yatra, Raja — the year in Odisha is one continuous, joyful procession.",
  },
];

export default function Landing() {
  const { setUser } = useAppState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim() || "Traveller";
    const m = email.trim() || "guest@odishatrail.in";
    setUser({ name: n, email: m });
  };

  const continueAsGuest = () => setUser({ name: "Guest", email: "guest@odishatrail.in" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative min-h-[100vh] overflow-hidden">
        <img
          src={HERO}
          alt="Konark Sun Temple"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Top bar */}
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-white lg:px-10">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-amber-500 shadow-lg shadow-amber-500/30">
              <Flower2 size={18} />
            </div>
            <div>
              <div className="font-serif text-xl font-bold leading-none">OdishaTrail</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200/90">Soul of Odisha</div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">
            <a href="#story" className="hover:text-white">The Story</a>
            <a href="#why" className="hover:text-white">Why Odisha</a>
            <a href="#preview" className="hover:text-white">What's Inside</a>
            <a href="#login" className="rounded-full bg-white/15 px-4 py-1.5 backdrop-blur hover:bg-white/25">Sign in</a>
          </nav>
        </header>

        {/* Hero content */}
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.15fr_1fr] lg:px-10 lg:pt-16">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-amber-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-100 backdrop-blur">
              <Sun size={12} /> India's best-kept secret
            </span>
            <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Discover the <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-rose-300 bg-clip-text text-transparent">hidden soul</span> of India.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Temples older than empires. Beaches longer than horizons. Tribes whose songs have outlived dynasties.
              Welcome to <span className="font-semibold text-white">Odisha</span> — where every village has a story
              and every stone has a name.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#login"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:scale-[1.02]"
              >
                Begin your journey <ArrowRight size={15} />
              </a>
              <a
                href="#why"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Why it's a secret
              </a>
            </div>

            {/* Stat strip */}
            <div className="mt-10 grid max-w-lg grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-x-6">
              {STATS.map((s) => (
                <div key={s.v}>
                  <div className="font-serif text-2xl font-bold text-amber-100 sm:text-3xl">{s.k}</div>
                  <div className="text-[11px] uppercase tracking-wider text-white/70">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* LOGIN CARD */}
          <div id="login" className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-amber-300/30 via-rose-300/20 to-primary/30 blur-2xl" />
            <form
              onSubmit={submit}
              className="relative rounded-3xl border border-white/20 bg-white/95 p-7 shadow-2xl backdrop-blur-xl dark:bg-zinc-900/90 sm:p-8"
            >
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                <Sparkles size={13} /> Trip Pass
              </div>
              <h2 className="font-serif text-2xl font-bold leading-tight">Sign in to plan your trail</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Save destinations, build itineraries, and unlock festivals tailored to your travel dates.
              </p>

              <div className="mt-6 space-y-3.5">
                <label className="block">
                  <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your name</div>
                  <div className="flex items-center gap-2 rounded-xl border bg-background px-3.5 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                    <UserIcon size={15} className="text-muted-foreground" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Mishra"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </label>
                <label className="block">
                  <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</div>
                  <div className="flex items-center gap-2 rounded-xl border bg-background px-3.5 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                    <Mail size={15} className="text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </label>
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition hover:brightness-110"
              >
                Enter OdishaTrail <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={continueAsGuest}
                className="mt-2.5 w-full rounded-xl border bg-background px-5 py-2.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                Continue as guest
              </button>

              <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                Free forever · No credit card · Frontend demo
              </div>
            </form>
          </div>
        </div>

        {/* Bottom image strip */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 lg:px-10">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
            {STRIP.map((p) => (
              <div key={p.label} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/20 shadow-xl">
                <img src={p.url} alt={p.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-1.5 left-2 text-[11px] font-semibold text-white">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section id="story" className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-background py-24 dark:from-zinc-950 dark:via-zinc-950 dark:to-background">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            The Story
          </span>
          <h2 className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Why they call it the <em className="not-italic text-primary">Hidden Secret</em> of India.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            While the rest of the country races through Goa and Jaipur, Odisha quietly keeps the originals —
            the temples that taught India how to carve, the dances that taught it how to move, and the
            beaches still empty enough to hear the wind. It is a state that doesn't market itself,
            because it doesn't need to. <span className="font-semibold text-foreground">It just waits for you to find it.</span>
          </p>
        </div>
      </section>

      {/* WHY ODISHA */}
      <section id="why" className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              Why Odisha
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Four worlds. <span className="text-primary">One state.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Odisha is the rare place where a UNESCO temple, a tiger reserve, a Buddhist stupa, and a tribal
              market can all sit within a day's drive of each other.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
                >
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-amber-200/30 to-primary/20 blur-2xl transition group-hover:scale-150" />
                  <div className="relative">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-amber-500 text-white shadow-lg shadow-amber-500/20">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-bold">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PREVIEW / WHAT'S INSIDE */}
      <section id="preview" className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-orange-950 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.15),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(251,113,133,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200">
              What's Inside
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Your trail, intelligently planned.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              OdishaTrail isn't a brochure. It's a planner that stitches your favourite spots into the
              shortest route, picks a hotel, estimates costs, and surfaces festivals that fall within your dates.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: MapPin, title: "Smart Route Planner", body: "Pick your stops — we'll auto-arrange them by nearest neighbour and split into days." },
              { icon: Calendar, title: "Festival Matchmaker", body: "Set your travel dates and discover which Odia festivals fall right inside them." },
              { icon: Sparkles, title: "Live Expense Engine", body: "Travel, hotel, food, and entry fees — recalculated as you tweak your trip." },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-primary text-zinc-900">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{f.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <h3 className="font-serif text-3xl font-bold sm:text-4xl">Ready to find your Odisha?</h3>
            <a
              href="#login"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-primary px-7 py-3.5 text-sm font-bold text-zinc-900 shadow-xl shadow-amber-500/30 transition hover:scale-[1.03]"
            >
              Sign in & start planning <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-card py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-muted-foreground sm:flex-row lg:px-10">
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-primary to-amber-500 text-white">
              <Flower2 size={11} />
            </div>
            <span className="font-serif text-sm font-semibold text-foreground">OdishaTrail</span>
            <span>· Soul of Odisha</span>
          </div>
          <div>Built with care for India's quietest treasure.</div>
        </div>
      </footer>
    </div>
  );
}
