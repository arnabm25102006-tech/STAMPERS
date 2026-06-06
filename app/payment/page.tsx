"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function PaymentPage() {
  const [transactionId, setTransactionId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
const [competitionId, setCompetitionId] = useState<number | null>(null);

  useEffect(() => {
  const id = searchParams.get("competition");

  if (id) {
    setCompetitionId(Number(id));
  }
}, [searchParams]);
async function submitPayment() {
    try {
      if (!transactionId.trim()) {
        alert("Enter Transaction ID");
        return;
      }

      if (!file) {
        alert("Upload payment screenshot");
        return;
      }

      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("payment-proofs")
        .upload(fileName, file);

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      if (!competitionId) {
  alert("Competition not found");
  setLoading(false);
  return;
}
const { error } = await supabase
        .from("payments")
        .insert([
          {
            user_id: user.id,
            competition_id: competitionId,
            amount: 99,
            transaction_id: transactionId,
            screenshot_url: fileName,
            status: "pending",
          },
        ]);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      alert("Payment submitted successfully!");

      setTransactionId("");
      setFile(null);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-zinc-800">

        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/20 blur-[180px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px]" />
          <div className="absolute top-20 left-0 w-[350px] h-[350px] bg-pink-500/10 blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-8">

          <a
            href="/"
            className="inline-flex px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-950/50 backdrop-blur-xl mb-8"
          >
            Back Home
          </a>

          <p className="uppercase tracking-[0.35em] text-zinc-500 text-xs mb-3">
            STAMPERS
          </p>

          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Complete Payment
          </h1>

          <p className="text-zinc-400 mt-4 max-w-2xl text-lg">
            Secure your participation by submitting your payment
            details and payment proof.
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-2 gap-6">

          {/* PAYMENT DETAILS */}
          <div className="bg-zinc-950/70 border border-zinc-800 rounded-[32px] p-6">

            <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-4">
              Payment Information
            </p>

            <h2 className="text-5xl font-bold mb-8">
              Competition Entry
            </h2>

            <div className="space-y-8">

             <div>

 <div className="flex flex-col md:flex-row gap-8 items-start">

  <div>
    <p className="text-zinc-400 mb-4">
      Scan & Pay
    </p>

   <img
  src="https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/assets/payment-qr.png.png"
  alt="Payment QR"
  className="w-56 h-56 rounded-2xl bg-white p-2"
/>
  </div>

  <div className="flex-1">

    <p className="text-zinc-500 text-sm mb-2">
      UPI ID
    </p>

    <p className="text-xl font-semibold mb-8">
      9749876106@ybl
    </p>

    <p className="text-zinc-500 text-sm mb-2">
      Entry Fee
    </p>

    <h3 className="text-5xl font-black mb-8">
      ₹10
    </h3>

    <p className="text-zinc-500 text-sm mb-3">
      Approval Status
    </p>

    <span className="px-5 py-2 rounded-full bg-yellow-500/20 text-yellow-400 font-medium">
      Pending Verification
    </span>

  </div>

</div>

            </div>

          </div>
          </div>

          {/* SUBMIT PAYMENT */}
          <div className="bg-zinc-950/70 border border-zinc-800 rounded-[32px] p-6">

            <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-4">
              Submit Payment
            </p>

            <h2 className="text-3xl font-bold mb-8">
              Upload Proof
            </h2>

            <input
              type="text"
              placeholder="Transaction ID"
              value={transactionId}
              onChange={(e) =>
                setTransactionId(e.target.value)
              }
              className="w-full p-4 mb-6 bg-zinc-900 border border-zinc-700 rounded-2xl outline-none focus:border-purple-500"
            />

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-3xl p-10 cursor-pointer hover:border-purple-500 transition-all duration-300">

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
              />

              <div className="text-center">

                <p className="text-lg font-medium mb-2">
                  Upload Payment Screenshot
                </p>

                <p className="text-zinc-500 text-sm">
                  JPG, JPEG or PNG
                </p>

              </div>

            </label>

            {file && (

              <div className="mt-6 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">

                <p className="font-medium">
                  {file.name}
                </p>

                <p className="text-zinc-500 text-sm mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            )}

            <button
              onClick={submitPayment}
              disabled={loading}
              className="w-full mt-6 py-4 rounded-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-90 transition-all duration-300"
            >
              {loading
                ? "Submitting..."
                : "Submit Payment"}
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}