export default function WhyStampers() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-32">
      <h2 className="text-5xl font-bold mb-16">
        Built For Student Talent
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-4">
            Real Competitions
          </h3>

          <p className="text-zinc-400">
            Participate in curated competitions with meaningful rewards.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-4">
            Build Your Portfolio
          </h3>

          <p className="text-zinc-400">
            Showcase your best work and gain recognition.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-4">
            Win Rewards
          </h3>

          <p className="text-zinc-400">
            Earn prizes and establish your reputation.
          </p>
        </div>
      </div>
    </section>
  );
}