"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function WinnerShowcase() {
  const [winners, setWinners] = useState<any[]>([]);

  useEffect(() => {
    loadWinners();
  }, []);

  async function loadWinners() {
    const { data: winnerData, error } = await supabase
      .from("winners")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    const enriched = await Promise.all(
      (winnerData || []).map(async (winner) => {
        const { data: submission } = await supabase
          .from("submissions")
          .select("*")
          .eq("id", winner.submission_id)
          .single();

        const { data: competition } = await supabase
          .from("competitions")
          .select("*")
          .eq("id", winner.competition_id)
          .single();

        return {
          ...winner,
          submission,
          competition,
        };
      })
    );

    setWinners(enriched);
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-32">
      <h2 className="text-5xl font-bold mb-12">
        Winner Showcase
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {winners.map((winner) => (
          <div
            key={winner.id}
            className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden"
          >
            <img
              src={`https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/submissions/${winner.submission?.image_url}`}
              alt="Winner"
              className="w-full h-72 object-cover"
            />

            <div className="p-6">
              <p className="text-zinc-500 text-sm mb-2">
                {winner.position}
              </p>

              <h3 className="text-2xl font-semibold">
                {winner.competition?.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}