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
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (!minion) {
        res.status(404).send();
    }
    console.log(req.body);
    res.send(minion);
});






module.exports = apiRouter;
