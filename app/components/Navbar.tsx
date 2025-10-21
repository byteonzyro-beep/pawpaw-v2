"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface NavbarProps {
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ muted, setMuted }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // 🌸 Smooth scroll handler
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // 🌈 Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🩷 ScrollSpy (highlight active menu)
  useEffect(() => {
    const sectionIds = ["hero", "about", "gallery", "community"];

    const onScroll = () => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-lg bg-white/10 shadow-[0_0_25px_rgba(255,128,200,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-3 gap-2">
        {/* === LOGO & TITLE === */}
        <button
          onClick={() => handleScrollTo("hero")}
          className="flex items-center gap-4 group relative"
        >
          <div
            className="relative w-16 h-16 flex items-center justify-center rounded-full
                       bg-gradient-to-br from-white via-[#ffeaf5] to-[#ffd6ec]
                       shadow-[0_0_25px_rgba(255,180,240,0.6)]
                       hover:shadow-[0_0_40px_rgba(255,200,250,0.9)]
                       transition-all duration-500 ease-in-out overflow-hidden border border-white/40"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/50 backdrop-blur-md">
              <Image
                src="/images/kakiemas.png"
                alt="PAWPAW Logo"
                fill
                className="object-contain drop-shadow-[0_0_10px_rgba(255,160,220,0.8)]
                           hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          <div
            className="relative px-6 py-2 rounded-full bg-white
                       shadow-[0_0_25px_rgba(255,190,230,0.4)]
                       hover:shadow-[0_0_40px_rgba(255,180,240,0.7)]
                       hover:scale-105 transition-all duration-400 ease-in-out
                       border border-white/60 backdrop-blur-md"
          >
            <span
              className="text-2xl font-extrabold tracking-wider uppercase
                         bg-gradient-to-b from-[#fff5cc] via-[#ffd700] to-[#ffb6d9]
                         bg-clip-text text-transparent
                         drop-shadow-[0_1px_3px_rgba(255,190,120,0.8)]
                         animate-pawpaw-breath"
            >
              PAWPAW
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-40 animate-shimmer rounded-full pointer-events-none"></span>
          </div>
        </button>

        {/* === MENU ITEMS === */}
        <div className="hidden md:flex gap-4">
          {["Home", "About", "Gallery", "Community"].map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <button
                key={item}
                onClick={() => handleScrollTo(id)}
                className={`relative px-5 py-2 rounded-full font-semibold text-sm
                            bg-gradient-to-r from-white via-[#fff5fb] to-[#ffeaf5]
                            shadow-[0_0_25px_rgba(255,190,230,0.4)]
                            hover:shadow-[0_0_35px_rgba(255,180,240,0.6)]
                            hover:scale-105 transition-all duration-400 ease-in-out
                            backdrop-blur-md border border-white/50 overflow-hidden
                            ${
                              isActive
                                ? "scale-105 shadow-[0_0_35px_rgba(255,160,240,0.9)] border-pink-300"
                                : ""
                            }`}
              >
                <span
                  className={`relative z-10 text-[0.9rem] font-extrabold tracking-wider uppercase
                             bg-gradient-to-b from-[#fff5cc] via-[#ffd700] to-[#ffb6d9]
                             bg-clip-text text-transparent drop-shadow-[0_1px_3px_rgba(255,190,120,0.8)]
                             animate-pawpaw-breath ${
                               isActive ? "opacity-100" : "opacity-90"
                             }`}
                >
                  {item}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-30 animate-shimmer rounded-full pointer-events-none"></span>
              </button>
            );
          })}
        </div>

        {/* === ACTION BUTTONS === */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* 🎵 Musik Toggle */}
          <button
            onClick={() => setMuted(!muted)}
            className="relative px-8 py-3 rounded-full cursor-pointer
                       bg-gradient-to-r from-[#fff6cc] via-[#ffd6f0] to-[#ffbde0]
                       border border-[#ffe6b0] shadow-[0_0_25px_rgba(255,210,200,0.6)]
                       hover:scale-105 hover:shadow-[0_0_45px_rgba(255,180,230,0.8)]
                       transition-all duration-500 ease-in-out overflow-hidden"
          >
            {muted ? "🩷" : "🎵 "}
          </button>

      {/* 💖 BUY PAWPAW BUTTON — styled like menu items */}
<a
  href="https://pump.fun/coin/21vAPnJ8jm2QEro7Qw28JuDENL2t9iAk5D1kTRDzpump"
  target="_blank"
  className="relative px-8 py-3 rounded-full font-semibold text-sm
             bg-gradient-to-r from-white via-[#fff5fb] to-[#ffeaf5]
             shadow-[0_0_25px_rgba(255,190,230,0.4)]
             hover:shadow-[0_0_35px_rgba(255,180,240,0.6)]
             hover:scale-105 transition-all duration-400 ease-in-out
             backdrop-blur-md border border-white/50 overflow-hidden"
>
  {/* ✨ Text mirip menu item — Pink ke Gold shimmer */}
  <span
    className="relative z-10 text-[3 rem] font-extrabold tracking-wider uppercase
               bg-gradient-to-b from-[#fff5cc] via-[#ffd700] to-[#ffb6d9]
               bg-clip-text text-transparent drop-shadow-[0_1px_3px_rgba(255,190,120,0.8)]
               animate-pawpaw-breath"
  >
    BUY
  </span>

  {/* 🌟 shimmer lembut di atas tombol */}
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-30 animate-shimmer rounded-full pointer-events-none"></span>
</a>

         {/* 🩷 Info teks bawah tombol — dengan panel putih elegan */}
<div className="hidden md:flex items-center justify-center mt-2">
  <div
    className="px-6 py-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 
               shadow-[0_0_20px_rgba(255,180,240,0.4)] 
               hover:shadow-[0_0_35px_rgba(255,200,250,0.6)] 
               transition-all duration-500 ease-in-out"
  >
    <p
      className="text-sm font-extrabold tracking-wider uppercase
                 bg-gradient-to-b from-[#fff5cc] via-[#ffd700] to-[#ffb6d9]
                 bg-clip-text text-transparent
                 drop-shadow-[0_1px_3px_rgba(255,190,120,0.8)]
                 animate-pawpaw-breath"
    >
      ✨ FLIP CARD 🐾
    </p>
  </div>
</div>
        </div>
      </div>
    </nav>
  );
}
