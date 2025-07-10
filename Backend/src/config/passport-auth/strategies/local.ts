import passport from "passport";
import { Strategy } from "passport-local";

import { compareSync } from "bcryptjs";
import prisma from "../../prisma/client";

interface IVerifyCallback {
  (
    error: any,
    user?: Express.User | false,
    options?: { message: string }
  ): void;
}

interface IStrategyOptions {
  usernameField: string;
}

passport.use(
  new Strategy(
    {
      usernameField: "email",
    } as IStrategyOptions,
    async (email: string, password: string, done: IVerifyCallback) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          return done(null, false, { message: "No user found" });
        }

        const isMatch = await compareSync(password, user.password);
        if (isMatch) {
          return done(null, user); // User found and password matches
        }

        return done(null, false, { message: "Invalid Credentials" });
      } catch (error) {
        done(error);
      }
    }
  )
);
