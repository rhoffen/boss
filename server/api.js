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

const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

//checkMillionDollarIdea check for /ideas POST route
apiRouter.post('/ideas', checkMillionDollarIdea);

//check whether ID is valid for PUT route before checkMillionDollarIdea
apiRouter.put('/ideas/:id', (req, res, next) => {
    if(!getFromDatabaseById('ideas', req.params.id)) {
        return res.status(404).send();
    }
    next();
},checkMillionDollarIdea);

//get route for all request types but work
apiRouter.get(`/:reqType`, (req, res, next) => { 
    const list = getAllFromDatabase(req.params.reqType);
    res.send(list);
  });

//get by ID route for all request types but work
apiRouter.get('/:reqType/:id', (req, res, next) => {
    const item = getFromDatabaseById(req.params.reqType, req.params.id);
    if (!item) {
        res.status(404).send();
    }
    res.send(item);
});

//put route for all request types but work
apiRouter.put('/:reqType/:id', (req, res, next) => {
    const id = req.params.id;
    const reqType = req.params.reqType;
  
    const itemToEdit = getFromDatabaseById(reqType, id);

    if (!itemToEdit) {
        return res.status(404).send();
    }

    const editedItem = Object.assign({}, itemToEdit, req.body);

    const updatedItem = updateInstanceInDatabase(reqType, editedItem);
    res.send(updatedItem);
});

//post route for all request types but work
apiRouter.post('/:reqType', (req, res, next) => {
    let itemToAdd;
    const reqType = req.params.reqType;
    if (reqType === "meetings") {
        itemToAdd = createMeeting();
    } else {
        itemToAdd = req.body;
    }
    addItem = addToDatabase(reqType, itemToAdd);
    res.status(201).send(addItem);
});

//delete by id route for all request types but meeting and work
apiRouter.delete(['/:reqType/:id', '/minions/:minionId/:reqType/:id'], (req, res, next) => {
    const reqType = req.params.reqType;
    const deleted = deleteFromDatabasebyId(reqType, req.params.id);
    
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

//delete all route for /meetings
apiRouter.delete('/meetings', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings');
    res.status(204).send(deleted);
});

//bonus route - get array of all work for a specified minion
//apiRouter.get('', (req, res, next) => {});
apiRouter.get('/minions/:id/work', (req, res, next) => {
    const minionId = req.params.id;
    const minion = getFromDatabaseById('minions', minionId);
    if (!minion) {
        return res.status(404).send();
    }
    const allWork = getAllFromDatabase('work'); //this is an array of objects    
    let workArray = allWork.filter(work => work.minionId = minionId);
    return res.status(200).send(workArray);
});

apiRouter.put('/minions/:id/work/:workId', (req, res, next) => {
    const minionId = req.params.id;
    const minion = getFromDatabaseById('minions', minionId);
    if (!minion) {
        return res.status(404).send();
    }

    const workId = req.params.workId;
    const workItem = getFromDatabaseById('work', workId);
    if (!workItem) {
        return res.status(404).send();
    }

    const reqMinionId = req.body.minionId;
    if (!getFromDatabaseById('minions', reqMinionId)) {
        return res.status(400).send();
    }

    const editedWorkObj = Object.assign({}, workItem, req.body);
    
    const updatedWorkObj = updateInstanceInDatabase('work', editedWorkObj);

    res.status(201).send(updatedWorkObj);
});

module.exports = apiRouter;
