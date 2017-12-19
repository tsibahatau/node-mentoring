import db from "../models";
const { User } = db;

export default class UsersDAO {
  static getAllUsers() {
    return User.findAll();
  }

  static checkUserCredentials(username, password) {
    return User.findOne({ where: { username } }).then(user => {
      if (!user) {
        return null;
      } else {
        return user.isPasswordValid(password);
      }
    });
  }
}
