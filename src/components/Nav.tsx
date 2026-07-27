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


  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 bg-white border-b border-line transition-transform duration-500 ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >

      <div className="relative mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-8">
        <a href="/#top" className="flex items-center" aria-label="Future of Education 2026">
          <img src={logo} alt="Future of Education 2026" className="h-10 w-auto md:h-12" />
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {items.map((i) =>
            i.label === "Awards" ? (
              <div key={i.label} className="group relative">
                <a
                  href={i.href}
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-navy/80 transition-colors hover:text-navy"
                >
                  {i.label}
                  <svg width="9" height="6" viewBox="0 0 9 6" className="opacity-60">
                    <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                  </svg>
                </a>
                <div className="invisible absolute left-1/2 top-full z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-white p-2 opacity-0 shadow-[0_20px_40px_-18px_rgba(20,44,115,0.25)] transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <a href="/#awards" className="block rounded px-4 py-2 text-[13px] text-navy/80 hover:bg-[#f7f8fa] hover:text-navy">Top 100 Schools</a>
                  <Link
                    to="/nominate"
                    className="block w-full rounded px-4 py-2 text-left text-[13px] text-navy/80 hover:bg-[#f7f8fa] hover:text-navy"
                  >
                    Nominate Your School
                  </Link>

                </div>
              </div>
            ) : (
              <a
                key={i.label}
                href={i.href}
                className="text-[13px] font-medium text-navy/80 transition-colors hover:text-navy"
              >
                {i.label}
              </a>
            ),
          )}
        </nav>

        <Link
          to="/confirm"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#D62828] px-5 py-2.5 text-[13px] font-medium tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#b71f1f] hover:shadow-[0_10px_30px_-12px_rgba(214,40,40,0.55)]"
        >
          Confirm Attendance
        </Link>


      </div>
    </header>
  );
}
