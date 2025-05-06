"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Utensils, Edit3 } from "lucide-react";
import { useEffect, useState } from "react";

export function MenuHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isScrolled ? "bg-transparent" : "bg-[#eb7919]"
      } text-[#fffefe] py-4 shadow-md sticky top-0 z-0 transition-colors duration-300`}
    >
      <div className="container px-4 flex items-center justify-between">
        <img
          src="/don-osvaldologo.png"
          alt="Don Osvaldo Logo"
          className="h-20"
        />
        <p className="text-sm font-bold italic">Menu Digital - Don Osvaldo</p>
        <Link href="/login">
          <Button variant="ghost" size="sm" className="text-[#eb7919]">
            <Edit3 className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
