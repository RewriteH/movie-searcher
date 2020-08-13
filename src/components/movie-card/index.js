import React, { useState } from "react";
import { Image } from '../image'
import {
    Link
} from "react-router-dom";
import './movie-card.sass'

export const Movie = ({ movie, storageUpdate }) => {

    const [active, setActive] = useState(localStorage.getItem(movie.id))

    const handleClick = movieID => {
        setActive(!active)
        if (localStorage.getItem(movieID)) localStorage.removeItem(movieID)
        else localStorage.setItem(movieID, JSON.stringify(movie))
        storageUpdate ? storageUpdate() : '' 
    }

    return (
        <div className="movie">
            <Link to={"/movie-searcher/MoviePage/" + movie.id}>
                <div className="movie__img">
                    <Image src={'https://image.tmdb.org/t/p/original' + movie.poster_path} />
                </div>
            </Link>
            <div className="movie__title">
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    onClick={() => handleClick(movie.id)}
                    style={{ fill: active ? 'red' : '#fff' }}
                >
                    <g>
                        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
                    </g>
                </svg>
                <h3>{movie.title}</h3>
            </div>
        </div>
    )
}