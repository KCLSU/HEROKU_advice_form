
exports.fetchNews = (req, res) => {
        let id = req.params.id;
        let url = `https://kclsu.org/svc/feeds/news/${id}`
        fetchNews(url)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {res.status(500).send({"error":err, "status": "Failed"})})
}

exports.fetchEvents = (req, res) => {
    let id = req.params.id;
    let url = `https://kclsu.org/svc/feeds/events/${id}`
    fetchNews(url)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {res.status(500).send({"error":err, "status": "Failed"})})
}