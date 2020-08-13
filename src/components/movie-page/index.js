import React, { useEffect, useState } from "react";
import { Image } from '../image'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setExtraMovie, setSimiliarMovies } from '../../redux/утки/movies'
import { Movies } from '../movies'
import './movie-page.sass'

export const MoviePage = () => {
    const dispatch = useDispatch()
    const [favState, setFavState] = useState()
    const { id } = useParams();
    const movie = useSelector(state => state.movies.extraMovie)

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setExtraMovie(id))
        dispatch(setSimiliarMovies(id))
        setFavState(localStorage.getItem(id))
    }, [id])

    const handleClick = movieID => {
        setFavState(!favState)
        if (localStorage.getItem(movieID)) localStorage.removeItem(movieID)
        else localStorage.setItem(movie.id, JSON.stringify(movie))
    }

    return (
        <>
            {movie && <div className="movie__page">
                <div className="extra-movie">
                    <div className="extra-movie__img">
                        <Image src={'https://image.tmdb.org/t/p/original' + movie.poster_path} />
                        <button className={favState ? 'extra-movie__favour-button' : 'extra-movie__favour-button active'}
                            onClick={() => handleClick(movie.id)}
                        >
                            {favState ? 'Remove from favourites' : 'Add to favourites'}
                        </button>
                    </div>
                    <div className="extra-movie__info">
                        <h3 className="extra-movie__title">{movie.title}</h3>
                        <hr></hr>
                        <h5 className="extra-movie__budget">Budget: {movie.budget}</h5>
                        <hr></hr>
                        <div className="extra-movie__genres">
                            <h4>Genres:</h4>
                            <div>
                                {movie.genres.map(genre =>
                                    <h6 key={genre.id}>{genre.name}</h6>
                                )}
                            </div>
                        </div>
                        <hr></hr>
                        <h5 className="extra-movie__date">Release Date: {movie.release_date}</h5>
                        <hr></hr>
                        <h5 className="extra-movie__rating">Average rating: {movie.vote_average}</h5>
                        <hr></hr>
                        <div className="extra-movie__overview">
                            <p>
                                {movie.overview}
                            </p>
                        </div>
                        {!!movie.production_companies.length && <div className="extra-movie__prod extra-movie-prod">
                            <div className="extra-movie-prod__title">
                                Production companies:
                            </div>
                            <div className="extra-movie-prod__creators extra-movie-creators">
                                {movie.production_companies.map((c) =>
                                    <div className="extra-movie-creators__creator" key={c.id}>
                                        <h5 className="extra-movie-creators__name">
                                            {c.name}
                                        </h5>
                                        <div className="extra-movie-creators__logo">
                                            <Image src={'https://image.tmdb.org/t/p/original' + c.logo_path} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="similar-movies">
                    <h3 className="similar-movies__title">
                        Similar movies
                    </h3>
                    <Movies />
                </div>
            </div>

            }
        </>
    )
}