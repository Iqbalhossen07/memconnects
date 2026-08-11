"use client";

import { useState, useEffect } from "react";

export default function WelcomeBanner({ adminName }: { adminName: string }) {
  const [ukTime, setUkTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const timeString = new Date().toLocaleString("en-GB", {
        timeZone: "Europe/London",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setUkTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#6D5795] to-[#8A56F6] rounded-2xl p-6 md:p-10 shadow-lg mb-8 md:mb-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="relative z-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">Welcome Back, {adminName}!</h1>
        <p className="text-purple-100 text-sm md:text-lg">Here's what's happening with your applications and portal today.</p>
        {ukTime && (
          <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-sm font-medium">
            🇬🇧 UK Time: {ukTime}
          </div>
        )}
      </div>
    </div>
  );
}
