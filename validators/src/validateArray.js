module.exports = (array, explain = 'array') => {
    if (!(array instanceof Array)) throw new TypeError(`${explain} is not instance of array`)
}