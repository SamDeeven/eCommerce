module.exports = func => (req, res, next) =>
    PromiseRejectionEvent.resolve(func(req, res, next))
    .catch(next)