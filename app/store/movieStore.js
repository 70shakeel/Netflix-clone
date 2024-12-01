import { create } from "zustand";

const useMovieStore = create((set) => ({
    trendingMovies: [],
    topRatedMovies: [],
    randomMovie: null,

    setTrendingMovies: (movies) =>
        set(() => {
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            return { trendingMovies: movies, randomMovie };
        }),

    setTopRatedMovies: (movies) => set({ topRatedMovies: movies }),

    setRandomMovie: (movie) => set({ randomMovie: movie }),
}));

export default useMovieStore;
