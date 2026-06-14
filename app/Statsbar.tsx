import { Trophy, Users, Award, Camera } from "lucide-react";

export default function StatsBar() {
  return (
<div className="w-full mx-auto mt-8 pb-0">
      <div
        className="
          bg-gradient-to-r
          from-black/95
          via-black/95
          to-black/95
          backdrop-blur-2xl
          border border-yellow-500/20
          square-1x2
          py-3 px-6
          shadow-[0_0_40px_rgba(255,180,0,0.15)]
        "
      >
        <div className="grid grid-cols-4 text-center">

          {/* Competitions */}
          <div>
            <Trophy
              className="mx-auto mb-3 text-yellow-400"
              size={36}
            />

           <h2 className="text-4xl font-bold text-white">
              50+
            </h2>

            <p className="text-gray-400 mt-2">
              Competitions
            </p>
          </div>

          {/* Participants */}
          <div className="border-l border-yellow-500/10">
            <Users
              className="mx-auto mb-3 text-yellow-400"
              size={28}
            />

            <h2 className="text-5xl font-bold text-white">
              1000+
            </h2>

            <p className="text-gray-400 mt-2">
              Participants
            </p>
          </div>

          {/* Winners */}
          <div className="border-l border-yellow-500/10">
            <Award
              className="mx-auto mb-3 text-yellow-400"
              size={36}
            />

            <h2 className="text-5xl font-bold text-white">
              300+
            </h2>

            <p className="text-gray-400 mt-2">
              Winners
            </p>
          </div>

          {/* Photos */}
          <div className="border-l border-yellow-500/10">
            <Camera
              className="mx-auto mb-3 text-yellow-400"
              size={36}
            />

            <h2 className="text-5xl font-bold text-white">
              5000+
            </h2>

            <p className="text-gray-400 mt-2">
              Photos Captured
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}