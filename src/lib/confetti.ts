import confetti from "canvas-confetti";

const COLORS = ["#D62828", "#1B2A5E", "#9CA3AF"];

export function fireConfetti() {
  confetti({
    particleCount: 500,
    spread: 360,
    startVelocity: 65,
    gravity: 0.85,
    ticks: 400,
    scalar: 1.3,
    origin: { x: 0.5, y: 0.5 },
    colors: COLORS,
    zIndex: 10,
  });
}
