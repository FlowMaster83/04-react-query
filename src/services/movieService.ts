import axios  from "axios";
import type { Movie } from '../types/movie'

export interface MovieResponse {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
}

export const fetchMovies = async (query: string, page: number):Promise<MovieResponse> => {
        const config = {
            params: {
                query,
                page,
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
            }
        };
        
      const response = await axios.get<MovieResponse>('https://api.themoviedb.org/3/search/movie', config);

      return response.data
}