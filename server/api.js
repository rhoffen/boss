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

//checkMillionDollarIdea check for /ideas POST and PUT routes
apiRouter.post('/ideas', checkMillionDollarIdea);

//check whether ID is valid for PUT route before checkMillionDollarIdea
apiRouter.put('/ideas/:id', (req, res, next) => {
    if(!getFromDatabaseById('ideas', req.params.id)) {
        return res.status(404).send();
    }
    next();
},checkMillionDollarIdea);

apiRouter.get(`/:reqType`, (req, res, next) => { 
    const list = getAllFromDatabase(req.params.reqType);
    res.send(list);
  });

apiRouter.get('/:reqType/:id', (req, res, next) => {
    const item = getFromDatabaseById(req.params.reqType, req.params.id);
    if (!item) {
        res.status(404).send();
    }
    res.send(item);
});

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

apiRouter.delete('/:reqType/:id', (req, res, next) => {
    const reqType = req.params.reqType;
    const deleted = deleteFromDatabasebyId(reqType, req.params.id);
    
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

apiRouter.delete('/meetings', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings');
    res.status(204).send(deleted);
});


module.exports = apiRouter;
