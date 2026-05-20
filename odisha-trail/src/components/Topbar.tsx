import { Search, Flower2, Moon, Sun, LogOut } from "lucide-react";
import { useAppState } from "@/lib/state";

type Props = { search?: string; onSearch?: (s: string) => void; title?: string };

export function Topbar({ search, onSearch, title }: Props) {
  const s = useAppState();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-card/70 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-2 lg:hidden">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-amber-500 text-white">
          <Flower2 size={16} />
        </div>
        <span className="font-serif text-base font-semibold">OdishaTrail</span>
      </div>

      {title && <h1 className="hidden font-serif text-lg font-semibold lg:block">{title}</h1>}

      {onSearch && (
        <div className="ml-auto flex max-w-md flex-1 items-center gap-2 rounded-xl border bg-background px-3 py-2 lg:ml-6">
          <Search size={15} className="text-muted-foreground" />
          <input
            value={search || ""}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search destinations, districts, types..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      )}

      <div className="ml-auto flex items-center gap-2 lg:ml-2">
        <button
          onClick={() => s.setDark(!s.dark)}
          className="grid h-9 w-9 place-items-center rounded-xl border bg-background text-muted-foreground transition hover:text-foreground lg:hidden"
        >
          {s.dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <div className="hidden items-center gap-2 rounded-full border bg-background px-3 py-1.5 sm:flex">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-amber-500 text-xs font-semibold text-white">
            {(s.user?.name || "G").slice(0, 1).toUpperCase()}
          </div>
          <div className="text-xs">
            <div className="font-semibold leading-tight">{s.user?.name || "Guest"}</div>
            <div className="text-[10px] text-muted-foreground">Traveller</div>
          </div>
        </div>
        {s.user && (
          <button
            onClick={() => s.setUser(null)}
            title="Sign out"
            className="grid h-9 w-9 place-items-center rounded-xl border bg-background text-muted-foreground transition hover:text-foreground"
          >
            <LogOut size={15} />
          </button>
        )}
      </div>
    </header>
  );
}
