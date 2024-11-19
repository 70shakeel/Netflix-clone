
import Hero from '@/components/Hero';
import { fetchMovies } from '@/app/api/tmdb';
import MovieRow from '@/components/MovieRow';

export default async function HomePage() {
  const trendingMovies = await fetchMovies('/trending/movie/week');
  const topRatedMovies = await fetchMovies('/movie/top_rated');
  const randomMovie = trendingMovies[Math.floor(Math.random() * trendingMovies.length)];

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
