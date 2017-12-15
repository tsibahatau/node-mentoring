import passport from "passport";
import Strategy from "passport-local";
import users from "../datastubs/users";

passport.use(
  new Strategy(function(username, password, done) {
    const user = users.find(
      user => user.username === username && user.password === password
    );
    // database dummy - find user and verify password
    if (user) {
      done(null, { user: { email: user.email, username: user.username } });
    } else {
      done(null, false);
    }
  })
);
export default passport;
