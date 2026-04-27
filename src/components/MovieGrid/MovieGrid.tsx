import css from './MovieGrid.module.css'
import type { Movie } from '../../types/movie'

interface MovieGridProps {
    movies: Movie[],
    onSelect: (movie: Movie) => void
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {

    return (
        <ul className={css.grid}>
            {/* Набір елементів списку з фільмами */}
            {movies.map((movie) => (
                <li key={movie.id} onClick={() => onSelect(movie)}>
                    <div className={css.card}>
                        <img
                            className={css.image}
                            src={movie.poster_path && `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            loading="lazy"
                        />
                        <h2 className={css.title}>{movie.title}</h2>
                    </div>
                </li>))}
        </ul>
    )
};
