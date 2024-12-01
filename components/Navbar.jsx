"use client";

import { useState } from "react";
import { Menu, X, Search, LogOut } from "lucide-react"; // Add LogOut icon
import { useSession, signIn, signOut } from "next-auth/react";
import SearchOverlay from "./SearchOverlay";
import useMovieStore from "@/app/store/movieStore";
import { fetchMovies } from "@/app/api/tmdb";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { setTrendingMovies, setTopRatedMovies, setRandomMovie } =
    useMovieStore();
  const { data: session } = useSession();

  const handleCategorySwitch = async (category) => {
    if (category === "movies") {
      const trending = await fetchMovies("/trending/movie/week");
      const topRated = await fetchMovies("/movie/top_rated");
      setTrendingMovies(trending);
      setTopRatedMovies(topRated);
      setRandomMovie(trending[Math.floor(Math.random() * trending.length)]);
    } else if (category === "tv") {
      const trending = await fetchMovies("/trending/tv/week");
      const topRated = await fetchMovies("/tv/top_rated");
      setTrendingMovies(trending);
      setTopRatedMovies(topRated);
      setRandomMovie(trending[Math.floor(Math.random() * trending.length)]);
    }
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 text-white z-50 h-[80px]">
        <div className="container mx-auto flex justify-between md:items-center sm:items-end p-4">
          <div className="text-3xl font-bold text-red-600">
            <a href="/">
              <img src="logo.png" alt="logo" className="w-10" />
            </a>
          </div>

          <div
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent md:flex ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
              <li>
                <button
                  onClick={() => handleCategorySwitch("movies")}
                  className="block py-2 md:py-0 hover:text-gray-300"
                >
                  Movies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategorySwitch("tv")}
                  className="block py-2 md:py-0 hover:text-gray-300"
                >
                  TV Shows
                </button>
              </li>
              {/* <li>
                <a
                  href="#my-list"
                  className="block py-2 md:py-0 hover:text-gray-300"
                >
                  My List
                </a>
              </li> */}

              {/* Move Sign In / Sign Out inside the mobile menu */}
              {session ? (
                <li className="md:hidden flex items-center space-x-2">
                  <img
                    src={session.user.image}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-1 text-sm bg-red-600 rounded"
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <li className="md:hidden">
                  <button
                    onClick={() => signIn()}
                    className="px-4 py-1 text-sm bg-green-600 rounded-full"
                  >
                    Sign In
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={() => setIsSearchOverlayOpen(true)}
              className="px-4 py-1 rounded text-white"
            >
              <Search />
            </button>

            {/* Remove Sign In / Sign Out from here in desktop view */}
            {!isMenuOpen && session && (
              <div
                className="relative hidden md:flex items-center"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <img
                  src={session.user.image}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute cursor-pointer">
                    <button
                      onClick={() => signOut()}
                      className="w-8 h-8 text-center bg-red-600 rounded-full"
                    >
                      <LogOut size={16} className=" inline" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Sign In button for users who are not logged in */}
            {!session && !isMenuOpen && (
              <button
                onClick={() => signIn()}
                className="px-4 py-1 text-sm bg-green-600 rounded-full"
              >
                Sign In
              </button>
            )}

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isSearchOverlayOpen && (
        <SearchOverlay
          onClose={() => setIsSearchOverlayOpen(false)}
          onMovieSelect={(movie) => {
            setIsSearchOverlayOpen(false);
            console.log("Selected movie:", movie);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
