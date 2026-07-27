import { useEffect, useRef, useState } from "react";
import fedLogo from "@/assets/fed-logo-mark.jpg";

const SESSION_KEY = "fed26_gate_opened";
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function InvitationGate() {
  const [mounted, setMounted] = useState(false);
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setGone(true);
      return;
    }
    setMounted(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const open = () => {
    if (opening) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOpening(true);
    const total = reduced ? 320 : 1250;
    window.setTimeout(() => {
      document.body.style.overflow = "";
      setGone(true);
      window.dispatchEvent(new CustomEvent("fed:gate-opened"));
    }, total);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  if (gone || !mounted) return null;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{
        background:
          "radial-gradient(ellipse 55% 45% at 50% 48%, #1B2A5E 0%, #0E1734 55%, #070C1E 100%)",
        perspective: "1400px",
        transition: `opacity 500ms ${EASE}`,
        animation: opening && !reduced ? `gateBgFade 500ms ${EASE} 250ms forwards` : undefined,
        opacity: opening && reduced ? 0 : undefined,
      }}
    >
      {/* faint drifting dust motes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: "18%", left: "22%", d: "9s", delay: "0s", s: 3 },
          { top: "32%", left: "78%", d: "11s", delay: "1.2s", s: 2 },
          { top: "62%", left: "14%", d: "13s", delay: "0.6s", s: 2 },
          { top: "76%", left: "72%", d: "10s", delay: "2.1s", s: 3 },
          { top: "44%", left: "88%", d: "12s", delay: "0.3s", s: 2 },
          { top: "84%", left: "40%", d: "14s", delay: "1.8s", s: 2 },
          { top: "12%", left: "56%", d: "10s", delay: "2.6s", s: 2 },
          { top: "58%", left: "48%", d: "13s", delay: "3.2s", s: 3 },
        ].map((m, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: m.top,
              left: m.left,
              width: m.s,
              height: m.s,
              background: "rgba(255,240,210,0.55)",
              boxShadow: "0 0 8px 2px rgba(255,235,200,0.35)",
              opacity: 0.5,
              animation: `gateDrift ${m.d} ease-in-out ${m.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* CARD (whole card is the click target) */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Open your invitation"
        onClick={open}
        onKeyDown={onKey}
        className="relative cursor-pointer"
        style={{
          width: "min(88vw, 420px)",
          aspectRatio: "3 / 4",
          transformStyle: "preserve-3d",
          animation: opening
            ? `gateCardRecede 650ms ${EASE} forwards`
            : `gateFloat 4.5s ease-in-out infinite`,
          filter:
            "drop-shadow(0 40px 100px rgba(0,0,0,0.55)) drop-shadow(0 8px 20px rgba(0,0,0,0.45))",
          outline: "none",
        }}
      >
        <CardHalf side="left" opening={opening} reduced={reduced} />
        <CardHalf side="right" opening={opening} reduced={reduced} />
      </div>

      {/* caption */}
      <div
        className="mt-6 text-white/80"
        style={{
          fontSize: 11,
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          transition: `opacity 400ms ${EASE}`,
          opacity: opening ? 0 : 1,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          animation: !opening ? "gateCaptionShimmer 2.5s ease-in-out infinite" : undefined,
        }}
      >
        Click to open your invitation
      </div>

      <style>{`
        @keyframes gateFloat {
          0%,100% { transform: translateY(-4px); }
          50%     { transform: translateY(4px); }
        }
        @keyframes gateCardRecede {
          0%   { transform: translateY(0) scale(1); }
          100% { transform: translateY(0) scale(0.96); }
        }
        @keyframes gateBgFade { to { opacity: 0; } }
        @keyframes gateHalfLeft {
          0%   { transform: rotateY(0deg) translateX(0); opacity: 1; }
          100% { transform: rotateY(-18deg) translateX(-45%); opacity: 0; }
        }
        @keyframes gateHalfRight {
          0%   { transform: rotateY(0deg) translateX(0); opacity: 1; }
          100% { transform: rotateY(18deg) translateX(45%); opacity: 0; }
        }
        @keyframes gateHalfFade { to { opacity: 0; transform: scale(0.96); } }
        @keyframes gateDrift {
          0%,100% { transform: translate(0,0); opacity: 0.35; }
          50%     { transform: translate(12px,-18px); opacity: 0.7; }
        }
        @keyframes gateCaptionShimmer {
          0%,100% { opacity: 0.6; }
          50%     { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function CardHalf({
  side,
  opening,
  reduced,
}: {
  side: "left" | "right";
  opening: boolean;
  reduced: boolean;
}) {
  const isLeft = side === "left";
  const delay = isLeft ? "0ms" : "40ms";
  const anim = opening
    ? reduced
      ? `gateHalfFade 300ms ${EASE} forwards`
      : `${isLeft ? "gateHalfLeft" : "gateHalfRight"} 650ms ${EASE} ${delay} forwards`
    : undefined;

  return (
    <div
      className="absolute top-0 h-full overflow-hidden"
      style={{
        width: "50%",
        left: isLeft ? 0 : "50%",
        transformOrigin: isLeft ? "right center" : "left center",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        animation: anim,
        willChange: "transform, opacity",
        borderRadius: isLeft ? "4px 0 0 4px" : "0 4px 4px 0",
      }}
    >
      <div
        className="absolute top-0 h-full"
        style={{
          width: "200%",
          left: isLeft ? 0 : "-100%",
          background: "#FFFFFF",
          borderRadius: 4,
          boxShadow: "inset 0 0 0 1px #1B2A5E",
        }}
      >
        <CardFace />
      </div>
    </div>
  );
}

function CardFace() {
  return (
    <div className="relative flex h-full w-full flex-col items-center px-8 pt-10 pb-12 text-center">
      {/* FED logo */}
      <img
        src={fedLogo}
        alt="FED — Future of Education 2026"
        style={{ height: 34, width: "auto", objectFit: "contain" }}
      />

      <div className="flex-1" />

      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontVariant: "small-caps",
          fontSize: 12,
          color: "#1B2A5E",
          letterSpacing: "0.32em",
        }}
      >
        You are cordially invited
      </div>

      <div
        className="mt-4"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: "clamp(22px, 3.6vw, 30px)",
          lineHeight: 1.08,
          color: "#1B2A5E",
        }}
      >
        Future of Education
        <div
          style={{
            fontSize: "clamp(15px, 2.2vw, 18px)",
            marginTop: 4,
            letterSpacing: "0.04em",
          }}
        >
          — Edition 04 —
        </div>
      </div>

      {/* flourish */}
      <div className="mt-6 flex items-center gap-3" aria-hidden>
        <span style={{ height: 1, width: 40, background: "#1B2A5E", opacity: 0.35 }} />
        <StarGlyph />
        <span style={{ height: 1, width: 40, background: "#1B2A5E", opacity: 0.35 }} />
      </div>

      <div
        className="mt-4"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontVariant: "small-caps",
          fontSize: 11,
          letterSpacing: "0.3em",
          color: "#6b7280",
        }}
      >
        August 24, 2026 · Chennai
      </div>

      <div className="flex-1" />

      {/* closing navy rule */}
      <div
        aria-hidden
        style={{ height: 1, width: 32, background: "#1B2A5E", opacity: 0.7 }}
      />
    </div>
  );
}

function StarGlyph({ size = 10, color = "#D62828" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 2 L14.2 9.2 L21.6 9.2 L15.6 13.6 L17.9 20.8 L12 16.4 L6.1 20.8 L8.4 13.6 L2.4 9.2 L9.8 9.2 Z" />
    </svg>
  );
}
