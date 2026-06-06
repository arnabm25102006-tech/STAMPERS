"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Register() {
  const [loading, setLoading] = useState(false);

  async function joinCompetition() {
    setLoading(true);

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
          competition_id: 1,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Successfully Registered!");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="border border-zinc-700 rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">
          Photography Championship 2026
        </h1>

        <p className="text-zinc-400 mb-6">
          Entry Fee: ₹99
        </p>

        <button
          onClick={joinCompetition}
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-lg"
        >
          {loading ? "Registering..." : "Join Competition"}
        </button>
      </div>
    </main>
  );
}