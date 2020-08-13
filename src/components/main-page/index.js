import React, { useEffect } from "react";
import { Pagination } from '../pagination'
import { Movies } from '../movies'
import { Search } from '../search'
import { useDispatch, useSelector } from 'react-redux'
import { refreshMovies } from '../../redux/утки/movies'
import './main-page.sass'

export const MainPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(refreshMovies())
    }, [dispatch])

    return (
        <>
            <div className="body__container">
                <Search />
                <div className="movies__container">
                    <Movies />
                    <Pagination />
                </div>
            </div>
        </>
    )
}