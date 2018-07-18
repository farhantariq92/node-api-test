const express = require('express');
var MongoClient = require('mongoose');

const Routes = require('./api/routes/index');

const app = express();

const port = process.env.PORT || 3000;

const url = `mongodb://localhost:27017/node-rest-api`;

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log("Database created!");
});


app.listen(port, () => {
    console.log('Server is listening at ' , port);
});
