import logoAsset from "@/assets/aws-logo.png.asset.json";

export function HostedBy() {
  return (
    <section className="bg-white">
      {/* Top hairline */}
      <div className="h-px w-full bg-[#E5E7EB]" />

      <div className="mx-auto max-w-[1280px] px-8 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-6">
          {/* PRESENTED BY */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5 md:gap-6">
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/55"
            >
              Presented By
            </span>
            <img
              src={logoAsset.url}
              alt="American World School"
              className="h-8 w-auto md:h-10"
            />
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block h-10 w-px bg-[#E5E7EB]" />

          {/* IN COLLABORATION WITH */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5 md:gap-6">
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1B2A5E]/55"
            >
              In Collaboration With
            </span>
            <div className="flex items-center gap-6 md:gap-8">
              <span className="text-[18px] font-semibold uppercase tracking-[0.12em] text-[#1B2A5E] md:text-[22px]">
                AIAASC
              </span>
              <span className="text-[18px] font-semibold uppercase tracking-[0.12em] text-[#1B2A5E] md:text-[22px]">
                WASC
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="h-px w-full bg-[#E5E7EB]" />
    </section>
  );
}
