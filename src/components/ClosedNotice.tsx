export function ClosedNotice({
  title = "Registrations are closed",
  body = "Thank you for the incredible response — registration for FED 2026 is now closed. Need to reach our team? Call +91 82206 06367.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <div className="py-4 text-center">
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#D62828]" />
      <p className="mt-5 font-serif text-[24px] leading-[1.2] tracking-[-0.02em] text-[#1B2A5E] md:text-[28px]">
        {title}
      </p>
      {body && (
        <p className="mx-auto mt-4 max-w-[46ch] text-[15px] leading-[1.6] text-[#1B2A5E]/70">
          {body}
        </p>
      )}
    </div>
  );
}
