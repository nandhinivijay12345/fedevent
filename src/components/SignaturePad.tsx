import { useEffect, useRef, useState } from "react";

export type SignatureHandle = {
  isEmpty: () => boolean;
  toBlob: () => Promise<Blob | null>;
  clear: () => void;
};

export function SignaturePad({
  onRegister,
}: {
  onRegister: (h: SignatureHandle) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const empty = useRef(true);
  const [uploaded, setUploaded] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = "#1B2A5E";

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const down = (e: PointerEvent) => {
      drawing.current = true;
      empty.current = false;
      const { x, y } = pos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drawing.current) return;
      const { x, y } = pos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    };
    const up = () => { drawing.current = false; };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointerleave", up);

    onRegister({
      isEmpty: () => empty.current && !uploaded,
      toBlob: async () => {
        if (uploaded) {
          const res = await fetch(uploaded);
          return await res.blob();
        }
        return await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/png"),
        );
      },
      clear: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        empty.current = true;
        setUploaded(null);
      },
    });

    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointerleave", up);
    };
  }, [onRegister, uploaded]);

  const onFile = (f: File | undefined) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setUploaded(String(reader.result));
    reader.readAsDataURL(f);
  };

  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B2A5E]/70">
        Signature <span className="text-[#D62828]">*</span>
      </div>
      <div className="relative mt-2 h-32 w-full border border-dashed border-[#1B2A5E]/30 bg-[#FAFAF8]">
        {uploaded ? (
          <img src={uploaded} alt="Signature" className="h-full w-full object-contain" />
        ) : (
          <canvas ref={canvasRef} className="h-full w-full touch-none" />
        )}
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-[#1B2A5E]/60">
        <label className="cursor-pointer underline decoration-dotted hover:text-[#1B2A5E]">
          or upload image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            const c = canvasRef.current;
            if (c) {
              const ctx = c.getContext("2d")!;
              ctx.clearRect(0, 0, c.width, c.height);
            }
            empty.current = true;
            setUploaded(null);
          }}
          className="text-[#1B2A5E]/60 hover:text-[#1B2A5E]"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
