import passport from "passport";
import "./strategies/local"; // Side-effect import to register the local strategy

// Optional: Define your user type
interface User {
  id: string;
  email?: string;
}

passport.serializeUser((user: Express.User, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (user: Express.User, done) => {
  try {
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
