const bcrypt = require('bcrypt');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

class CheckAuth {

  static async verifyToken (req, res) {

    try {

    let token = req.headers.token;

    let decoded = jwt.verify(token, 'secret');

    req.user = decoded;

    next();

    } catch(err) {

      res.status(409).json({
        message: 'Auth failed'
      });

    }

  }

}

module.exports = CheckAuth;