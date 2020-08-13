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
                <Route exact path="/" component={MainPage} />
                <Route exact path="/search/movie" component={MainPage} />
                <Route exact path="/discover/movie" component={MainPage} />
                <Route exact path="/MoviePage/:id" component={MoviePage} />
                <Route exact path="/Favourites" component={FavouritesPage} />
            </Router>
        </>
    )
}