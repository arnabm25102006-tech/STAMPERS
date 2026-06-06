"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    setUser(user);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-20">

        <p className="uppercase tracking-[0.35em] text-purple-400 text-xs mb-4">
          STAMPERS
        </p>

        <h1 className="text-5xl font-black mb-10">
          My Profile
        </h1>

        <div className="bg-zinc-950/70 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-8">

          

          

         <div className="mb-10">

  <p className="text-zinc-500 text-sm mb-2">
    Full Name
  </p>

  <h2 className="text-2xl font-bold mb-6">
    {user?.user_metadata?.full_name || "No Name"}
  </h2>

  <p className="text-zinc-500 text-sm mb-2">
    Email Address
  </p>

  <h3 className="text-xl font-semibold">
    {user?.email}
  </h3>

</div>

          <button
            onClick={logout}
            className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-500 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </main>
  );
}