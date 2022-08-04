module.exports = (date, explain = 'date') => {
    if (!(date instanceof Date)) throw new TypeError(`${explain} is not instance of Date`)
}