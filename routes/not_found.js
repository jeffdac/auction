function notFound(val, res) {
    if (val === 'undefined' || val === 'null') {
        res.send({status: false, message: 'not found'});
        return true;
    }
    return false;
}

module.exports = notFound;