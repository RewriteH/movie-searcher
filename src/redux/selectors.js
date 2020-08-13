import { createSelector } from 'reselect'
import { pagination } from "../utils/pagination"

const getPage = state => state.search.page
const getPages = state => state.movies.pages

export const pagesCount = createSelector(
    [getPage, getPages],
    (page, pages) => pagination(pages, 5, Number(page))
)