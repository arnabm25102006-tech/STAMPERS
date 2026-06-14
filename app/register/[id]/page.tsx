"use client";
import { supabase } from "@/app/lib/supabase";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}
  return (
    <div
  className="min-h-screen flex items-center justify-center pt-56 pb-20 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/website-assets/reg.jpg')",
  backgroundPosition: "center 25%",
  }}
>
      <div className="w-full max-w-2xl bg-black/70 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-6">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Competition Registration
        </h1>
        <button
  onClick={signInWithGoogle}
className="w-full py-4 mb-4 rounded-xl bg-white text-black font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
>
 <div className="flex items-center justify-center gap-3">
  <img
    src="https://www.google.com/favicon.ico"
    alt="Google"
    className="w-5 h-5"
  />
  <span>Continue with Google</span>
</div>
</button>

        <div className="space-y-3">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-yellow-500/20 text-white"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-yellow-500/20 text-white"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-yellow-500/20 text-white"
          />

         <button
  onClick={() => window.location.href = "/payment/5"}
  className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold"
>
  Proceed To Payment →
</button>

        </div>

      </div>
    </div>
  );
}