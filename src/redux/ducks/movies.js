import { createReducer } from "@reduxjs/toolkit";
import {
    searchMovies,
    getMoviesByDiscover,
    getMovieInfo,
    getSimilarMovies
} from '../../utils/api/apiClient'

export const refreshMovies = () => {
    return (dispatch, getState) => {
        if (getState().search.query) {
            dispatch(fetchMovies(
                searchMovies,
                [getState().search.query, getState().search.page]
            ))
        }
        else  {
            dispatch(fetchMovies(
                getMoviesByDiscover,
                [getState().search.discover, getState().search.page]
            ))
        }
    }
}


const fetchMovies = (fetchFunction, fetchParams) => {
    return async dispatch => {
        try {
            dispatch(toggleFetching(true))
            const r = await fetchFunction(...fetchParams)
            dispatch(setMovies(r.results))
            dispatch(setPages(r.total_pages))
            dispatch(toggleFetching(false))
        } catch (error) {
            dispatch(toggleFetching(false))
            console.log(error)
        }
    }
}


export const toggleFetching = bool => {
    return {
        type: 'TOGGLE_MOVIES_FETCHING',
        payload: bool
    }
}

export const setSimiliarMovies = movieID => {
    return async dispatch => {
        try {
            const r = await getSimilarMovies(movieID)
            dispatch(setMovies(r.results))
            dispatch(toggleFetching(false))
        } catch (error) {
            dispatch(toggleFetching(false))
            console.log(error)
        }
    }
}

export const setExtraMovie = movieID => {
    return async dispatch => {
        try {
            const r = await getMovieInfo(movieID)
            dispatch({
                type: 'SET_EXTRA_MOVIE',
                payload: r
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const setMovies = movies => {
    return {
        type: 'SET_MOVIES',
        payload: movies
    }
}

const setPages = pages => {
    return {
        type: 'SET_PAGES',
        payload: pages
    }
}



export const movies = createReducer({
    pages: null,
    moviesFetching: true,
    movies: [],
    extraMovie: '',
}, {
    'SET_MOVIES': (state, action) => {
        state.movies = action.payload
    },
    'TOGGLE_MOVIES_FETCHING': (state, action) => {
        state.moviesFetching = action.payload
    },
    'SET_EXTRA_MOVIE': (state, action) => {
        state.extraMovie = action.payload
    },
    'TOGGLE_LOADING': (state, action) => {
        state.loading = action.payload
    },
    'SET_PAGES': (state, action) => {
        state.pages = action.payload
    }
})