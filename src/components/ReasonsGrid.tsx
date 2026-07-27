import orbit1 from "@/assets/orbit1.jpg";
import orbit2 from "@/assets/orbit2.jpg";
import orbit3 from "@/assets/orbit3.jpg";
import orbit4 from "@/assets/orbit4.jpg";
import orbit5 from "@/assets/orbit5.jpg";
import orbit6 from "@/assets/orbit6.jpg";
import bgImg from "@/assets/orbit-bg.jpg";

const REASONS = [
  { label: "Global Recognition", image: orbit1 },
  { label: "Best Practices",     image: orbit2 },
  { label: "Expert Speakers",    image: orbit3 },
  { label: "School Networking",  image: orbit4 },
  { label: "Future Trends",      image: orbit5 },
  { label: "Student Showcase",   image: orbit6 },
];

export function ReasonsGrid() {
  return (
    <section id="reasons" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: "rgba(10,20,55,0.88)" }} />

      <div className="relative mx-auto max-w-[1280px] px-8">
        <div className="mb-12 md:mb-16">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FF5A5A]">
            What You Gain
          </div>
          <h2 className="mt-4 max-w-[22ch] font-serif text-[clamp(2rem,4.4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
            Six reasons to be in the room<span className="text-[#FF5A5A]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {REASONS.map((r) => (
            <figure
              key={r.label}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg"
            >
              <img
                src={r.image}
                alt={r.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,20,55,0.15) 0%, rgba(10,20,55,0.35) 45%, rgba(10,20,55,0.85) 100%)",
                }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <span className="block h-[2px] w-8 bg-[#FF5A5A] transition-all duration-500 group-hover:w-14" />
                <div className="mt-4 font-serif text-[22px] md:text-[26px] font-medium leading-[1.1] tracking-[-0.01em] text-white">
                  {r.label}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
