import passport from "passport";
import Strategy from "passport-local";
import users from "../datastubs/users";
import UsersDAO from "../dao/usersDAO";

passport.use(
  new Strategy(function(username, password, done) {
    UsersDAO.checkUserCredentials(username, password).then(user => {
      if (user) {
        done(null, { user: { email: user.email, username: user.username } });
      } else {
        done(null, false);
      }
    });
  })
);
export default passport;
