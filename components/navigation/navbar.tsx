"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="w-full bg-d-primary text-white border-b border-d-primary-surface px-4 md:px-16 relative">
      <div className="flex justify-between items-center h-10 ">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Links Container */}
        <div className="hidden md:flex items-center gap-0.5">
          <Link
            href="/"
            className={`px-4 p-2.5 text-sm hover:bg-d-primary-surface transition-colors ${
              path === "/" ? "bg-d-primary-surface" : ""
            }`}
          >
            Hok-Draft
          </Link>

          <Link
            href="/honor-of-kings"
            className={`px-4 p-2.5 text-sm hover:bg-d-primary-surface transition-colors flex items-center gap-2 ${
              path.startsWith("/honor-of-kings") ? "bg-d-primary-surface" : ""
            }`}
          >
            <Image
              src="/asset/image/Honor_of_Kings_logo.png"
              width={18}
              height={18}
              alt="HOK Logo"
            />
            <span>Honor Of Kings</span>
          </Link>

          <Link
            href="/support-admin"
            className={`px-4 p-2.5 text-sm hover:bg-d-primary-surface transition-colors ${
              path.startsWith("/support-admin") ? "bg-d-primary-surface" : ""
            }`}
          >
            <span>🆘 Support Admin</span>
          </Link>
        </div>

        {/* Brand Name (Visible on Mobile Center/Right) or Footer Text */}
        <div className="flex items-center gap-2">
          {/* Mobile Title if needed, currently just showing the Made By link on right */}
          <Link
            href="/"
            className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse font-bold hover:opacity-80 transition-opacity whitespace-nowrap text-xs md:text-sm"
          >
            Made By Mpiie 💖
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-d-primary border-b border-d-primary-surface z-50 flex flex-col shadow-xl">
          <Link
            href="/"
            className={`px-6 py-4 text-sm hover:bg-d-primary-surface border-b border-white/5 ${
              path === "/" ? "bg-d-primary-surface" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home / Hok-Draft
          </Link>

          <Link
            href="/honor-of-kings"
            className={`px-6 py-4 text-sm hover:bg-d-primary-surface border-b border-white/5 flex items-center gap-2 ${
              path.startsWith("/honor-of-kings") ? "bg-d-primary-surface" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/asset/image/Honor_of_Kings_logo.png"
              width={18}
              height={18}
              alt="HOK Logo"
            />
            <span>Honor Of Kings</span>
          </Link>

          <Link
            href="/support-admin"
            className={`px-6 py-4 text-sm hover:bg-d-primary-surface ${
              path.startsWith("/support-admin") ? "bg-d-primary-surface" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span>🆘 Support Admin</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
