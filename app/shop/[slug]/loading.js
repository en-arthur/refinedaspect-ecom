export default function ProductLoading() {
  return (
    <div className="min-h-screen px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Image skeleton */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/4]" style={{ background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
          <div className="flex gap-3">
            {[0,1].map(i => (
              <div key={i} className="flex-1 aspect-[3/4]" style={{ background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
            ))}
          </div>
        </div>
        {/* Details skeleton */}
        <div className="flex flex-col gap-4 pt-4">
          <div style={{ height: "0.8rem", width: "40%", background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
          <div style={{ height: "3rem", width: "70%", background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
          <div style={{ height: "1.2rem", width: "30%", background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
          <div className="mt-4" style={{ height: "1rem", width: "100%", background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
          <div style={{ height: "1rem", width: "80%", background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[0,1,2].map(i => (
              <div key={i} style={{ height: "3rem", background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
            ))}
          </div>
          <div className="mt-4" style={{ height: "3.5rem", background: "var(--surface)", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
        </div>
      </div>
    </div>
  );
}
