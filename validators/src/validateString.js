module.exports = (string, explain = 'string') => {
    if (typeof string !== 'string') throw new TypeError(`${explain} is not a string`)
}