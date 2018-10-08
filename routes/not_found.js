function notFound(val, res) {
    if (val === 'undefined' || val === 'null') {
        throw new Error({status: false, message: 'not found'});
    }
}

module.exports = notFound;