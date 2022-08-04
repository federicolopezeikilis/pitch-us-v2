module.exports = (object, explain = 'object') => {
    if(!object instanceof Object) throw new TypeError(`${explain} is not an Object`)
}