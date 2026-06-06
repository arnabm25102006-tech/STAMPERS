"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function CompetitionPage() {
  const params = useParams();
  const id = params.id;

  const [competition, setCompetition] = useState<any>(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (id) {
      loadCompetition();
      checkRegistration();
    }
  }, [id]);

  async function loadCompetition() {
    const { data, error } = await supabase
      .from("competitions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setCompetition(data);
  }

  async function checkRegistration() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("registrations")
      .select("*")
      .eq("user_id", user.id)
      .eq("competition_id", id);

    if (data && data.length > 0) {
      setRegistered(true);
    }
  }

  async function registerForCompetition() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }

  const { error } = await supabase
    .from("registrations")
    .insert([
      {
        user_id: user.id,
        competition_id: competition.id,
      },
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  setRegistered(true);

  window.location.href = `/payment?competition=${competition.id}`;
}

  if (!competition) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-3xl break-words bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"></h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* HERO */}
<section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
  {competition.image_url ? (
    <img
      src={`https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/competition-images/${competition.image_url}`}
      alt={competition.title}
      className="absolute inset-0 w-full h-full object-cover scale-105"
    />
  ) : (
    <div className="absolute inset-0 bg-zinc-900" />
  )}

  <div className="absolute inset-0 bg-black/70" />
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

  {/* Premium Glow */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[200px]" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px]" />
    <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-[180px]" />
  </div>

  <div className="absolute top-6 left-6 z-20">
    <a
      href="/"
     className="bg-white text-black px-10 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition-all duration-300"
    >
      ← Back
    </a>
  </div>

 <div className="absolute bottom-32 md:bottom-40 left-0 right-0 z-20">
    <div className="max-w-7xl mx-auto px-6 md:px-8">

      <div className="inline-flex px-4 py-2 rounded-full border border-zinc-700 bg-black/40 backdrop-blur-xl mb-6">
        <p className="uppercase tracking-[0.25em] text-zinc-300 text-xs">
          {competition.category}
        </p>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        {competition.title}
      </h1>

    </div>
  </div>

</section>

      {/* FLOATING CARD */}
      <section className="-mt-12 relative z-30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800 rounded-[36px] p-8 shadow-2xl">

            <div className="grid md:grid-cols-4 gap-8">

              <div>
                <p className="text-zinc-500 text-sm mb-2">
                  Entry Fee
                </p>

                <h3 className="text-4xl font-bold">
                  ₹{competition.entry_fee}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500 text-sm mb-2">
                  Prize Pool
                </p>

                <h3 className="text-4xl font-bold">
                  ₹{competition.prize_pool}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500 text-sm mb-2">
                  Deadline
                </p>

                <h3 className="text-xl font-semibold">
                  {competition.deadline}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500 text-sm mb-2">
                  Status
                </p>

                <h3 className="text-xl font-semibold text-green-500">
                  Open
                </h3>
              </div>

            </div>

            <div className="border-t border-zinc-800 mt-8 pt-8">

              {registered ? (
                <button
                  disabled
                  className="bg-green-600 px-10 py-4 rounded-2xl text-lg font-medium"
                >
                  Registered
                </button>
              ) : (
                <button
                  onClick={registerForCompetition}
                  className="bg-white text-black px-10 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                  Register For Competition
                </button>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          <div className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-8 hover:border-zinc-600 transition-all duration-300">

            <p className="uppercase tracking-[0.25em] text-zinc-500 text-xs mb-3">
              Overview
            </p>

            <h2 className="text-3xl font-bold mb-6">
              Description
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              {competition.description || "No description available."}
            </p>

          </div>

          <div className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-8 hover:border-zinc-600 transition-all duration-300">

            <p className="uppercase tracking-[0.25em] text-zinc-500 text-xs mb-3">
              Creative Direction
            </p>

            <h2 className="text-3xl font-bold mb-6">
              Theme
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              {competition.theme || "No theme specified."}
            </p>

          </div>

        </div>

        <div className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-10 hover:border-zinc-600 transition-all duration-300">

          <p className="uppercase tracking-[0.25em] text-zinc-500 text-xs mb-3">
            Requirements
          </p>

          <h2 className="text-3xl font-bold mb-8">
            Rules & Guidelines
          </h2>

          <p className="text-zinc-400 whitespace-pre-line leading-9 text-lg">
            {competition.rules || "No rules available."}
          </p>

        </div>

      </section>
    </main>
  );
}