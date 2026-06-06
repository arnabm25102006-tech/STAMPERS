"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function CreateCompetition() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [rules, setRules] = useState("");
  const [image, setImage] = useState<File | null>(null);

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
  }

  async function createCompetition() {
    try {
      let imageUrl = "";

      if (image) {
        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("competition-images")
          .upload(fileName, image);

        if (uploadError) {
          alert(uploadError.message);
          return;
        }

        imageUrl = fileName;
      }

      const { error } = await supabase
        .from("competitions")
        .insert([
          {
            title,
            category,
            entry_fee: Number(entryFee),
            prize_pool: Number(prizePool),
            deadline,
            description,
            theme,
            rules,
            image_url: imageUrl,
          },
        ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Competition Created Successfully!");

      setTitle("");
      setCategory("");
      setEntryFee("");
      setPrizePool("");
      setDeadline("");
      setDescription("");
      setTheme("");
      setRules("");
      setImage(null);
    } catch (err) {
      console.log(err);
      alert("Unexpected Error");
    }
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
    <main className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          Create Competition
        </h1>

        <p className="text-zinc-500 mb-10">
          Launch a new competition on STAMPERS
        </p>

        <div className="space-y-5">

          <input
            placeholder="Competition Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl"
          />

          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl"
          />

          <div className="grid md:grid-cols-2 gap-5">
            <input
              placeholder="Entry Fee"
              value={entryFee}
              onChange={(e) => setEntryFee(e.target.value)}
              className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl"
            />

            <input
              placeholder="Prize Pool"
              value={prizePool}
              onChange={(e) => setPrizePool(e.target.value)}
              className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl"
            />
          </div>

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl"
          />

          <textarea
            placeholder="Competition Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl"
          />

          <textarea
            placeholder="Competition Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            rows={4}
            className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl"
          />

          <textarea
            placeholder="Rules & Guidelines"
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            rows={8}
            className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl"
          />

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
            <p className="mb-3 text-zinc-400">
              Competition Banner Image
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
            />
          </div>

          <button
            onClick={createCompetition}
            className="w-full bg-white text-black py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition"
          >
            Create Competition
          </button>

        </div>
      </div>
    </main>
  );
}