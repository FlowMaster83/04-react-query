import axios  from "axios";
import type { Movie } from '../types/movie'

export interface MovieResponse {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
}

export const fetchMovies = async (query: string):Promise<Movie[]> => {
      try {
        const config = {
            params: {
                query,
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
            }
        };
        
      const response = await axios.get<MovieResponse>('https://api.themoviedb.org/3/search/movie', config);
      // console.log(response.data);
      return response.data.results
    } catch (error) {
      console.error(error);
      return[]
  }
}