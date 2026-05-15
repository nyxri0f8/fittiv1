/* ── FittiCursor.tsx ──
   Drop <FittiCursor /> once inside your root layout (App.jsx or layout.jsx).
   It mounts globally — works across all pages automatically.
   No props needed. Zero dependencies.
*/

import { useEffect, useRef } from "react";

export default function FittiCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    let mx = 0, my = 0;   // real mouse position
    let rx = 0, ry = 0;   // ring lag position
    let rafId: number;

    /* ── 1. Track mouse position ── */
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows instantly
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
    };

    /* ── 2. Ring follows with spring lag ── */
    const animateRing = () => {
      rx += (mx - rx) * 0.10;   // lower = more lag (0.06 dreamy / 0.15 snappy)
      ry += (my - ry) * 0.10;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();

    /* ── 3. Hover expand on interactive elements ── */
    const onEnter = () => {
      dot.style.transform  = "translate(-50%,-50%) scale(3)";
      dot.style.opacity    = "0.35";
      ring.style.width     = "58px";
      ring.style.height    = "58px";
      ring.style.opacity   = "1";
      ring.style.borderColor = "rgba(118,185,0,0.9)";
    };

    const onLeave = () => {
      dot.style.transform  = "translate(-50%,-50%) scale(1)";
      dot.style.opacity    = "1";
      ring.style.width     = "38px";
      ring.style.height    = "38px";
      ring.style.opacity   = "0.55";
      ring.style.borderColor = "rgba(118,185,0,0.7)";
    };

    /* ── 4. Click pulse ── */
    const onClick = () => {
      dot.style.transform = "translate(-50%,-50%) scale(0.5)";
      ring.style.transform = "translate(-50%,-50%) scale(1.6)";
      ring.style.opacity = "0.2";
      setTimeout(() => {
        dot.style.transform  = "translate(-50%,-50%) scale(1)";
        ring.style.transform = "translate(-50%,-50%) scale(1)";
        ring.style.opacity   = "0.55";
      }, 180);
    };

    /* ── 5. Hide when cursor leaves window ── */
    const onLeaveWindow = () => {
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
    };
    const onEnterWindow = () => {
      dot.style.opacity  = "1";
      ring.style.opacity = "0.55";
    };

    /* ── 6. Attach to all interactive elements ── */
    const targets = () =>
      document.querySelectorAll("a, button, input, textarea, select, [data-cursor], .card, .feat-card, .option-card");

    const attachHovers = () => {
      targets().forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attachHovers();

    // Re-attach if DOM changes (for dynamic content)
    const observer = new MutationObserver(attachHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("click",      onClick);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("click",      onClick);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      targets().forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <style>{`
        /* Hide the default OS cursor site-wide */
        * { cursor: none !important; }

        /* ── DOT ── */
        .fitti-cursor-dot {
          width: 10px;
          height: 10px;
          background: #76B900;
          border-radius: 50%;
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%) scale(1);
          transition:
            transform  0.15s cubic-bezier(.34,1.56,.64,1),
            opacity    0.2s ease,
            background 0.2s ease,
            width      0.2s ease,
            height     0.2s ease;
          will-change: left, top, transform;
        }

        /* ── RING ── */
        .fitti-cursor-ring {
          width: 38px;
          height: 38px;
          border: 1.5px solid rgba(118,185,0,0.7);
          border-radius: 50%;
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.55;
          transition:
            width       0.25s cubic-bezier(.34,1.56,.64,1),
            height      0.25s cubic-bezier(.34,1.56,.64,1),
            opacity     0.25s ease,
            transform   0.25s cubic-bezier(.34,1.56,.64,1),
            border-color 0.2s ease;
          will-change: left, top, width, height;
        }

        /* ── MOBILE: restore default cursor, hide custom ── */
        @media (hover: none) and (pointer: coarse) {
          * { cursor: auto !important; }
          .fitti-cursor-dot,
          .fitti-cursor-ring { display: none !important; }
        }
      `}</style>

      {/* These two divs are the entire cursor — nothing else needed */}
      <div ref={dotRef}  className="fitti-cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="fitti-cursor-ring" aria-hidden="true" />
    </>
  );
}
