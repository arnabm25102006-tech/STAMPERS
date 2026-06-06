"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
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
    loadSubmissions();
    setLoading(false);
  }

  async function loadSubmissions() {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setSubmissions(data || []);
  }

  async function selectWinner(submissionId: number) {
    const { error } = await supabase
      .from("winners")
      .insert([
        {
          competition_id: 1,
          submission_id: submissionId,
          position: "Winner",
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Winner Selected!");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1>Checking Access...</h1>
      </main>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        submissions.map((submission) => (
          <div
            key={submission.id}
            className="border border-zinc-700 rounded-xl p-6 mb-6"
          >
            <p className="mb-2">
              User ID: {submission.user_id}
            </p>

            <p className="mb-2">
              Competition ID: {submission.competition_id}
            </p>

            <p className="mb-4 text-zinc-400">
              {new Date(submission.created_at).toLocaleString()}
            </p>

            <img
              src={`https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/submissions/${submission.image_url}`}
              alt="Submission"
              className="w-full max-w-md rounded-lg border border-zinc-700"
            />

            <button
              onClick={() => selectWinner(submission.id)}
              className="bg-green-600 px-4 py-2 rounded mt-4"
            >
              Mark as Winner
            </button>
          </div>
        ))
      )}
    </main>
  );
}