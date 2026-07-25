import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-24T09:00:00+05:30").getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export function Countdown() {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { v: t.d, l: "Days" },
    { v: t.h, l: "Hours" },
    { v: t.m, l: "Minutes" },
    { v: t.s, l: "Seconds" },
  ];

  return (
    <div>
      <div className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#1B2A5E]/70">
        <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#D62828]" />
        Doors open in
      </div>
      <div className="grid max-w-[560px] grid-cols-4 gap-4 md:gap-8">
        {cells.map((c, i) => (
          <div
            key={c.l}
            className={`relative ${i > 0 ? "border-l border-[#1B2A5E]/15 pl-4 md:pl-8" : ""}`}
          >
            <div className="font-serif text-[44px] font-medium leading-none tracking-[-0.02em] text-[#1B2A5E] tabular-nums md:text-[64px]">
              {String(c.v).padStart(2, "0")}
            </div>
            <div className="mt-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#1B2A5E]/55 md:text-[11px]">
              {c.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
