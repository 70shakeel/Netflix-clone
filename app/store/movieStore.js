// app/store/movieStore.js
import { create } from 'zustand';

const useMovieStore = create((set) => ({
    trendingMovies: [],
    topRatedMovies: [],
    randomMovie: null,

    setTrendingMovies: (movies) =>
        set((state) => {
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            return { ...state, trendingMovies: movies, randomMovie };
        }),

    setTopRatedMovies: (movies) =>
        set((state) => ({ ...state, topRatedMovies: movies })),

    setRandomMovie: (movie) =>
        set((state) => ({ ...state, randomMovie: movie })),
}));

export default useMovieStore;
