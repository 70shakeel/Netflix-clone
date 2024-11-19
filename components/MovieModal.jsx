"use client";

import { useState, useEffect, useRef } from "react";

const MovieModal = ({ movie, isOpen, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && movie) {
      fetchTrailer(movie.id);
    }
  }, [isOpen, movie]);

  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await response.json();
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        setTrailerUrl("");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
      <div
        ref={modalRef}
        className="bg-black rounded-lg max-w-6xl w-full p-6 space-y-4 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-3 text-white text-3xl"
        >
          &times;
        </button>

        {!showTrailer ? (
          <>
            {/* Movie Content */}
            <div className="flex flex-col items-center">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center rounded-lg">
                  <span className="text-gray-400">No Image Available</span>
                </div>
              )}

              <h2 className="text-2xl font-semibold text-white mt-4">
                {movie.title || "Unknown Title"}
              </h2>
              <p className="text-white mt-2">
                {movie.overview || "No description available."}
              </p>
              <span className="text-sm text-gray-400 mt-2">
                Release: {movie.release_date || "N/A"}
              </span>
            </div>

            {/* Watch Now Button */}
            {trailerUrl ? (
              <button
                onClick={() => setShowTrailer(true)}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                Watch Trailer
              </button>
            ) : (
              <p className="mt-4 text-gray-400">Trailer not available.</p>
            )}
          </>
        ) : (
          <>
            {/* Trailer Video */}
            <div className="relative w-full aspect-w-16 aspect-h-9">
              <iframe
                src={trailerUrl}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[600px] rounded-lg"
              ></iframe>
            </div>

            {/* Back to Details Button */}
            <button
              onClick={() => setShowTrailer(false)}
              className="mt-4 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
            >
              Back to Details
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
