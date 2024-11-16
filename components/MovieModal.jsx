import { useState } from "react";

const MovieModal = ({ movie, isOpen, onClose }) => {
  if (!isOpen) return null; // If the modal isn't open, don't render anything.

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl"
        >
          &times;
        </button>

        {/* Movie Content */}
        <div className="flex flex-col items-center">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-semibold mt-4">{movie.title}</h2>
          <p className="text-gray-600 mt-2">{movie.description}</p>
          <span className="text-sm text-gray-500 mt-2">
            Release: {movie.year}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
