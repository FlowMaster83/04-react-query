import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import type { Movie } from '../../types/movie'
import { fetchMovies } from '../../services/movieService'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import css from './App.module.css'
import ReactPaginate from '../ReactPaginate/ReactPaginate'

function App() {

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [page, setPage] = useState(1)

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['movies', searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: searchQuery.length > 0,
    placeholderData: (prev) => prev
  })

  useEffect(() => {
    if (data && data.results.length === 0 && searchQuery) {
      toast('No movies found for your request.')
    }
  }, [data, searchQuery])

  const handlePageClick = (nextPage: number) => {
    setPage(nextPage);
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const closeModal = () => {
    setSelectedMovie(null)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(1)
  }

  return (
    <div className={css.app}>

      <SearchBar onSubmit={handleSearch} />

      {data && data.total_pages > 1 && (<ReactPaginate pageCount={data.total_pages} forcePage={page} onPageChange={handlePageClick} />)}

      {isError && <ErrorMessage />}
      {isFetching && <Loader />}

      {isSuccess && data && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={openModal} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </div>
  )
}

export default App