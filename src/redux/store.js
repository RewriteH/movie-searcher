import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {movies} from './ducks/movies'
import {search} from './ducks/search'

const rootReducer = combineReducers({search, movies})

export const store = configureStore({ reducer: rootReducer })
