import history from 'history/browser';

export const syncUrl = (path, paramObj) => {
    let nextSearchParams = new URLSearchParams(window.location.search)

    if (paramObj.target.length === 0) {
        nextSearchParams.delete(paramObj.name)
        history.replace(`${path}?${nextSearchParams.toString()}`)
        return
    }

    if (window.location.pathname !== path) { // Очистка старых параметров
        nextSearchParams = new URLSearchParams()
    }

    if (typeof paramObj.target === 'object') {
        nextSearchParams.set(paramObj.name, paramObj.target.join(","))
    } else {
        nextSearchParams.set(paramObj.name, paramObj.target)
    }


    history.replace(`${path}?${nextSearchParams.toString()}`)
}