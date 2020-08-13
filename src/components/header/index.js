import React from "react";
import {
    Link,
} from "react-router-dom";
import './header.sass'

export const Header = () => {

    return (
        <div className="header__panel">
            <Link to="/movie-searcher">
                <div className="header__panel__logo">
                    MoviesDB Search
                </div>
            </Link>
            <div className="header__panel__links">
            <Link to="/movie-searcher/Favourites">
                <div className="header__panel__favourites">
                    Favourites
                </div>
            </Link>
            </div>
        </div>
    )
}