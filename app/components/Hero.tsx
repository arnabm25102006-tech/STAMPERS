export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/20 blur-[180px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[160px]" />

        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-[160px]" />
      </div>

     <div className="relative max-w-7xl mx-auto px-6 md:px-8 pt-6 md:pt-10 pb-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl mb-4">

          <div className="w-2 h-2 rounded-full bg-green-500" />

          <span className="text-sm text-zinc-300">
            India's Creative Competition Platform
          </span>

        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-4 bg-gradient-to-r from-white via-zinc-200 to-purple-300 bg-clip-text text-transparent">
          Discover.
          <br />
          Compete.
          <br />
          Get Recognized.
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-6">
          Participate in photography, design, coding, AI,
          filmmaking and creative competitions. Build your
          portfolio, gain recognition and compete with
          talented creators across India.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">

          <a
            href="#competitions"
            className="px-6 py-3 md:px-8 md:py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-105 transition-all duration-300"
          >
            Explore Competitions
          </a>

          <a
            href="/leaderboard"
            className="px-6 py-3 md:px-8 md:py-4 rounded-2xl border border-zinc-700 bg-zinc-950/50 backdrop-blur-xl hover:border-zinc-500 transition-all duration-300"
          >
            View Leaderboard
          </a>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">

          <div className="p-4 md:p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              1K+
            </h2>

            <p className="text-zinc-500">
              Participants
            </p>
          </div>

          <div className="p-4 md:p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              ₹50K+
            </h2>

            <p className="text-zinc-500">
              Prize Pool
            </p>
          </div>

          <div className="p-4 md:p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              20+
            </h2>

            <p className="text-zinc-500">
              Competitions
            </p>
          </div>

          <div className="p-4 md:p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              10+
            </h2>

            <p className="text-zinc-500">
              Categories
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}