"use client";

import { useEffect } from "react";
import useMovieStore from "@/app/store/movieStore";
import Hero from "@/components/Hero";
import { fetchMovies } from "@/app/api/tmdb";
import MovieRow from "@/components/MovieRow";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const {
    trendingMovies,
    topRatedMovies,
    randomMovie,
    setTrendingMovies,
    setTopRatedMovies,
  } = useMovieStore();

  useEffect(() => {
    async function fetchData() {
      const trending = await fetchMovies("/trending/movie/week");
      const topRated = await fetchMovies("/movie/top_rated");

      setTrendingMovies(trending);
      setTopRatedMovies(topRated);
    }

    fetchData();
  }, [setTrendingMovies, setTopRatedMovies]);

  if (!randomMovie || trendingMovies.length === 0 || topRatedMovies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Hero movie={randomMovie} />
      <div className="space-y-8">
        <MovieRow title="Trending Now" movies={trendingMovies} />
        <MovieRow title="Top Rated" movies={topRatedMovies} />
      </div>
    </div>
  );
}
