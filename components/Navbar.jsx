"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Use Lucide icons or any icon library.

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 text-white z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/">Netflix Clone</a>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent md:flex ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
            <li>
              <a href="/" className="block py-2 md:py-0 hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a
                href="#tv-shows"
                className="block py-2 md:py-0 hover:text-gray-300"
              >
                TV Shows
              </a>
            </li>
            <li>
              <a
                href="#movies"
                className="block py-2 md:py-0 hover:text-gray-300"
              >
                Movies
              </a>
            </li>
            <li>
              <a
                href="#my-list"
                className="block py-2 md:py-0 hover:text-gray-300"
              >
                My List
              </a>
            </li>
          </ul>
        </div>

        {/* User Profile and Search (Always Visible) */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-1 rounded bg-gray-800 text-white"
          />
          <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
