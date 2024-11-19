"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import MovieModal from "./MovieModal";

const MovieRow = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsOpen(false);
  };

  const handleMouseEnter = (movieId) => {
    setHoveredMovieId(movieId);
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
  };

  return (
    <div className="my-4">
      <h2 className="text-2xl mb-2">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[200px] cursor-pointer perspective-1000"
            onMouseEnter={() => handleMouseEnter(movie.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Card
              className="w-full h-full bg-transparent border-none transform-style-preserve-3d transition-transform duration-1000 hover:rotate-y-180"
              onClick={() => openModal(movie)}
            >
              <CardContent className="p-0 relative">
                {/* Poster Image */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={`rounded-lg hover:scale-105 transition-transform ${
                    hoveredMovieId === movie.id ? "opacity-0" : "opacity-100"
                  }`}
                />
                {/* Movie Rating */}
                {hoveredMovieId === movie.id && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-lg text-white">
                    <span className="text-3xl">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
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
