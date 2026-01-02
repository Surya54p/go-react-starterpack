export default function HeroSection() {
  return (
    <section className="w-full px-38 pt-16 pb-24">
      {/* Text Content */}
      <div className="flex flex-col items-center text-center gap-4">
        <span className="text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-600">
          #DesignedToPerformBuiltToLast
        </span>

        <h1 className="text-5xl font-bold leading-tight">
          Tech That Fits Your Lifestyle
        </h1>

        <p className="text-gray-600 max-w-xl">
          Experience the perfect blend of performance, design, and comfort
        </p>

        <button
          type="button"
          className="mt-4 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition"
        >
          Shop the Collection
        </button>
      </div>

      {/* Product Image */}
      <div className="mt-16 flex justify-center">
        <img
          src="/watch.png"
          alt="Smart watch product"
          className="max-w-225 w-full object-contain"
        />
      </div>
    </section>
  );
};