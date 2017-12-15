export default class UsersDAO {
  constructor(users) {
    this.users = users;
  }
  getAllUsers() {
    return this.users || [];
  }
}
