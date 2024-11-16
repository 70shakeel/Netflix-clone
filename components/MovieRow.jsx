"use client";
import { useState } from "react";
import MovieModal from "./MovieModal";

const MovieRow = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="my-4">
      <h2 className="text-2xl mb-2">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[200px] cursor-pointer"
            onClick={() => setSelectedMovie(movie)}
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
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MovieRow;
