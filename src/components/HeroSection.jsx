import React from "react";
import FlickerImage from "./FlickerImage";
import heroMegaphoneWith from "../assets/megaphone-with.png";
import heroMegaphoneWithout from "../assets/megaphone-without.png";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-[#19202A]">
      {/* Announcement Bar */}
      <div className="w-full bg-[#5c8d1b] text-white font-semibold text-center py-2 text-sm">
        India announces its highest-ever selling fee drop. Live now!
        &nbsp;|&nbsp; Exciting news: Amazon In
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 md:py-20">
        {/* Left: Text */}
        <div className="flex-1 text-left">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Announced:
            <br />
            <span className="text-4xl sm:text-5xl md:text-6xl block mt-2 font-extrabold">
              ZERO referral fee on over 1.2 crore products
            </span>
          </h2>
          <div className="text-white text-xl font-medium mb-2">
            Highest-ever seller fee reduction
          </div>
          <div className="mb-8">
            <a
              href="#"
              className="text-white font-semibold underline hover:text-[#FF9900] transition"
            >
              Know more &rarr;
            </a>
          </div>
          <button
            className="bg-[#FF9900] text-black text-lg font-bold px-8 py-3 rounded-full shadow hover:bg-[#ffb84d] transition border-4 border-white mt-4"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
        {/* Right: Flicker Image */}
        <div className="flex-1 flex justify-end mt-10 md:mt-0 max-w-[420px] w-full h-[340px] md:h-[420px] lg:h-[480px] relative">
          <FlickerImage
            withImage={heroMegaphoneWith}
            withoutImage={heroMegaphoneWithout}
            interval={1200}
          />
        </div>
      </div>
    </section>
  );
}
