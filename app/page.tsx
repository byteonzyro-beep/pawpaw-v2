"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "./components/Navbar";
import CursorPaw from "./components/CursorPaw";
import ChatWithPawpaw from "./components/ChatWithPawpaw";

export default function Home() {
  const [muted, setMuted] = useState(false);
  const [flippedHero, setFlippedHero] = useState(false);
  const [flippedAbout, setFlippedAbout] = useState(false);
  const [flips, setFlips] = useState([false, false, false, false, false, false]);

  // 🎵 Musik Fade In/Out
  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (!audio) return;
    if (muted) {
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.02) audio.volume -= 0.02;
        else {
          audio.pause();
          clearInterval(fadeOut);
        }
      }, 100);
    } else {
      audio.volume = 0;
      audio.play().catch(() => {});
      const fadeIn = setInterval(() => {
        if (audio.volume < 0.3) audio.volume += 0.02;
        else clearInterval(fadeIn);
      }, 200);
    }
  }, [muted]);

  const toggleFlip = (index: number) => {
    setFlips((prev) => prev.map((f, i) => (i === index ? !f : f)));
  };

  return (
    <main
      className="min-h-screen w-full font-sans scroll-smooth relative select-none overflow-hidden"
      style={{
        backgroundImage: "url('/pawpaw.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <audio id="bg-music" loop src="/audio/pinkvibe.mp3" />
      <Navbar muted={muted} setMuted={setMuted} />

      {/* ===================== HERO SECTION ===================== */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center min-h-screen text-center px-4"
      >
        <div
          className="ca-panel px-10 py-3 rounded-2xl backdrop-blur-xl 
          bg-gradient-to-r from-[#ffb6d9]/30 via-[#ffc3e0]/20 to-[#fff]/20 border border-white/20 
          shadow-[0_0_40px_rgba(255,180,240,0.5)] mt-20 mb-6"
        >
          <h1 className="ca-text text-4xl md:text-6xl font-extrabold tracking-wider drop-shadow-[0_0_25px_rgba(255,180,240,0.7)]">
            THE CUTEST
          </h1>
        </div>

        {/* FLIP HERO */}
        <motion.div
          className="relative z-10 w-[90%] md:w-[800px] h-[520px] cursor-none group animate-float-slow"
          style={{ perspective: "1600px" }}
          onClick={() => setFlippedHero(!flippedHero)}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 70px rgba(255,180,240,0.7)",
          }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          {/* FRONT */}
          <motion.div
            className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-[2rem] border border-white/20 
            shadow-[0_0_60px_rgba(255,128,200,0.5)] overflow-hidden flex items-center justify-center
            transition-transform ease-in-out duration-[1s]"
            animate={{ rotateY: flippedHero ? 180 : 0 }}
            transition={{ duration: 1 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src="/images/bannerpaw1.png"
              alt="Front"
              fill
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* BACK */}
          <motion.div
            className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-[2rem] border border-white/20 
            shadow-[0_0_60px_rgba(255,128,200,0.5)] overflow-hidden flex items-center justify-center rotate-y-180
            transition-transform ease-in-out duration-[1s]"
            animate={{ rotateY: flippedHero ? 0 : -180 }}
            transition={{ duration: 1 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src="/images/MASCOT1.png"
              alt="Back"
              fill
              className="object-cover w-full h-full"
            />
          </motion.div>
        </motion.div>

        {/* 💬 CHAT WITH PAWPAW SECTION */}
        <div className="mt-12 mb-12 w-full flex justify-center">
          <ChatWithPawpaw />
        </div>

        {/* CONTRACT ADDRESS */}
        <section
          id="contract"
          className="relative flex flex-col items-center justify-center text-center mt-10 mb-10"
        >
          <div
            onClick={() =>
              navigator.clipboard.writeText("0x9aC3bA0E1b2F9eCFeD2bC9f7E4D21d44fA11A234")
            }
            className="ca-panel cursor-none select-none px-10 py-4 rounded-2xl backdrop-blur-xl 
            bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(255,150,210,0.3)] 
            hover:scale-105 hover:shadow-[0_0_50px_rgba(255,180,240,0.6)] transition-all duration-300"
          >
            <h3 className="ca-text text-lg md:text-xl font-extrabold tracking-wider text-center">
              🐾 CA
            </h3>
            <p className="ca-text text-sm md:text-base font-bold tracking-widest mt-2 text-center opacity-90 select-none">
              0x9aC3bA0E1b2F9eCFeD2bC9f7E4D21d44fA11A23999
            </p>
            <p className="text-xs text-white/70 mt-1 italic">(Click to copy)</p>
          </div>
        </section>
      </section>

      {/* ===================== ABOUT SECTION ===================== */}
      <section
        id="about"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          className="relative z-10 w-[90%] md:w-[800px] h-[520px] cursor-none"
          style={{ perspective: "1600px" }}
          onClick={() => setFlippedAbout(!flippedAbout)}
        >
          {/* FRONT */}
          <motion.div
            className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-[2rem] border border-white/20 
            shadow-[0_0_60px_rgba(255,128,200,0.5)] overflow-hidden"
            animate={{ rotateY: flippedAbout ? 180 : 0 }}
            transition={{ duration: 1.8 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image src="/images/roadmap.png" alt="About Front" fill className="object-cover" />
          </motion.div>

          {/* BACK */}
          <motion.div
            className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-[2rem] border border-white/20 
            shadow-[0_0_60px_rgba(255,128,200,0.5)] overflow-hidden rotate-y-180"
            animate={{ rotateY: flippedAbout ? 0 : -180 }}
            transition={{ duration: 1.8 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image src="/images/about.png" alt="About Back" fill className="object-cover" />
          </motion.div>
        </motion.div>
        {/* === SECTION 2.5 — INFO PANEL ELEGAN (mirip Contact Address) === */}
<section
  id="pawpaw-values"
  className="relative py-16 flex flex-col items-center justify-center text-center"
>
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
    {[
      {
        title: "PAWPAW DNA",
        desc: "$PAW brings SOLANA's DNA into the meme era. Perfect symbolism: PAWPAW brings beautiful color to the world of memes . Laughter, jokes, and sweet warmth unite in the soul of $PAW.",
        icon: "🍬",
      },
      {
        title: "SOLANA BACKED",
        desc: "SOLANA holds the largest pool of $PAW, giving this memecoin institutional power that others can only dream of.",
        icon: "🐾",
      },
      {
        title: "Community-Driven",
        desc: "The community-owned token of the SOLANA ecosystem. $PAW is a meme energy with serious support.",
        icon: "🍭",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="relative rounded-3xl p-8 text-center
                   bg-white/40 border border-white/60 backdrop-blur-xl
                   shadow-[0_0_30px_rgba(255,190,240,0.5)]
                   hover:shadow-[0_0_50px_rgba(255,200,250,0.8)]
                   transition-all duration-500 ease-in-out"
      >
        {/* Ikon */}
        <div
          className="w-14 h-14 mx-auto mb-4 flex items-center justify-center text-3xl
                     rounded-full bg-gradient-to-br from-[#fff7fa] via-[#ffeaf5] to-[#ffd9eb]
                     border border-white/70 shadow-[0_0_20px_rgba(255,210,250,0.6)]"
        >
          {item.icon}
        </div>

        {/* Judul */}
        <h3
          className="text-xl font-extrabold uppercase tracking-wide mb-3
                     bg-gradient-to-b from-[#fff5cc] via-[#ffd700] to-[#ffb6d9]
                     bg-clip-text text-transparent drop-shadow-[0_1px_3px_rgba(255,190,120,0.8)]"
        >
          {item.title}
        </h3>

        {/* Deskripsi */}
        <p
          className="text-sm md:text-base font-semibold leading-relaxed
                     bg-gradient-to-b from-[#fff] via-[#ffebf6] to-[#ffe0f0]
                     bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
        >
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</section>

      </section>

      {/* ===================== GALLERY SECTION (6 Flip + Shine) ===================== */}
      <section
        id="gallery"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <div
          className="ca-panel cursor-none select-none px-8 py-3 rounded-2xl backdrop-blur-xl 
          bg-gradient-to-r from-[#ffb6d9]/30 via-[#ffc3e0]/20 to-[#fff]/20 border border-white/20 
          shadow-[0_0_40px_rgba(255,180,240,0.5)] mb-12"
        >
          <h2 className="ca-text text-2xl md:text-3xl font-extrabold tracking-wider">
            GALLERY THE CUTEST
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
          {[
            "galleryback1.png",
            "galleryback2.png",
            "galleryback3.png",
            "galleryback4.png",
            "galleryback5.png",
            "galleryback6.png",
          ].map((img, i) => (
            <motion.div
              key={i}
              className="relative w-[340px] h-[220px] md:w-[380px] md:h-[240px] cursor-none group animate-float-slow overflow-hidden"
              style={{ perspective: "1200px" }}
              onClick={() => toggleFlip(i)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 60px rgba(255,180,240,0.7)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-[1.5rem] border border-white/20 
                shadow-[0_0_40px_rgba(255,128,200,0.5)] overflow-hidden"
                animate={{ rotateY: flips[i] ? 180 : 0 }}
                transition={{ duration: 1 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src={`/images/${img}`}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-70 blur-sm animate-shine"></div>
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-[1.5rem] border border-white/20 
                shadow-[0_0_40px_rgba(255,128,200,0.5)] overflow-hidden rotate-y-180"
                animate={{ rotateY: flips[i] ? 0 : -180 }}
                transition={{ duration: 1 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src={`/images/galleryfront${i + 1}.png`}
                  alt={`Gallery Back ${i + 1}`}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-70 blur-sm animate-shine"></div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== COMMUNITY SECTION ===================== */}
      <section
        id="community"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
      {/* 🩷 PAWPAW CHARACTER INFO — Style 100% Same as CONTACT ADDRESS */}
<section
  id="pawpaw-info"
  className="relative flex flex-col items-center justify-center text-center mt-10 mb-10"
>
  <div
    className="ca-panel cursor-none select-none px-10 py-6 rounded-2xl backdrop-blur-xl 
               bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(255,150,210,0.3)] 
               hover:scale-105 hover:shadow-[0_0_50px_rgba(255,180,240,0.6)] transition-all duration-300"
  >
    {/* 🐾 TITLE */}
    <h3 className="ca-text text-lg md:text-xl font-extrabold tracking-wider text-center mb-2">
      🐾 PAWPAW
    </h3>

    {/* ✨ DESCRIPTION */}
    <p
      className="ca-text text-sm md:text-base font-bold tracking-widest mt-2 
                 text-center opacity-90 select-none leading-relaxed"
    >
      A Cute Creature of the Universe <span className="italic">(Creatura Candiensis)</span>, 
      with fur as soft as pink candy floss and sparkling brown eyes. <br />
      She&apos;s shy but cheerful, loving, and always carries a gentle aura of joy. <br />
      Living peacefully in Candy Land, she spends her days spreading happiness, 
      though she tends to shy away from the spotlight. <br />
      Behind her gentle smile, there&apos;s a small hint of courage. 🍭✨
    </p>
  </div>
</section>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="ca-panel px-8 py-4 rounded-2xl backdrop-blur-xl 
          bg-gradient-to-r from-[#ffb6d9]/30 via-[#ffc3e0]/20 to-[#fff]/20 
          border border-white/20 shadow-[0_0_40px_rgba(255,180,240,0.5)] mb-10"
        >
          <h2 className="ca-text text-2xl md:text-3xl font-extrabold tracking-wider">
            JOIN THE CUTEST COMMUNITY
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "X", icon: "/images/xlogo.png", link: "https://x.com/pawthecutest/" },
            { name: "DEXSCREENER", icon: "/images/dex.png", link: "https://dexscreener.com/" },
            { name: "PUMP.FUN", icon: "/images/pump.png", link: "https://pump.fun/" },
          ].map((item, i) => (
            <motion.a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -10,
                rotate: 3,
                scale: 1.08,
                boxShadow: "0 0 50px rgba(255,180,240,0.7)",
              }}
              whileTap={{ scale: 0.97 }}
              className="ca-panel flex flex-col items-center justify-center px-6 py-5 rounded-2xl 
              bg-white border border-white/20 shadow-[0_0_30px_rgba(255,150,210,0.3)] 
              hover:shadow-[0_0_40px_rgba(255,180,240,0.6)] transition-all duration-500 ease-out cursor-none"
            >
              <Image src={item.icon} alt={item.name} width={65} height={65} className="mb-3" />
              <p className="ca-text text-sm md:text-base font-extrabold tracking-wide">
                {item.name}
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer
        className="relative py-3 text-white text-center z-10 backdrop-blur-lg 
        bg-gradient-to-r from-[#ffb6d9]/40 via-[#ff7fcf]/40 to-[#ffc3e0]/40
        shadow-[0_-2px_20px_rgba(255,180,240,0.3)] border-t border-white/20"
      >
        <div className="absolute -top-4 left-0 w-full h-4 bg-gradient-to-t from-transparent via-[#ffb6d9]/30 to-transparent blur-md"></div>
        <p className="text-xs md:text-sm font-medium tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
          © 2025 <span className="text-[#ffe0f0] font-bold">PAWPAW Coin</span>. All Rights Reserved Erdeje 🐾
        </p>
      </footer>

      <CursorPaw />
    </main>
  );
}
