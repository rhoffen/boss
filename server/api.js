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

    if (!itemToEdit || Object.keys(req.body).length === 0) {
        //console.log('debug here');
        res.status(404).send();
    }

    const editedItem = Object.assign({}, itemToEdit, req.body);
    //console.log(`edited item: ${JSON.stringify(editedItem)}`);

    const updatedItem = updateInstanceInDatabase(reqType, editedItem);
    res.send(updatedItem);
});

apiRouter.post('/:reqType', (req, res, next) => {
    const addItem = addToDatabase(req.params.reqType, req.body);
    res.status(201).send(addItem);
});

apiRouter.delete('/:reqType/:id', (req, res, next) => {
    const deleted = deleteFromDatabasebyId(req.params.reqType, req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});




module.exports = apiRouter;
