"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);
  

  async function uploadImage() {
    try {
      if (!file) {
        alert("Select an image first");
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

     const { data: payment } = await supabase
  .from("payments")
  .select("*")
  .eq("user_id", user.id)
  .eq("competition_id",1)
  .eq("status", "approved")
  .limit(1);

      if (!payment || payment.length === 0) {
        alert("Payment not approved yet.");
        setLoading(false);
        return;
      }

      const fileName = `${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } =
        await supabase.storage
          .from("submissions")
          .upload(fileName, file);

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }


      const { error: dbError } = await supabase
        .from("submissions")
        .insert([
          {
            user_id: user.id,
            competition_id:1,
            image_url: uploadData.path,
          },
        ]);

      if (dbError) {
        alert(dbError.message);
        setLoading(false);
        return;
      }

      alert("Submission Uploaded Successfully!");

      setFile(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Unexpected Error");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">

        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/20 blur-[180px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px]" />
          <div className="absolute top-20 left-0 w-[350px] h-[350px] bg-pink-500/10 blur-[160px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-12">

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
            Upload Submission
          </h1>

          <p className="text-zinc-400 mt-4 max-w-2xl text-lg">
            Submit your best creative work and compete with
            talented creators across India.
          </p>

        </div>

      </section>

      {/* Upload Card */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left */}
          <div className="bg-zinc-950/70 border border-zinc-800 rounded-[32px] p-8">

            <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-4">
              Requirements
            </p>

            <h2 className="text-3xl font-bold mb-6">
              Before You Upload
            </h2>

            <ul className="space-y-4 text-zinc-400">
              <li>• Payment must be approved</li>
              <li>• Upload high quality images</li>
              <li>• JPG, JPEG or PNG format</li>
              <li>• Original work only</li>
              <li>• One submission per competition</li>
            </ul>

          </div>

          {/* Right */}
          <div className="group bg-zinc-950/70 border border-zinc-800 rounded-[32px] p-8 transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/40">

            <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-4">
              Submission
            </p>

            <h2 className="text-3xl font-bold mb-6">
              Choose File
            </h2>

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
                  Click to Upload
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

            {previewUrl && (
              <div className="mt-6 overflow-hidden rounded-3xl border border-zinc-800">
                <img
                  src={previewUrl}
                  alt="Submission preview"
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            <button
              onClick={uploadImage}
              disabled={loading}
              className="w-full mt-6 py-4 rounded-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-90 transition-all"
            >
              {loading
                ? "Uploading..."
                : "Upload Submission"}
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}