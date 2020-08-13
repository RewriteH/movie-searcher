export const getParam = (param, type) => {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get(param)) {
        if (type === 'number') return +searchParams.get(param)
        if (type === 'arr') return searchParams.get(param).split(',')
        return searchParams.get(param)
    } else {
        return ''
    }

}