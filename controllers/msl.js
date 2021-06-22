const { errorResponse } = require("../utils/errorResponse");
const { fetch } = require("../utils/fetch");
const { logError } = require("../utils/logError");
const stringVals = require('../utils/stringVals');

exports.fetchNews = (req, res) => {
    const id = req.params.id;
    if (id){
        fetch(stringVals.MSL_NEWS + id)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send(errorResponse('Failed to retrieve News from MSL', {response: err}));
            logError('MSL', 'Failed to retrieve News', req, err)
        })
    }
    else res.status(202).send([]);
}

exports.fetchEvents = (req, res) => {
    let id = req.params.id || '6013';
    fetch(stringVals.MSL_EVENTS + id)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(500).send(errorResponse('Failed to retrieve Events from MSL', {response: err}));
        logError('MSL', 'Failed to retrieve Events', req, err)
    })
}