import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-24T09:00:00+05:30").getTime();

function calcT(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

export function HeroCountdown() {
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    setT(calcT(TARGET));
    const id = setInterval(() => setT(calcT(TARGET)), 1000);
    return () => clearInterval(id);
  }, []);
  const cells = [
    { v: t?.d ?? 0, l: "Days" },
    { v: t?.h ?? 0, l: "Hrs" },
    { v: t?.m ?? 0, l: "Min" },
    { v: t?.s ?? 0, l: "Sec" },
  ];
  return (
    <div className="flex flex-col gap-3" suppressHydrationWarning>
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/70">
        <span className="inline-block h-[5px] w-[5px] rounded-full bg-[#D62828]" />
        Doors open in
      </div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2" suppressHydrationWarning>
        {cells.map((c, i) => (
          <div key={c.l} className="flex items-baseline gap-4">
            {i > 0 && <span className="h-5 w-px self-center bg-[#1B2A5E]/20" />}
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-serif text-[28px] font-medium leading-none tracking-[-0.02em] text-[#1B2A5E] tabular-nums"
                suppressHydrationWarning
              >
                {t ? String(c.v).padStart(2, "0") : "––"}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B2A5E]/55">
                {c.l}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
