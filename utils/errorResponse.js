
exports.errorResponse = (msg, added = {}) => {
    return { 
        error: true, 
        message: msg, 
        ...added
    }
}