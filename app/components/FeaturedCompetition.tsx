export default function FeaturedCompetition() {
  return (
    <section className="max-w-7xl mx-auto px-8 mb-32">

      <div className="relative rounded-[40px] overflow-hidden border border-zinc-800">

        <img
  src="https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/competition-images/STAMPERS.png"
  alt="Featured Competition"
  className="w-full h-[600px] object-cover"
/>

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-12 left-12">

          <p className="text-zinc-300 mb-4">
            Featured Competition
          </p>

          <h2 className="text-6xl font-bold mb-6">
            Photography Championship
          </h2>

          <a
            href="/competition/1"
            className="bg-white text-black px-8 py-4 rounded-full"
          >
            Explore
          </a>

        </div>

      </div>

    </section>
  );
}