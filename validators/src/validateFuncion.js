module.exports = (func, explain = 'function') => {
    if (typeof func !== 'function')
        throw new TypeError(`${explain} is not a function`)
}