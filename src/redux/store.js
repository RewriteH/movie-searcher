import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {movies} from './утки/movies'
import {search} from './утки/search'

const rootReducer = combineReducers({search, movies})

export const store = configureStore({ reducer: rootReducer })
