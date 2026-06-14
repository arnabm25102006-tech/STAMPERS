export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500/20 py-12 px-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-yellow-400">
              STAMPERS
            </h2>

            <p className="text-gray-400 mt-4">
              Capture. Create. Celebrate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Competitions</li>
              <li>Gallery</li>
              <li>Winners</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Company
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Community
            </h3>
<div className="flex flex-col gap-3">
            <a
              href="https://chat.whatsapp.com/DrNbGCRABjbAGoHI15Ftad"
              target="_blank"
              className="inline-block px-3 py-2 rounded-full bg-yellow-400 text-black font-bold"
            >
              Join WhatsApp →
            </a>
            
            <a
              href="https://www.linkedin.com/company/stampers/?viewAsMember=true"
              target="_blank"
              className="inline-block px-3 py-2 rounded-full bg-yellow-400 text-black font-bold"
            >
              Join Linkedln →
            </a>
            <div className="mt-6">
  <p className="text-white font-semibold mb-4">
    Contact Us
  </p>

  <a
    href="mailto:stampersorg@gmail.com"
    className="text-yellow-400 font-semibold hover:text-yellow-300 transition"
  >
    stampersorg@gmail.com
  </a>
</div>
          </div>

        </div>
        </div>

        <div className="border-t border-yellow-500/10 mt-10 pt-6 text-center text-gray-500">
          © 2026 STAMPERS. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}