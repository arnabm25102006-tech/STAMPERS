"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function PaymentPage() {
  const [utr, setUtr] = useState("");
  return (
    <div
      className="min-h-screen flex justify-center items-start pt-80 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/website-assets/pay.jpg')",
      }}
    >
     <div className="w-full max-w-xl h-fit bg-black/70 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-white text-center mb-6">
          Payment
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Complete your registration payment
        </p>

       <div className="bg-white rounded-xl p-3 mb-4 flex justify-center">
  <img
    src="https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/website-assets/ment.jpg"
    alt="Payment QR"
    className="w-40 h-40 object-contain mx-auto"
  />
</div>

       <p className="text-center text-yellow-400 font-bold text-lg mb-6">
  UPI ID: 9749876106@ybl
</p>

<input
  type="text"
  placeholder="Enter UTR / Transaction ID"
  value={utr}
  onChange={(e) => setUtr(e.target.value)}
  className="w-full p-4 rounded-xl bg-black/40 border border-yellow-500/20 text-white mb-4"
/>

<button
  onClick={async () => {
    if (!utr) {
      alert("Please enter UTR number");
      return;
    }

    const { data, error } = await supabase
  .from("payments")
  .insert({
  competition_id: 1,
  amount: 299,
  status: "pending",
  utr: utr,
})
  .select();

console.log("DATA:", data);
console.log("ERROR:", error);

if (error) {
  alert(error.message);
  return;
}
window.location.href = "/success";

  }}
  className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold"
>
  Complete Registration →
</button>
      </div>
    </div>
  );
}