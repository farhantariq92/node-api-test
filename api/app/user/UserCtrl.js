const UserHandler = require('./UserHandler');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

class UserCtrl {

  static async signUp(req, res) {

    try {

      let user = await UserHandler.findUser(req.body.email);

      if (user) {

        return res.status(409).json({message: 'User already exist'});

      }

      const hash = await promisify(bcrypt.hash)(req.body.password, 10);

      console.log('hashed password is: ', hash);

      user = await UserHandler.createUser(req.body.email, hash);

      res.status(200).json({
        message: 'User successfully created.'
      });

    } catch (err) {

      console.log('Error occured during user signup', err.message, err.stack);

      res.status(500).json({
        message: err.message
      });

    }

  }

  static async login (req, res) {

    try {

      const user = await UserHandler.findUser(req.body.email);

      if (!user) {

        return res.status(404).json({
          message: 'Auth failed'
        });

      }

      const result = await promisify(bcrypt.compare)(req.body.password, user.password);

      if (!result) {

        return res.status(404).json({
          message: 'Auth failed'
        });

      }

      const token = jwt.sign({
        email: user.email,
        userId: user._id
      },
      "secret",
      {
        expiresIn: "1h"
      }
    );

      res.status(200).json({
        message: 'Auth Successful',
        token
      });




    } catch (err) {
      res.status(404).json({
        message: 'Auth failed'
      });
    }

  }

  static async deleteUser(req, res) {

    try {

      await UserHandler.deleteUser(req.params.email);

      res.status(200).json({
        message: `User ${req.params.email} successfully delete.`
      });

    } catch (err) {

      console.log('Error occured during user delete', err.message, err.stack);

      res.status(500).json({
        message: err.message
      });

    }

  }

}

module.exports = UserCtrl;
