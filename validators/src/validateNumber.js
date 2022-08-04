module.exports = (number, explain = 'number') => {
    if(typeof number !== 'number') throw new TypeError(`${explain} is not a number`)
}