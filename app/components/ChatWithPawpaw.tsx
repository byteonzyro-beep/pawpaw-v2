"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ChatWithPawpaw() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "Pawpaw 🐾",
      text: "Hewwo~ 💖 I’m Pawpaw from Candy Land 🍭✨! So happy to meet you nyaaa~ Wanna chat with me?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pawpawBlink, setPawpawBlink] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll otomatis ke bawah
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Blink animasi tiap beberapa detik
  useEffect(() => {
    const blink = setInterval(() => setPawpawBlink((prev) => !prev), 4000);
    return () => clearInterval(blink);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "You 💬", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "Pawpaw 🐾", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Pawpaw 🐾",
          text: "Oopsie~ my candy brain got a lil’ dizzy 😳🍭",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative w-full max-w-2xl mx-auto px-6 py-6 rounded-3xl bg-white/20 backdrop-blur-xl 
                 shadow-[0_0_50px_rgba(255,180,240,0.5)] border border-white/30 overflow-hidden"
    >
      {/* === 🩷 Pawpaw Floating Character === */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 1, -1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center mb-4"
      >
        <Image
          src={pawpawBlink ? "/images/candy8.png" : "/images/candy5.png"}
          alt="Pawpaw Mascot"
          width={120}
          height={120}
          className="rounded-full shadow-[0_0_25px_rgba(255,200,240,0.6)]"
        />
        <p className="text-pink-200 text-sm italic mt-2">Pawpaw is here~ 💫</p>
      </motion.div>

      {/* === TITLE === */}
      <h2 className="text-3xl font-extrabold text-pink-200 mb-4 text-center drop-shadow-[0_0_10px_rgba(255,200,250,0.6)]">
         Chat with Pawpaw 🐾
      </h2>

      {/* === CHAT AREA === */}
      <div className="h-72 overflow-y-auto mb-4 bg-white/10 p-4 rounded-2xl border border-white/20">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-3 ${
              msg.sender === "You 💬"
                ? "text-right text-white"
                : "text-left text-pink-100"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] leading-snug ${
                msg.sender === "You 💬"
                  ? "bg-gradient-to-r from-pink-400 to-pink-300 text-white rounded-br-none"
                  : "bg-gradient-to-r from-[#ffe0f0]/70 to-[#ffb6d9]/50 text-pink-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm md:text-base font-medium">{msg.text}</p>
            </div>
          </motion.div>
        ))}

        {/* === Pawpaw typing animation === */}
        {loading && (
          <div className="text-pink-200 italic flex items-center gap-2 mt-2">
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              🐾
            </motion.span>
            Pawpaw is thinking
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              ...
            </motion.span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* === INPUT === */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 rounded-2xl bg-white/40 text-pink-900 placeholder-pink-400 outline-none 
                     focus:ring-2 focus:ring-pink-300 transition-all"
          placeholder="Say something sweet to Pawpaw..."
        />
        <motion.button
          onClick={sendMessage}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 rounded-2xl bg-pink-400 hover:bg-pink-500 text-white font-bold transition-all shadow-lg"
        >
          {loading ? "..." : "Send 💌"}
        </motion.button>
      </div>
    </motion.div>
  );
}
