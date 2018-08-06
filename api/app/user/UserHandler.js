const User = require('./User');

class UserHandler {

static async findUser (email) {

    return User.findOne({email}).exec();

  }

  static async createUser (email, hashedPassword) {

    const user = new User({
      email,
      password: hashedPassword
    });

    return user.save();

  }

  static async deleteUser (email) {

    await User.remove({email: email}).exec();

  }


}

module.exports = UserHandler;