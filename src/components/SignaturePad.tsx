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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const drawing = useRef(false);
  const moved = useRef(false);
  const empty = useRef(true);
  const uploadedRef = useRef<string | null>(null);
  const [uploaded, setUploadedState] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);

  const setUploaded = (v: string | null) => {
    uploadedRef.current = v;
    setUploadedState(v);
  };

  // Attaches drawing listeners whenever the canvas is mounted (i.e. no image uploaded).
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
      moved.current = false;
      const { x, y } = pos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drawing.current) return;
      moved.current = true;
      empty.current = false;
      setDrawn(true);
      const { x, y } = pos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    };
    const up = () => {
      drawing.current = false;
      if (!moved.current) fileInputRef.current?.click();
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointerleave", up);

    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointerleave", up);
    };
  }, [uploaded]);

  // Registers the handle independently of whether the canvas is currently
  // mounted, and reads from refs so it always reflects the latest state
  // (uploading an image unmounts the canvas, which used to skip registration).
  useEffect(() => {
    onRegister({
      isEmpty: () => empty.current && !uploadedRef.current,
      toBlob: async () => {
        if (uploadedRef.current) {
          const res = await fetch(uploadedRef.current);
          return await res.blob();
        }
        const canvas = canvasRef.current;
        if (!canvas) return null;
        return await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/png"),
        );
      },
      clear: () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
        empty.current = true;
        setUploaded(null);
        setDrawn(false);
      },
    });
  }, [onRegister]);

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
          <img
            src={uploaded}
            alt="Signature"
            className="h-full w-full cursor-pointer object-contain"
            onClick={() => fileInputRef.current?.click()}
          />
        ) : (
          <>
            <canvas ref={canvasRef} className="h-full w-full cursor-pointer touch-none" />
            {!drawn && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] text-[#1B2A5E]/40">
                Click to upload your signature
              </div>
            )}
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-[#1B2A5E]/60">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="underline decoration-dotted hover:text-[#1B2A5E]"
        >
          or upload image
        </button>
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
            setDrawn(false);
          }}
          className="text-[#1B2A5E]/60 hover:text-[#1B2A5E]"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
