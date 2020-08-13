import { createClient } from './HTTPclient'

export const apiClient = createClient({
    base: 'https://api.themoviedb.org/3',
    params: { api_key: '6329b45fcf91e91fa669193511489390' }
})

export const searchMovies = (query, page) =>
    apiClient('/search/movie', { query, page });

export const getMovieInfo = movieID =>
    apiClient('/movie/' + movieID)

export const getSimilarMovies = movieID =>
    apiClient(`/movie/${movieID}/similar`, { page: 1 })

export const getGenres = () =>
    apiClient('/genre/movie/list', { language: 'en-US' })

export const getMoviesByDiscover = (discover, page) =>
    apiClient('/discover/movie', {
        with_genres: discover.genres  || '',
        sort_by: discover.sort || '',
        page
    })
