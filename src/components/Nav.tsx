import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/fed-logo-2026.jpg";


const items = [
  { label: "Why FED", href: "/#why-fed" },
  { label: "Voices", href: "/#voices" },
  { label: "Reasons", href: "/#reasons" },
  { label: "For Students", href: "/#students" },
  { label: "Global Reach", href: "/#global" },
];


export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-hide-nav]")) as HTMLElement[];
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio > 0.05) visible.add(e.target);
          else visible.delete(e.target);
        });
        setHidden(visible.size > 0);
      },
      { threshold: [0, 0.05, 0.5, 1] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (hidden) setOpen(false);
  }, [hidden]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b bg-white/95 backdrop-blur transition-[transform,opacity,box-shadow,border-color] duration-500 ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      } ${scrolled ? "border-line shadow-[0_1px_0_rgba(20,44,115,0.06)]" : "border-transparent"}`}
    >
      <div className="mx-auto grid h-[76px] max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 md:px-10">
        <a href="/#top" className="flex shrink-0 items-center justify-self-start" aria-label="Future of Education 2026">
          <img src={logo} alt="Future of Education 2026" className="h-10 w-auto md:h-11" />
        </a>

        <nav className="hidden items-center justify-self-center gap-7 xl:flex xl:gap-8">
          {items.map((i) => (
            <a
              key={i.label}
              href={i.href}
              className="group relative py-2 text-[13px] font-medium tracking-wide text-navy/70 transition-colors hover:text-navy"
            >
              {i.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-red transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-self-end gap-6">
          <Link
            to="/participate"
            className="group relative hidden whitespace-nowrap py-2 text-[13px] font-medium tracking-wide text-navy/70 transition-colors hover:text-navy xl:inline-flex"
          >
            Attendee Registration
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-red transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
          <Link
            to="/confirm"
            className="hidden items-center whitespace-nowrap rounded-full bg-red px-5 py-2.5 text-[12.5px] font-medium tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:bg-red-deep hover:shadow-[0_10px_30px_-12px_rgba(229,57,53,0.55)] xl:inline-flex"
          >
            Awardee Registration
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 xl:hidden"
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
                <path d="M0 1h18M0 6.5h18M0 12h18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-line bg-white transition-[max-height,opacity] duration-300 ease-out xl:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4">
          {items.map((i) => (
            <a
              key={i.label}
              href={i.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-[14px] font-medium text-navy/80 last:border-b-0"
            >
              {i.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
          <Link
            to="/participate"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-full border border-navy/15 px-5 py-3 text-[13px] font-medium tracking-wide text-navy/80"
          >
            Attendee Registration
          </Link>
          <Link
            to="/confirm"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-red px-5 py-3 text-[13px] font-medium tracking-wide text-white"
          >
            Awardee Registration
          </Link>
        </div>
      </div>
    </header>
  );
}
