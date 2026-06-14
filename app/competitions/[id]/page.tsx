import { supabase } from "../../lib/supabase";

export default async function CompetitionDetails({
  params,
}: {
  params: { id: string };
}) {
  const { data: competition } = await supabase
    .from("competitions")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!competition) {
    return <div>Competition Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <img
        src={competition.image_url}
        alt={competition.title}
        className="w-full h-[400px] object-cover rounded-3xl"
      />

      <h1 className="text-5xl font-bold mt-8">
        {competition.title}
      </h1>

      <p className="text-yellow-400 text-2xl mt-4">
        Prize Pool: ₹{competition.prize_pool}
      </p>

      <p className="text-gray-300 mt-2">
        Deadline: {competition.deadline}
      </p>

      <p className="text-gray-300 mt-6">
        {competition.description}
      </p>

      <button className="mt-8 px-8 py-4 bg-yellow-400 text-black rounded-full font-bold">
        Register Now →
      </button>
    </div>
  );
}