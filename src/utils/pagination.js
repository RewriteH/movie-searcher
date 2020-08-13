export const pagination = (pages, pagesToShow, currPage) => {

    let res = []

    if (pages < 5) {
        for (let i = 1; i <= pages; i++) {
            res.push(i)
        }
        return res
    }

    let maxLeft = (currPage - Math.floor(pagesToShow / 2))
    let maxRight = (currPage + Math.floor(pagesToShow / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = pagesToShow
    }

    if (maxRight > pages) {
        maxLeft = pages - (pagesToShow - 1)
        maxRight = pages
    }

    for (maxLeft; maxLeft <= maxRight; maxLeft++) {
        res.push(maxLeft)
    }

    return res
}