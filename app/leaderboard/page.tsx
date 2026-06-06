"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function LeaderboardPage() {
  const [winners, setWinners] = useState<any[]>([]);

  useEffect(() => {
    loadWinners();
  }, []);

  async function loadWinners() {
    const { data, error } = await supabase
      .from("winners")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setWinners(data || []);
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">

        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[200px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px]" />
          <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-[180px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 pt-10 pb-6">

          <a
            href="/"
            className="inline-flex px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-950/50 backdrop-blur-xl mb-10"
          >
            Back Home
          </a>

         <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-200 to-purple-300 bg-clip-text text-transparent">
  STAMPERS
</h2>

          <h1 className="text-3xl md:text-4xl font-black leading-tight bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Leaderboard
          </h1>

          <p className="text-zinc-400 mt-4 max-w-xl">
            Discover the top-performing creators, designers,
            photographers and innovators on Stampers.
          </p>

        </div>
      </section>

     
      {/* LEADERBOARD */}

<section className="max-w-6xl mx-auto px-6 py-10">

  <div className="mb-6">

    <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-3">
      Rankings
    </p>

    <h2 className="text-3xl md:text-4xl font-bold">
      Current Champions
    </h2>

  </div>

  {winners.length === 0 ? (

    <div className="border border-zinc-800 rounded-3xl p-12 bg-zinc-950/50 text-center">

      <h3 className="text-2xl font-bold mb-3">
        No Winners Yet
      </h3>

      <p className="text-zinc-500">
        Winners will appear here after competitions are completed.
      </p>

    </div>

  ) : (

    <div className="space-y-5">

      {winners.map((winner, index) => (

        <div
          key={winner.id}
          className="group bg-zinc-950/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 hover:border-purple-500/40 transition-all duration-300"
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-5">

  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center text-xl font-bold">
    {index + 1}
  </div>

  <div>

    <h3 className="text-2xl font-bold">
      {winner.position}
    </h3>

    <p className="text-zinc-400">
      Competition #{winner.competition_id}
    </p>

  </div>

</div>

            <div className="text-right">

              <p className="text-zinc-500 text-sm">
                Submission
              </p>

              <p className="font-semibold text-lg">
                #{winner.submission_id}
              </p>

            </div>

          </div>

        </div>

      ))}

    </div>

  )}

</section>

      {/* All Winners */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-20">

        <div className="mb-10">

          <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs mb-4">
            Archive
          </p>

          <h2 className="text-4xl font-bold">
            All Winners
          </h2>

        </div>

        {winners.length === 0 ? (

          <div className="border border-zinc-800 rounded-[32px] p-16 bg-zinc-950/50 text-center">
            <h3 className="text-3xl font-bold mb-4">
              No Winners Yet
            </h3>

            <p className="text-zinc-500">
              Winners will appear here once competitions are completed.
            </p>
          </div>

        ) : (

          <div className="space-y-6">

            {winners.map((winner, index) => (

              <div
                key={winner.id}
                className="bg-zinc-950/60 backdrop-blur-xl border border-zinc-800 rounded-[28px] p-6 hover:border-purple-500/50 transition-all duration-300"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  <div className="flex items-center gap-6">

                    <div className="text-3xl font-black text-zinc-500">
                      #{index + 1}
                    </div>

                    <div>

                      <h3 className="text-2xl font-bold">
                        {winner.position}
                      </h3>

                      <p className="text-zinc-400 mt-1">
                        Competition #{winner.competition_id}
                      </p>

                    </div>

                  </div>

                  <div className="text-left md:text-right">

                    <p className="text-zinc-500 text-sm">
                      Submission ID
                    </p>

                    <p className="font-semibold">
                      #{winner.submission_id}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}