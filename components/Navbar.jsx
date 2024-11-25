"use client";

import { useState } from "react";
import { Menu, X, Search } from "lucide-react"; // Lucide icons
import { useSession, signIn, signOut } from "next-auth/react"; // NextAuth hooks
import SearchOverlay from "./SearchOverlay";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  const { data: session } = useSession(); // Fetch session info

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setIsSearchOverlayOpen(false);
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 text-white z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="text-3xl font-bold text-red-600">
            <a href="/">
              <img src="logo.png" alt="logo" className="w-10" />
            </a>
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

          {/* User Profile and Search */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOverlayOpen(true)}
              className="px-4 py-1 rounded text-white"
            >
              <Search />
            </button>

            {session ? (
              // If user is logged in
              <div className="flex items-center space-x-2">
                <img
                  src={session.user.image}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:inline">{session.user.name}</span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-1 text-sm bg-red-600 rounded"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              // If user is not logged in
              <button
                onClick={() => signIn()}
                className="px-4 py-1 text-sm bg-green-600 rounded"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {isSearchOverlayOpen && (
        <SearchOverlay
          onClose={() => setIsSearchOverlayOpen(false)}
          onMovieSelect={handleMovieSelect}
        />
      )}
    </div>
  );
};

export default Navbar;
