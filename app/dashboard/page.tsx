"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function DashboardPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    loadRegistrations();
  }, []);

  async function loadRegistrations() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    setRegistrations(data || []);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        My Dashboard
      </h1>

      {registrations.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        registrations.map((reg) => (
          <div
            key={reg.id}
            className="border border-zinc-700 rounded-xl p-6 mb-4"
          >
            Competition ID: {reg.competition_id}
          </div>
        ))
      )}
    </main>
  );
}