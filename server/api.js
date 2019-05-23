const express = require('express');
const apiRouter = express.Router();
//const app = express();

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('./db.js');

apiRouter.use('/', (req, res, next) => {
    //console.log(req.method);
    //console.log(req.path);
    const url = req.path;
    const getRequestRoute = (url) => {
    url.split('/').filter(segment => segment);
    }
    const reqType = getRequestRoute[0];
    req.params.reqType = reqType;
    req.path = `/${reqType}`
    if (getRequestRoute[1]) {
        reqId = getRequestRoute[1];
        req.params.id = reqId;
        req.path += `/${id}`
    };
    //console.log(req.path);
    next();
});

//apiRouter.get('/minions', (req, res, next) => {
apiRouter.get(`/:reqType`, (req, res, next) => { 
    //const minionsList = getAllFromDatabase('minions');
    const list = getAllFromDatabase(req.params.reqType);
    //res.send(minionsList);
    res.send(list);
  });

apiRouter.get('/minions/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (!minion) {
        res.status(404).send();
    }
    res.send(minion);
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const id = req.params.minionId;
  
    let minion = getFromDatabaseById('minions', id);
 
    if (!minion) {
        res.status(404).send();
    }
 
    const {name, title, weaknesses, salary} = req.body;

    if (name) {minion.name = name};
    if (title) {minion.title = title};
    if (weaknesses) {minion.weaknesses = weaknesses};
    if (salary) {minion.salary = salary};

    updateInstanceInDatabase('minion', minion);
    res.send(minion);
});

apiRouter.post('/minions', (req, res, next) => {
    const addMinion = addToDatabase('minions', req.body);
    res.status(201).send(addMinion);
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});




module.exports = apiRouter;
