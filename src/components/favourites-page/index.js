import { Movie } from '../movie-card'
import React, { useState } from "react";

export const FavouritesPage = () => {

    const [movies, setMovies] = useState(Object.values(localStorage))

    const handleUpdate = () => setMovies(Object.values(localStorage))

    return (
        <>
            <div
                className="movies"
            >
                {movies && movies.map(movie =>
                    <Movie
                        storageUpdate={handleUpdate}
                        key={JSON.parse(movie).id}
                        movie={JSON.parse(movie)}
                    />
                )}
            </div>
        </>
    )
}

