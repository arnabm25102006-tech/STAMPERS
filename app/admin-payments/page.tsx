"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      window.location.href = "/";
      return;
    }

    if (user.email !== "arnabm25102006@gmail.com") {
      alert("Access Denied");
      window.location.href = "/";
      return;
    }

    setAuthorized(true);
    setLoading(false);
    loadPayments();
  }

  async function loadPayments() {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setPayments(data || []);
  }

  async function approvePayment(payment: any) {
    const { error: paymentError } = await supabase
      .from("payments")
      .update({ status: "approved" })
      .eq("id", payment.id);

    if (paymentError) {
      alert(paymentError.message);
      return;
    }

    const { error: registrationError } = await supabase
      .from("registrations")
      .insert([
        {
          user_id: payment.user_id,
          competition_id: payment.competition_id,
        },
      ]);

    if (
      registrationError &&
      !registrationError.message.includes("unique_registration")
    ) {
      alert(registrationError.message);
      return;
    }

    alert("Payment Approved & Registration Created!");
    loadPayments();
  }

  async function rejectPayment(id: number) {
    const { error } = await supabase
      .from("payments")
      .update({ status: "rejected" })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Payment Rejected!");
    loadPayments();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl">Checking Access...</h1>
      </main>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-6xl font-bold mb-10">
        Payment Verification
      </h1>

      <div className="space-y-8">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="border border-zinc-700 rounded-xl p-6"
          >
            <p>User ID: {payment.user_id}</p>
            <p>Competition ID: {payment.competition_id}</p>
            <p>Amount: ₹{payment.amount}</p>
            <p>Transaction ID: {payment.transaction_id}</p>
            <p>Status: {payment.status}</p>

            {payment.screenshot_url && (
              <img
                src={`https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/payment-proofs/${payment.screenshot_url}`}
                alt="Payment Proof"
                className="w-96 rounded-lg mt-4"
              />
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => approvePayment(payment)}
                className="bg-green-600 px-6 py-3 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => rejectPayment(payment.id)}
                className="bg-red-600 px-6 py-3 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}