import StatsBar from "./Statsbar";
import WhyStampers from "./WhyStampers";
import Footer from "./Footer";
export default function Home()
 {
  return (
   <main className="relative w-full min-h-screen">
    <section className="relative h-screen">
  <img
    src="https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/website-assets/Zero.jpg"
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover"
    
  />
</section>

<section
  className="relative -mt-10 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://rgpywlitnyfhujhefkqy.supabase.co/storage/v1/object/public/website-assets/next.jpg')",
  }}
>
  <StatsBar />

  <div className="bg-black/40 pt-0 pb-20">
    <WhyStampers />
  </div>
</section>   
  


      {/* TRANSPARENT NAVBAR */}
<header className="absolute top-8 left-[580px] right-15 z-50 flex items-center justify-between">

  {/* Menu */}
<nav className="flex items-center gap-3 whitespace-nowrap text-white text-lg font-bold tracking-wide drop-shadow-[0_8px_10px_rgba(0,0,0,8.0)]">
  <a className="hover:text-yellow-400 transition">
    Home
  </a>

  <a href="/competitions" className="hover:text-yellow-400 transition">
    Competitions
  </a>

  <a href="/gallery" className="hover:text-yellow-400 transition">
    Gallery
  </a>

  <a href="/winners" className="hover:text-yellow-400 transition">
    Winners
  </a>

  <a href="/about" className="hover:text-yellow-400 transition whitespace-nowrap">
  About Us
</a>

  <a href="/contact" className="hover:text-yellow-400 transition">
    Contact
  </a>

</nav>

  {/* Right Side */}
  {/* Floating Login Button */}
<div className="">
 <button
  className="
    px-8
    py-3
    rounded-full
    bg-gradient-to-r
    from-yellow-300
    via-yellow-400
    to-amber-500
    text-black
    font-semibold
    text-lg
    shadow-[0_0_20px_rgba(255,200,0,0.25)]
    hover:scale-105
    transition-all
    duration-300
    self-center
  "
>
  Login / Register →
</button>
</div>
</header>
        <Footer />


    </main>
  );
}