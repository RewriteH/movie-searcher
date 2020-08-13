import React from "react";
import { MoviePage } from '../movie-page'
import { MainPage } from '../main-page'
import { Header } from '../header'
import { FavouritesPage } from '../favourites-Page'
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

export const App = () => {

    return (
        <>
            <Router >
                <Header />
                <Route exact path="/movie-searcher" component={MainPage} />
                <Route exact path="/movie-searcher/search/movie" component={MainPage} />
                <Route exact path="/movie-searcher/discover/movie" component={MainPage} />
                <Route exact path="/movie-searcher/MoviePage/:id" component={MoviePage} />
                <Route exact path="/movie-searcher/Favourites" component={FavouritesPage} />
            </Router>
        </>
    )
}