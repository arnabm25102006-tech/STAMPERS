"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Competitions() {
 const [competitions, setCompetitions] = useState<any[]>([]);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  async function fetchCompetitions() {
    const { data, error } = await supabase
      .from("competitions")
      .select("*");

    if (!error) setCompetitions(data);
  }

  return (
  <section
  style={{
  backgroundImage: "url('https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/website-assets/wid.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
}}
   
    
  >
   <div className="min-h-screen px-10 pt-[350px] pb-20">
<div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-10">
      {competitions.map((comp: any) => (
        <div
          key={comp.id}
        className="bg-black/40 border border-yellow-500/20 rounded-3xl overflow-hidden"
        >
         <img
  src={comp.image_url}
  alt={comp.title}
  className="h-40 w-full object-cover"
  onError={(e) => console.log("Image failed:", comp.image_url)}
/>

          <div className="p-4">
            <h2 className="text-xl font-bold text-white">
              {comp.title}
            </h2>

          <p className="text-yellow-400 font-bold">
  Prize Pool: ₹{comp.prize_pool}
</p>

            <p className="text-gray-400">
              Deadline: {comp.deadline}
            </p>

           <a
  href={`/register/${comp.id}`}
  className="mt-4 block text-center w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold text-xl hover:scale-105 transition-all duration-300"
>
  Join Competition →
</a>
          </div>
        </div>
      ))}
         </div>
    </div>
  </section>
);
}