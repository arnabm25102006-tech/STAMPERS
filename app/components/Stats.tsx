export default function Stats() {
  return (
    <section
  id="competitions"
  className="max-w-7xl mx-auto px-8 py-24"
>
      <div className="grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-5xl font-bold">500+</h2>
          <p className="text-zinc-500 mt-3">
            Participants
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">25+</h2>
          <p className="text-zinc-500 mt-3">
            Competitions
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">₹50K+</h2>
          <p className="text-zinc-500 mt-3">
            Prize Pool
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">100%</h2>
          <p className="text-zinc-500 mt-3">
            Transparent Judging
          </p>
        </div>

      </div>
    </section>
  );
}