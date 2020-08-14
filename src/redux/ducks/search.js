import { createReducer } from "@reduxjs/toolkit";
import { refreshMovies } from './movies'
import {
    getGenres,
} from '../../utils/api/apiClient'
import { getParam } from '../../utils/getParam'

export const setQuery = query => {
    return dispatch => {
        dispatch({
            type: 'SEARCH/CLEAR_DISCOVER',
        })
        dispatch({
            type: 'SEARCH/SET_QUERY',
            payload: query
        })
        dispatch(refreshMovies())
    }
}

export const setPage = page => {
    return dispatch => {
        dispatch({
            type: 'SEARCH/SET_PAGE',
            payload: page
        })
        dispatch(refreshMovies())
    }
}


export const setGenres = () => {
    return async dispatch => {
        try {
            const r = await getGenres()
            dispatch({
                type: 'SEARCH/SET_GENRES',
                payload: r.genres
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const setDiscoverSort = query => {
    return dispatch => {
        dispatch({
            type: 'SEARCH/DISCOVER/SET_SORT',
            payload: query
        })
        dispatch({
            type: 'SEARCH/SET_PAGE',
            payload: 1
        })
        dispatch({
            type: 'SEARCH/SET_QUERY',
            payload: ''
        })
        dispatch(refreshMovies())
    }
}

export const toggleGenre = genre => { // При срабатывании этого экшена и похожих, нужно изменить страницу в сторе на первую и сбросить квери
    return dispatch => {                //Как это нормально сделать? Потом в этом говне копаться сложно если так сейчас оставить.
        dispatch({
            type: 'SEARCH/TOGGLE_GENRE',
            payload: genre
        })
        dispatch({
            type: 'SEARCH/SET_PAGE', //изменить страницу в сторе
            payload: 1
        })
        dispatch({
            type: 'SEARCH/SET_QUERY', //сбросить квери
            payload: ''
        })
        dispatch(refreshMovies())
    }
}

const initialState = {
    query: getParam('query'),
    page: getParam('page', 'number') || 1,
    discover: {
        genres: getParam('genres', 'arr') || [],
        sort: getParam('sort_by') || 'popularity.desc'
    },
    genres: [],
}

export const search = createReducer(initialState, {
    'SEARCH/SET_QUERY': (state, action) => {
        state.query = action.payload
    },
    'SEARCH/SET_GENRES': (state, action) => {
        state.genres = action.payload
    },
    'SEARCH/TOGGLE_GENRE': (state, action) => {
        if (state.discover.genres.includes(action.payload)) {
            const index = state.discover.genres.indexOf(action.payload)
            state.discover.genres.splice(index, 1)
        } else {
            state.discover.genres.push(action.payload)
        }
    },
    'SEARCH/DISCOVER/SET_SORT': (state, action) => {
        state.discover.sort = action.payload
    },
    'SEARCH/CLEAR_DISCOVER': state => {
        state.discover.genres = []
        state.discover.sort = 'popularity.desc'
    },
    'SEARCH/SET_PAGE': (state, action) => {
        state.page = action.payload
    },
})
