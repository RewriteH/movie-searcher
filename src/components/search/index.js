import React, { useEffect } from "react";
import { DebounceInput } from 'react-debounce-input';
import { useDispatch, useSelector } from 'react-redux'
import { setGenres } from '../../redux/утки/search'
import { setQuery, toggleGenre } from '../../redux/утки/search'
import { Sort } from './sort'
import { syncUrl } from '../../utils/syncUrl'
import './search.sass'

export const Search = () => {
    const dispatch = useDispatch()
    const searchStore = useSelector(state => state.search)
    const discoverGenres = useSelector(state => state.search.discover.genres)

    useEffect(() => {
        dispatch(setGenres())
    }, [dispatch])

    const queryOnChange = e => {
        syncUrl('/search/movie', { name: 'query', target: e.target.value })
        dispatch(setQuery(e.target.value))
    }

    const selectedGenresChange = e => {
        if (e.target.checked) {
            syncUrl('/discover/movie', {
                name: 'genres',
                target: [...discoverGenres, e.target.value]
            })
        } else {
            syncUrl('/discover/movie', {
                name: 'genres',
                target: discoverGenres.filter(g => g !== e.target.value)
            })
        }
        dispatch(toggleGenre(e.target.value))
    }

    return (
        <div className="search-form-wrapp">
            <div className="search-form">
                <DebounceInput
                    value={searchStore.query}
                    onChange={queryOnChange}
                    type="search"
                    className="search-form__input"
                    placeholder="Search the movie"
                    debounceTimeout={200}
                />
                <Sort />
                <div className="search-form__genres search-form-genres">
                    <h3 className="search-form-genres__title">Genres:</h3>
                    <div className="search-form-genres__items">
                        {searchStore.genres.map(genre =>
                            <div
                                className="search-form__genre"
                                key={genre.id}
                            >
                                <input
                                    onChange={selectedGenresChange}
                                    type="checkbox"
                                    id={genre.id}
                                    value={genre.id}
                                    checked={discoverGenres.includes(String(genre.id))}
                                />
                                <label htmlFor={genre.id}>
                                    {genre.name}
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}