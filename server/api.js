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

const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

apiRouter.use('/', (req, res, next) => {
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
    next();
});

apiRouter.post('/ideas', checkMillionDollarIdea);
apiRouter.put('/ideas:id', checkMillionDollarIdea);

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
