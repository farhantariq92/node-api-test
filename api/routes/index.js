const product = require('./product');
const user = require('./user');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const checkAuth = require('../app/middleware/checkAuth');

const routes = (app) => {

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {

      res.header('Access-Control-Allow-Methods', '*');
      return res.status(200).json({});

    }

    next();

  });

  app.use('/api/v1', user);

  app.use(checkAuth.verifyToken);

  app.use('/api/v1', product);

  app.use((req, res, next) => {

    const error = new Error('Invalid Api end point');
    error.status = 404;
    next(error);

  });

  app.use((error, req, res, next) => {

    res.status(error.status || 500);

    res.json({
      error: {
        message: error.message
      }
    });

  });

};

module.exports = routes;
