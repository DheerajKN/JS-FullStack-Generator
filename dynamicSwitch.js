module.exports = (type, fnArray) => {
    const action = fnArray.find(fn => fn.key === type);
    if (action) {
        action.fn()
    } else {
        fnArray[0].fn()
    }
}