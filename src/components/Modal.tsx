import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { fireConfetti } from "@/lib/confetti";

export function Modal({
  open,
  onClose,
  children,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-[100] flex items-end justify-center md:items-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#0d1a3f]/60 backdrop-blur-[2px]" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[560px] max-h-[100vh] md:max-h-[92vh] overflow-y-auto bg-white shadow-2xl md:rounded-2xl rounded-t-2xl animate-[modalIn_240ms_cubic-bezier(0.2,0.8,0.2,1)]"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-[#1B2A5E] hover:bg-[#1B2A5E]/5"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="p-6 md:p-12">{children}</div>
      </div>
      <style>{`
        @keyframes modalIn {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* Shared form primitives */

export function LineField({
  label,
  name,
  type = "text",
  required,
  placeholder,
  helper,
  value,
  onChange,
  pattern,
  maxLength,
  inputMode,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  helper?: string;
  value: string;
  onChange: (v: string) => void;
  pattern?: string;
  maxLength?: number;
  inputMode?: "text" | "email" | "tel" | "numeric";
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B2A5E]/70">
        {label}{required && <span className="text-[#D62828]"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer mt-2 block w-full border-0 border-b border-[#1B2A5E]/20 bg-transparent px-0 py-2 text-[15px] text-[#1B2A5E] outline-none transition-colors placeholder:text-[#1B2A5E]/30 focus:border-[#1B2A5E] focus:ring-0"
      />
      {helper && !error && (
        <span className="mt-1.5 block text-[11px] text-[#1B2A5E]/50">{helper}</span>
      )}
      {error && (
        <span className="mt-1.5 block text-[11px] text-[#D62828]">{error}</span>
      )}
    </label>
  );
}

export function PhoneField({
  label,
  required,
  helper,
  codeValue,
  onCodeChange,
  phoneValue,
  onPhoneChange,
}: {
  label: string;
  required?: boolean;
  helper?: string;
  codeValue: string;
  onCodeChange: (v: string) => void;
  phoneValue: string;
  onPhoneChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B2A5E]/70">
        {label}{required && <span className="text-[#D62828]"> *</span>}
      </span>
      <div className="mt-2 flex items-baseline gap-3">
        <input
          type="text"
          required={required}
          placeholder="+91"
          inputMode="tel"
          aria-label="Country code"
          value={codeValue}
          onChange={(e) => onCodeChange(e.target.value)}
          className="w-[52px] shrink-0 border-0 border-b border-[#1B2A5E]/20 bg-transparent px-0 py-2 text-[15px] text-[#1B2A5E] outline-none transition-colors placeholder:text-[#1B2A5E]/30 focus:border-[#1B2A5E] focus:ring-0"
        />
        <input
          type="tel"
          required={required}
          inputMode="tel"
          aria-label="Phone number"
          value={phoneValue}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="block w-full min-w-0 border-0 border-b border-[#1B2A5E]/20 bg-transparent px-0 py-2 text-[15px] text-[#1B2A5E] outline-none transition-colors placeholder:text-[#1B2A5E]/30 focus:border-[#1B2A5E] focus:ring-0"
        />
      </div>
      {helper && (
        <span className="mt-1.5 block text-[11px] text-[#1B2A5E]/50">{helper}</span>
      )}
    </label>
  );
}

export function LineSelect({
  label,
  required,
  value,
  onChange,
  options,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B2A5E]/70">
        {label}{required && <span className="text-[#D62828]"> *</span>}
      </span>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full appearance-none border-0 border-b border-[#1B2A5E]/20 bg-transparent px-0 py-2 text-[15px] text-[#1B2A5E] outline-none focus:border-[#1B2A5E]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='%231B2A5E' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 2px center",
        }}
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function TextAreaField({
  label,
  required,
  maxLength,
  rows = 3,
  helper,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  helper?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B2A5E]/70">
        {label}{required && <span className="text-[#D62828]"> *</span>}
      </span>
      <textarea
        required={required}
        maxLength={maxLength}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full resize-none border-0 border-b border-[#1B2A5E]/20 bg-transparent px-0 py-2 text-[15px] text-[#1B2A5E] outline-none transition-colors placeholder:text-[#1B2A5E]/30 focus:border-[#1B2A5E] focus:ring-0"
      />
      <div className="mt-1.5 flex items-start justify-between gap-4">
        <span className="text-[11px] text-[#1B2A5E]/50">{helper}</span>
        {maxLength && (
          <span className="shrink-0 text-[11px] text-[#1B2A5E]/50 tabular-nums">
            {value.length} / {maxLength}
          </span>
        )}
      </div>
    </label>
  );
}

export function Stepper({
  label,
  required,
  min = 0,
  max = 50,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const set = (v: number) => onChange(Math.max(min, Math.min(max, v)));
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B2A5E]/70">
        {label}{required && <span className="text-[#D62828]"> *</span>}
      </div>
      <div className="mt-2 flex w-full items-center justify-between border-b border-[#1B2A5E]/20 py-1.5">
        <button
          type="button"
          onClick={() => set(value - 1)}
          aria-label="Decrease"
          className="flex h-11 w-11 items-center justify-center rounded-full text-[#1B2A5E] hover:bg-[#1B2A5E]/5"
        >−</button>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => set(parseInt(e.target.value || "0", 10))}
          className="w-full border-0 bg-transparent text-center font-serif text-[22px] text-[#1B2A5E] outline-none focus:ring-0"
        />
        <button
          type="button"
          onClick={() => set(value + 1)}
          aria-label="Increase"
          className="flex h-11 w-11 items-center justify-center rounded-full text-[#1B2A5E] hover:bg-[#1B2A5E]/5"
        >+</button>
      </div>
    </div>
  );
}

export function SubmitPill({
  children,
  loading,
}: {
  children: ReactNode;
  loading?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#D62828] px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-[#b71f1f] disabled:opacity-60"
    >
      {loading ? "Submitting…" : children}
    </button>
  );
}

export function SegmentedToggle({
  options,
  value,
  onChange,
  className = "",
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={`flex w-full snap-x snap-mandatory gap-1.5 overflow-x-auto rounded-[20px] border border-[#1B2A5E]/12 bg-[#f7f8fa] p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] xl:gap-1 xl:overflow-visible xl:p-1 [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className={`shrink-0 snap-start whitespace-nowrap rounded-2xl px-4 py-3.5 text-center text-[11.5px] font-semibold uppercase tracking-[0.09em] transition-all duration-200 xl:flex-1 xl:rounded-full ${
            value === o.value
              ? "bg-[#1B2A5E] text-white shadow-[0_10px_24px_-10px_rgba(27,42,94,0.55)]"
              : "text-[#1B2A5E]/55 hover:text-[#1B2A5E]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ModalHeader({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="mb-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D62828]">
        {eyebrow}
      </div>
      <h2
        id={id}
        className="mt-3 font-serif text-[28px] md:text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-[#1B2A5E]"
      >
        {title}
      </h2>
    </div>
  );
}

export function SuccessBlock({
  title,
  body,
}: {
  title: string;
  body?: string;
}) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="success-title">
        <div className="py-4 text-center">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#D62828]" />
          <p
            id="success-title"
            className="mt-5 font-serif text-[24px] md:text-[28px] leading-[1.2] tracking-[-0.02em] text-[#1B2A5E]"
          >
            {title}
          </p>
          {body && (
            <p className="mt-4 text-[14px] leading-[1.6] text-[#1B2A5E]/70">{body}</p>
          )}
        </div>
      </Modal>

      <div className="py-6 text-center">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#D62828]" />
        <p className="mt-5 font-serif text-[24px] md:text-[28px] leading-[1.2] tracking-[-0.02em] text-[#1B2A5E]">
          We can't wait to see you!
        </p>
        <p className="mt-4 text-[14px] leading-[1.6] text-[#1B2A5E]/70">
          While you wait, take a look at what's coming at FED 2026 — the stage, the speakers, and everything else we've been building.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#D62828] transition-colors hover:text-[#b71f1f]"
        >
          Explore FED 2026 <span aria-hidden>→</span>
        </Link>
      </div>
    </>
  );
}
