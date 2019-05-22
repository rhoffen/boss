// const express = require('express');
// const minionsRouter = express.Router();

// const {
//     createMeeting,
//     getAllFromDatabase,
//     getFromDatabaseById,
//     addToDatabase,
//     updateInstanceInDatabase,
//     deleteFromDatabasebyId,
//     deleteAllFromDatabase,
//   } = require('./db.js');

// minionsRouter.get('/', (req, res, next) => {
//     console.log("debug minionsRouter");
//     const minionsList = getAllFromDatabase('minions');
//     res.send(minionsList);
//   });

// minionsRouter.get('/minions/:minionId', (req, res, next) => {
//     console.log('id = ' + req.params.id);
//     const minion = getFromDatabaseById('minions', req.params.id);
//     res.send(minion);
// });

// module.exports = minionsRouter;
