"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function MySubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function loadSubmissions() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setSubmissions(data || []);
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">

        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/20 blur-[180px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px]" />
          <div className="absolute top-20 left-0 w-[350px] h-[350px] bg-pink-500/10 blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-12">

          <a
            href="/"
            className="inline-flex px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-950/50 backdrop-blur-xl mb-8"
          >
            Back Home
          </a>

          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            My Submissions
          </h1>

          <p className="text-zinc-400 mt-4 max-w-2xl text-lg">
            Track all your submitted work, monitor participation
            and build your creative portfolio on Stampers.
          </p>

        </div>

      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-3xl font-bold">
              {submissions.length}
            </h2>
            <p className="text-zinc-500 mt-2">
              Total Entries
            </p>
          </div>

          <div className="bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-3xl font-bold">
              Active
            </h2>
            <p className="text-zinc-500 mt-2">
              Status
            </p>
          </div>

          <div className="bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-3xl font-bold">
              ST
            </h2>
            <p className="text-zinc-500 mt-2">
              Creator
            </p>
          </div>

          <div className="bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-3xl font-bold">
              100%
            </h2>
            <p className="text-zinc-500 mt-2">
              Secure Storage
            </p>
          </div>

        </div>

      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-20">

        <div className="mb-10">

          <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs mb-3">
            Portfolio
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Your Creative Work
          </h2>

        </div>

        {submissions.length === 0 ? (

          <div className="border border-zinc-800 rounded-[32px] p-16 bg-zinc-950/50 text-center">

            <h3 className="text-3xl font-bold mb-4">
              No Submissions Yet
            </h3>

            <p className="text-zinc-500 mb-8">
              Start participating in competitions and build your portfolio.
            </p>

            <a
              href="/"
              className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600"
            >
              Explore Competitions
            </a>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {submissions.map((submission) => {

              const imageUrl =
                `https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/submissions/${submission.image_url}`;

              return (
                <div
                  key={submission.id}
                  className="group bg-zinc-950/70 border border-zinc-800 rounded-[32px] overflow-hidden hover:border-purple-500/40 transition-all duration-300"
                >

                  <div className="overflow-hidden">

                    <img
                      src={imageUrl}
                      alt="Submission"
                      className="w-full h-72 object-cover group-hover:scale-105 transition-all duration-500"
                    />

                  </div>

                  <div className="p-6">

                    <div className="flex items-center justify-between mb-4">

                      <span className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/20">
                        Competition #{submission.competition_id}
                      </span>

                    </div>

                    <p className="text-zinc-500 text-sm mb-4">
                      {new Date(
                        submission.created_at
                      ).toLocaleDateString()}
                    </p>

                    <p className="text-zinc-400 text-sm break-all">
                      {submission.image_url}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </section>

    </main>
  );
}