const express = require('express');
const mongoose = require('mongoose');

const Routes = require('./api/routes/index');

const app = express();

Routes(app);

const port = process.env.PORT || 3000;

const url = `mongodb://localhost:27017/nodeRestApi`;

mongoose.connect(url, (err, db) => {
    if (err) throw err;
    console.log("Database created!");
});

app.listen(port, () => {
    console.log('Server is listening at ' , port);
});
