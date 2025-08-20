export const debug = (import.meta.env.VITE_DEBUG || '0') === '1'

export const getHashParams = ( hashPrefix ) => {
    // Get query parameters from the hash. For example:
    // #donation_result?bold-order-id=ORD-UNICO-1755628018815000000&bold-tx-status=approved
    const urlParamsArray = window.location.hash.replace("#" + (hashPrefix ?? ''), '').replace('?', '').split('&')
    const urlParams = {}
    for (const paramPair of urlParamsArray) {
        const pairArray = paramPair.split('=')
        const key = pairArray[0]
        const value = pairArray[1]
        urlParams[key] = value
    }
    return urlParams
}

export const getQueryParams = () => {
    const urlParamsArray = window.location.search.replace('?', '').split('&')
    const urlParams = {}
    for (const paramPair of urlParamsArray) {
        const pairArray = paramPair.split('=')
        const key = pairArray[0]
        const value = pairArray[1]
        urlParams[key] = value
    }
    return urlParams
}