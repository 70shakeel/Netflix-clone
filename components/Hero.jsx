"use client";

import { useState } from "react";
import axios from "axios";

const Hero = ({ movie }) => {
  const [trailerUrl, setTrailerUrl] = useState(null);

  // Fetch the trailer URL
  const fetchTrailer = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          },
        }
      );

      const trailer = response.data.results.find(
        (video) => video.type === "Trailer"
      );

      if (trailer) {
        setTrailerUrl(
          `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
        ); // Mute autoplay for better UX
      } else {
        console.log("Trailer not found");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  // Clear the trailer URL
  const stopTrailer = () => {
    setTrailerUrl(null);
  };

  return (
    <div
      className="relative h-[500px] md:h-[700px] bg-cover bg-center text-white cursor-pointer"
      onMouseEnter={fetchTrailer}
      onMouseLeave={stopTrailer}
    >
      {trailerUrl ? (
        <iframe
          src={trailerUrl}
          title="YouTube Trailer"
          className="absolute inset-0 w-full h-full cursor-pointer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          {/* Hero Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          ></div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>

          {/* Movie Details */}
          <div className="absolute bottom-20 left-10 space-y-4 z-10">
            <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
            <p className="max-w-4xl text-sm md:text-lg">{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
