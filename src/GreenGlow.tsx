/* ── GreenGlow.tsx ──
   Drop this component anywhere in your JSX tree.
   It renders ONLY the green radial illumination in the background.
   Position your actual content above it normally.
*/

export default function GreenGlow() {
  return (
    <>
      <style>{`
        .glow-root {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        /* ── PRIMARY GLOW — top right ── */
        .glow-1 {
          position: absolute;
          width: 800px;
          height: 800px;
          top: -200px;
          right: -200px;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(118, 185, 0, 0.12) 0%,
            rgba(118, 185, 0, 0.06) 35%,
            rgba(118, 185, 0, 0.02) 60%,
            transparent 75%
          );
          filter: blur(40px);
          animation: glowPulse1 8s ease-in-out infinite;
        }

        /* ── SECONDARY GLOW — bottom left ── */
        .glow-2 {
          position: absolute;
          width: 600px;
          height: 600px;
          bottom: -150px;
          left: -150px;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(118, 185, 0, 0.08) 0%,
            rgba(118, 185, 0, 0.03) 40%,
            transparent 70%
          );
          filter: blur(60px);
          animation: glowPulse2 11s ease-in-out infinite;
        }

        /* ── ACCENT GLOW — center, very soft ── */
        .glow-3 {
          position: absolute;
          width: 500px;
          height: 500px;
          top: 30%;
          left: 60%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(118, 185, 0, 0.05) 0%,
            transparent 65%
          );
          filter: blur(80px);
          animation: glowPulse3 14s ease-in-out infinite;
        }

        /* ── NEW GLOW — middle left ── */
        .glow-4 {
          position: absolute;
          width: 600px;
          height: 600px;
          top: 60%;
          left: -100px;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(118, 185, 0, 0.06) 0%,
            transparent 70%
          );
          filter: blur(50px);
          animation: glowPulse2 12s ease-in-out infinite reverse;
        }

        /* ── NEW GLOW — bottom right accent ── */
        .glow-5 {
          position: absolute;
          width: 400px;
          height: 400px;
          bottom: 10%;
          right: 5%;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(118, 185, 0, 0.04) 0%,
            transparent 60%
          );
          filter: blur(70px);
          animation: glowPulse1 10s ease-in-out infinite reverse;
        }

        /* ── ANIMATIONS ── */
        @keyframes glowPulse1 {
          0%, 100% { opacity: 1;   transform: scale(1)    translate(0, 0); }
          33%       { opacity: 0.7; transform: scale(1.08) translate(-20px, 15px); }
          66%       { opacity: 0.9; transform: scale(0.95) translate(10px, -10px); }
        }

        @keyframes glowPulse2 {
          0%, 100% { opacity: 1;   transform: scale(1)    translate(0, 0); }
          40%       { opacity: 0.6; transform: scale(1.12) translate(15px, -20px); }
          75%       { opacity: 0.85;transform: scale(0.92) translate(-8px, 12px); }
        }

        @keyframes glowPulse3 {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>

      <div className="glow-root" aria-hidden="true">
        <div className="glow-1" />
        <div className="glow-2" />
        <div className="glow-3" />
        <div className="glow-4" />
        <div className="glow-5" />
      </div>
    </>
  );
}
