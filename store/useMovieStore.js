import { create } from 'zustand';

const useMovieStore = create((set) => ({
    selectedMovie: null,
    setSelectedMovie: (movie) => set({ selectedMovie: movie }),
}));

export default useMovieStore;
