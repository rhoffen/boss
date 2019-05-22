const express = require('express');
const app = express();


module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
const cors = require('cors');

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');

// Mount your existing apiRouter below at the '/api' path.

const apiRouter = require('./server/api');

app.use('/api', apiRouter);
app.use(bodyParser.json());

// app.param('minionId', (req, res, next, id) => {
//   const minionId = Number(id);
//   req.id = minionId;
//   next();
// });

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:

  server.listen(PORT, err => {
    if (err) {
      return console.log('Server did not start successfully: ', err);
    }

    console.log(`Server is listening on ${PORT}`);
  });

}
