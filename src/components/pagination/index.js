import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../../redux/утки/search'
import './pagination.sass'
import { syncUrl } from '../../utils/syncUrl'
import { pagesCount } from '../../redux/selectors'

export const Pagination = () => {
    const dispatch = useDispatch()
    const page = useSelector(state => state.search.page)
    const pages = useSelector(state => state.movies.pages)
    const currentPages = useSelector(state => pagesCount(state))

    const switchPage = number => {
        syncUrl(window.location.pathname, { name: 'page', target: number })
        dispatch(setPage(number))
    }

    return (
        <div className="pagination">
            {page > 1 && <div
                className="pagination__back"
                onClick={() => switchPage(page - 1)}
            >
                Previous Page
                    </div>
            }
            {currentPages && currentPages.map((i) =>
                <button
                    className={i === page ? 'active' : ''}
                    key={i}
                    onClick={() => switchPage(i)}
                >
                    {i}
                </button>
            )}
            {(page !== pages && pages > 0) && <div
                className="pagination__next"
                onClick={() => switchPage(1 + page)}
            >
                Next Page
                    </div>
            }
        </div>
    )
}