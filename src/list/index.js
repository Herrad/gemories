const createList = require('./list');


function createListRoutes(router) {
    const list = createList();

    function makeHuman(listResult, key) {
        if(!listResult) return Promise.resolve(`I couldn't find anything for ${key}`)
        return Promise.resolve(`You told me ${listResult.name} was ${listResult.amount}`);
    }

    router.post('/create', (req, res) => list.start(req.body).then(() => res.send('')))
    router.post('/getitem', (req, res) => list.figureItOut(req.body.key.toLowerCase())
        .then(result => makeHuman(result, req.body.key.toLowerCase()))
        .then(result => res.send(result)))

    router.get('/show', (req, res) => list.showMe().then(result => {
        console.log('result', result)
        return result
    }).then(result => res.send(result)))

    return router;
}

module.exports = createListRoutes;