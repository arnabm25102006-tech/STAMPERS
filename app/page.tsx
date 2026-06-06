"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

import Hero from "./components/Hero";
import WhyStampers from "./components/WhyStampers";
import WinnerShowcase from "./components/WinnerShowcase";
import FeaturedCompetition from "./components/FeaturedCompetition";

export default function Home() {
  const [competitions, setCompetitions] = useState<any[]>([]);

  useEffect(() => {
    loadCompetitions();
  }, []);

  async function loadCompetitions() {
    const { data, error } = await supabase
      .from("competitions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setCompetitions(data || []);
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

          <h1 className="text-3xl font-black tracking-tight">
            STAMPERS
          </h1>

          <div className="flex items-center gap-8 text-sm">
<a href="/login"className="hover:text-purple-400 transition">Login</a>
<a href="/signup"className="hover:text-purple-400 transition">Sign Up</a>
<a href="/profile"className="hover:text-purple-400 transition">Profile</a>
<a href="#competitions"
 className="hover:text-purple-400 transition"
 >Competitions</a>

            <a
              href="/leaderboard"
              className="hover:text-purple-400 transition"
            >
              Leaderboard
            </a>

            <a
              href="/my-submissions"
              className="hover:text-purple-400 transition"
            >
              My Submissions
            </a>

            <a
              href="/upload"
              className="hover:text-purple-400 transition"
            >
              Upload
            </a>
            <a href="/payment" className="hover:text-purple-400 transition">Payment</a>

          </div>

        </div>
      </nav>

      {/* HERO */}
      <Hero />

      {/* FEATURED COMPETITION */}
      <FeaturedCompetition />

      {/* COMPETITIONS */}
      <section
        id="competitions"
        className="max-w-7xl mx-auto px-8 py-24"
      >

        <div className="mb-16">

          <p className="text-purple-400 uppercase tracking-[0.35em] text-xs mb-4">
            Live Competitions
          </p>

          <h2 className="text-6xl font-bold">
            Featured Challenges
          </h2>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {competitions.map((competition) => (
            <div
              key={competition.id}
              className="group bg-zinc-950 border border-zinc-800 rounded-[32px] overflow-hidden hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] hover:-translate-y-2 transition-all duration-300"
            >

              {competition.image_url && (
                <img
                  src={`https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/competition-images/${competition.image_url}`}
                  alt={competition.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                />
              )}

              <div className="p-8">

                <div className="flex justify-between items-center mb-4">

                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                    {competition.category}
                  </span>

                  <span className="text-zinc-500">
                    ₹{competition.prize_pool}
                  </span>

                </div>

                <h3 className="text-3xl font-bold mb-4">
                  {competition.title}
                </h3>

                <p className="text-zinc-400 mb-6 line-clamp-2">
                  {competition.description}
                </p>

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-zinc-500 text-sm">
                      Entry Fee
                    </p>

                    <p className="font-semibold">
                      ₹{competition.entry_fee}
                    </p>
                  </div>

                  <a
                    href={`/competition/${competition.id}`}
                    className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
                  >
                    Explore →
                  </a>

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* WHY STAMPERS */}
      <WhyStampers />

      {/* WINNERS */}
      <WinnerShowcase />

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-8 py-32">

        <div className="relative overflow-hidden rounded-[40px] border border-zinc-800 p-16">

          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20" />

          <div className="relative">

            <p className="text-purple-400 uppercase tracking-[0.3em] text-xs mb-4">
              Join STAMPERS
            </p>

            <h2 className="text-6xl font-bold mb-6">
              Showcase your talent.
              <br />
              Get recognized.
            </h2>

            <p className="text-zinc-400 text-xl max-w-2xl mb-10">
              Participate in competitions, build your portfolio,
              compete with talented creators and win recognition
              for your work.
            </p>

            <a
              href="#competitions"
              className="inline-flex px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold"
            >
              Explore Competitions
            </a>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800">

        <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between gap-10">

          <div>

            <h2 className="text-3xl font-bold mb-3">
              STAMPERS
            </h2>

            <p className="text-zinc-500 max-w-md">
              India's platform for student competitions,
              creativity, innovation and recognition.
            </p>

          </div>

          <div className="text-zinc-500">
            © 2026 STAMPERS. All Rights Reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}