"use client";

import { MenuHeader } from "@/components/menu-header";
import { MenuCategories } from "@/components/menu-categories";
import { MenuContent } from "@/components/menu-content";
import React from "react";

export default function Home() {
  React.useEffect(() => {
    const handler = () => {
      document.documentElement.requestFullscreen?.();
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
    };
    window.addEventListener("click", handler);
    window.addEventListener("touchstart", handler);
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, []);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [showMobileMsg, setShowMobileMsg] = React.useState(isMobile);

  React.useEffect(() => {
    if (isMobile && showMobileMsg) {
      const timeout = setTimeout(() => setShowMobileMsg(false), 3500); // 3.5 segundos
      return () => clearTimeout(timeout);
    }
  }, [isMobile, showMobileMsg]);

  return (
    <div className="min-h-screen bg-[#fffefe] flex flex-col">
      {!isMobile && (
        <button
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            zIndex: 1000,
            background: "#eb7919",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 16,
          }}
          onClick={() => document.documentElement.requestFullscreen?.()}
        >
          Pantalla Completa
        </button>
      )}
      {isMobile && showMobileMsg && (
        <div
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            zIndex: 1000,
            background: "#eb7919",
            color: "#fff",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 14,
            transition: "opacity 0.5s",
          }}
        >
          Para mejor experiencia, agrega a pantalla de inicio
        </div>
      )}
      <MenuHeader />

      <main className="flex-1 flex flex-col h-full">
        <div className="flex flex-col flex-1 h-full">
          <MenuCategories />

          <div className="flex-1 overflow-auto px-2 pb-20">
            <MenuContent />
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-[#eb7919] bg-[#fffefe] border-t border-[#eb7919]/20">
        © {new Date().getFullYear()} - Don Osvaldo Comidas
      </footer>
    </div>
  );
}
