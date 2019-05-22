const express = require('express');
const apiRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('./db.js');
//const minionsRouter = require('./minions.js');
//const app = require('../server.js');

//app.use('/minions', minionsRouter);
console.log("debug apiRouter");
//console.log(req);

apiRouter.get('/minions', (req, res, next) => {
    const minionsList = getAllFromDatabase('minions');
    res.send(minionsList);
  });

apiRouter.get('/minions/:minionId', (req, res, next) => {
    //console.log(req);
    console.log('id = ' + req.params.id);
    const minion = getFromDatabaseById('minions', req.params.id);
    res.send(minion);
});






module.exports = apiRouter;
