import { Trophy, Camera, Users } from "lucide-react";

export default function WhyStampers() {
  return (
    <section className="py-10 px-8">
  <div className="max-w-7xl mx-auto">

<div className="text-center mb-10 relative">

  <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[500px] h-[200px] bg-yellow-500/20 blur-[120px] rounded-full"></div>

  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-xl mb-6">
    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
    <span className="text-yellow-400 tracking-[3px] uppercase text-sm font-semibold">
      Why Choose Stampers
    </span>
  </div>

  <h2 className="font-['Cinzel'] text-6xl font-bold text-white relative z-10">
    Why <span className="text-yellow-400">STAMPERS?</span>
  </h2>

  <p className="text-white font-semibold text-xl leading-relaxed drop-shadow-[0_4px_15px_rgba(0,0,0,1)]">
    Join India's fastest-growing creative platform and turn your
    creativity into recognition, rewards, and opportunities.
  </p>

</div>
  
</div>
     

        <div className="grid md:grid-cols-3 gap-6 mt-4">

          {/* Card 1 */}
          <div className="group bg-black/30 backdrop-blur-2xl border border-yellow-500/20 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 hover:border-yellow-400/60 hover:shadow-[0_0_40px_rgba(255,200,0,0.2)]">
           <div className="absolute left-1/2 -translate-x-1/2 top-20 w-[400px] h-[200px] bg-yellow-500/20 blur-[120px] rounded-full"></div>
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
  <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
  <Trophy size={32} className="text-yellow-400" />
</div>
</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Win Competitions
            </h3>

            <p className="text-gray-400">
              Participate in exciting challenges and
              win prizes, certificates, and recognition.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-black/30 backdrop-blur-2xl border border-yellow-500/20 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 hover:border-yellow-400/60 hover:shadow-[0_0_40px_rgba(255,200,0,0.2)]">
           <div className="absolute left-1/2 -translate-x-1/2 top-20 w-[400px] h-[200px] bg-yellow-500/20 blur-[120px] rounded-full"></div>
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
 <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
  <Trophy size={32} className="text-yellow-400" />
</div>
</div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Showcase Talent
            </h3>

            <p className="text-gray-400">
              Build your portfolio and get your work
              discovered by a larger audience.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-black/30 backdrop-blur-2xl border border-yellow-500/20 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 hover:border-yellow-400/60 hover:shadow-[0_0_40px_rgba(255,200,0,0.2)]">
           <div className="absolute left-1/2 -translate-x-1/2 top-20 w-[400px] h-[200px] bg-yellow-500/20 blur-[120px] rounded-full"></div>
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
 <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
  <Trophy size={32} className="text-yellow-400" />
</div>
</div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Join Community
            </h3>

            <p className="text-gray-400">
              Connect with photographers and creators
              from across India.
            </p>
            <a
  href="https://chat.whatsapp.com/DrNbGCRABjbAGoHI15Ftad"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block mt-6 px-6 py-3 rounded-full bg-yellow-400 text-black font-bold hover:scale-105 transition"
>
  Join WhatsApp Group →
</a>
          </div>

        </div>
        <div className="text-center mt-8"><button className="px-10 py-4 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-black font-bold text-lg shadow-[0_0_30px_rgba(255,200,0,0.35)] hover:scale-105 transition-all duration-300">Explore Competitions →</button></div>

    </section>

  );
}