"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import useMovieStore from "@/app/store/movieStore";

const SearchOverlay = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const setRandomMovie = useMovieStore((state) => state.setRandomMovie);
  const overlayRef = useRef(null); // Ref to detect outside clicks

  const fetchSearchResults = async (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            query,
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(debounce(fetchSearchResults, 500), []);

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]); // Clear results when input is empty
    }
  }, [searchQuery, debouncedSearch]);

  const handleResultClick = (movie) => {
    setRandomMovie(movie);
    onClose();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleClickOutside = (event) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target)) {
      onClose(); // Close overlay if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 text-white flex items-center justify-center z-50">
      <div
        ref={overlayRef} // Attach ref to the content wrapper
        className="flex flex-col items-center w-full max-w-6xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-6xl">
          &times;
        </button>
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Search a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white w-full text-xl"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-4xl"
            >
              &times;
            </button>
          )}
        </div>
        {searchResults.length > 0 && (
          <div className="w-full bg-gray-900 text-white max-h-60 overflow-y-auto shadow-lg rounded-lg">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="p-2 hover:bg-gray-700 cursor-pointer flex items-center"
                onClick={() => handleResultClick(result)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  alt={result.title}
                  className="inline-block w-10 h-14 mr-2 object-cover rounded"
                />
                <span>{result.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
