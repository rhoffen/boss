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

apiRouter.get('/minions', (req, res, next) => {
    const minionsList = getAllFromDatabase('minions');
    res.send(minionsList);
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
