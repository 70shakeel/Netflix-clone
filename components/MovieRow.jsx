"use client";
import { useState } from "react";
import MovieModal from "./MovieModal";

const MovieRow = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsOpen(false);
  };

  return (
    <div className="my-4">
      <h2 className="text-2xl mb-2">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[200px] cursor-pointer"
            onClick={() => openModal(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg hover:scale-105 transition"
            />
          </div>
        ))}
      </div>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MovieRow;
