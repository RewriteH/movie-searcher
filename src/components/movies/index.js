import React from "react";
import { Movie } from '../movie-card'
import { useSelector } from 'react-redux'
import './movies-styles.sass'
import {Preloader} from '../preloader'

export const Movies = () => {
    const movies = useSelector(state => state.movies.movies)
    const moviesFetching = useSelector(state => state.movies.moviesFetching)

    if (moviesFetching) return <Preloader/>

    return (
        <div className="movies">
            {movies.map(movie =>
                <Movie
                    key={movie.id}
                    movie={movie}
                />
            )}
        </div>
    )
}