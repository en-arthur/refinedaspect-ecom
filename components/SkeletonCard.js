export default function SkeletonCard() {
  return (
    <div>
      <div className="aspect-[3/4] mb-4" style={{ background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
      <div style={{ height: "1.2rem", width: "60%", background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite" }} className="mb-2" />
      <div style={{ height: "0.8rem", width: "40%", background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite 0.2s" }} />
    </div>
  );
}
