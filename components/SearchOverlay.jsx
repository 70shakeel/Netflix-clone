"use client";

import { useState } from "react";
import axios from "axios";
import Hero from "./Hero";

const SearchOverlay = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            query: searchQuery,
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleResultClick = (movie) => {
    setSelectedMovie(movie);
    onClose();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center z-50">
      <button onClick={onClose} className="absolute top-4 right-4 text-6xl">
        &times;
      </button>
      <div className="relative w-full max-w-6xl mb-4">
        <input
          type="text"
          placeholder="Search a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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
        <div className="w-full max-w-6xl bg-gray-900 text-white max-h-60 overflow-y-auto shadow-lg rounded-lg">
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
      {selectedMovie && <Hero movie={selectedMovie} />}
    </div>
  );
};

export default SearchOverlay;
