import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchMovies(endpoint) {
    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
        params: { api_key: API_KEY },
    });
    return response.data.results;
}
