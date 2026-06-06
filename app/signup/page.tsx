"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signup() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      alert("Account created successfully!");
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function googleSignup() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000",
      },
    });
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px]" />
        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-[180px]" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-zinc-950/70 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-8">

          <p className="uppercase tracking-[0.35em] text-purple-400 text-xs mb-4">
            STAMPERS
          </p>

          <h1 className="text-4xl font-black mb-2">
            Create Account
          </h1>

          <p className="text-zinc-400 mb-8">
            Join India's creative competition platform.
          </p>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 mb-4 bg-zinc-900 border border-zinc-700 rounded-2xl focus:outline-none focus:border-purple-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 mb-4 bg-zinc-900 border border-zinc-700 rounded-2xl focus:outline-none focus:border-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 mb-6 bg-zinc-900 border border-zinc-700 rounded-2xl focus:outline-none focus:border-purple-500"
          />

          <button
            onClick={signup}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-90 transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <button
            onClick={googleSignup}
            className="w-full py-4 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
          >
            Continue with Google
          </button>

          <p className="text-center text-zinc-500 mt-8">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-400 hover:text-purple-300"
            >
              Login
            </a>
          </p>

        </div>

      </div>

    </main>
  );
}