import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setDiscoverSort } from '../../../redux/утки/search'
import {syncUrl} from '../../../utils/syncUrl'

const arr = [
    { id: 1, value: 'vote_average', name: 'Average vote' },
    { id: 2, value: 'popularity', name: 'Popularity' },
    { id: 3, value: 'release_date', name: 'Release date' },
    { id: 4, value: 'original_title', name: 'Original title' },
    { id: 5, value: 'vote_count', name: 'Vote count' }
]

export const Sort = () => {
    const dispatch = useDispatch()
    const [sort, setSort] = useState('popularity')
    const [direction, setDirection] = useState('desc')
    const discoverSort = useSelector(state => state.search.discover.sort)

    const sortOnChange = e => {
        syncUrl('/discover/movie', {name: 'sort_by', target: `${e.target.value}.${direction}`})
        setSort(e.target.value)
        dispatch(setDiscoverSort(`${e.target.value}.${direction}`))
    }

    const directionOnChange = e => {
        syncUrl('/discover/movie', {name: 'sort_by', target: `${sort}.${e.target.value}`})
        setDirection(e.target.value)
        dispatch(setDiscoverSort(`${sort}.${e.target.value}`))
    }

    return (
        <div className="search-form__sort search-form-sort">
            <h3>Sort movies</h3>
            <div className="search-form-sort__direction">
                <h5 className="search-form-sort__title">
                    Sort direction:
                </h5>
                <div className="search-form-sort__items">
                    <div className="search-form-sort__item">
                        <input
                            className="search-form-sort__input"
                            id="asc"
                            type="radio"
                            name="sort-direction"
                            value="asc"
                            onChange={directionOnChange}
                            checked={discoverSort.endsWith('asc')}
                        />
                        <label
                            htmlFor="asc"
                            className="search-form-sort__label"
                        >
                            Ascending
                    </label>
                    </div>
                    <div className="search-form-sort__item">
                        <input
                            className="search-form-sort__input"
                            id="desc"
                            type="radio"
                            name="sort-direction"
                            value="desc"
                            onChange={directionOnChange}
                            checked={discoverSort.endsWith('desc')}
                        />
                        <label
                            htmlFor="desc"
                            className="search-form-sort__label"
                        >
                            Descending
                    </label>
                    </div>
                </div>
            </div>
            <h5 className="search-form-sort__title">
                Sort by:
                </h5>
            <div className="search-form-sort__items">
                {arr.map(e =>
                    <div
                        className="search-form-sort__item"
                        key={e.id}
                    >
                        <input
                            className="search-form-sort__input"
                            id={e.id}
                            type="radio"
                            name="sort"
                            value={e.value}
                            onChange={sortOnChange}
                            checked={discoverSort.startsWith(e.value)}
                        />
                        <label
                            htmlFor={e.id}
                            className="search-form-sort__label"
                        >
                            {e.name}
                        </label>
                    </div>
                )}
            </div>
        </div>
    )
}