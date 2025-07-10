import { NextFunction, Request, Response } from "express";

import passport from "../../config/passport-auth/setup";
import { hash } from "bcryptjs";
import prisma from "../../config/prisma/client";
import { AuthSchema, SignupSchema } from "./Validation";

const LocalSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await AuthSchema.parseAsync(req.body);
    req.body = validatedData;
    passport.authenticate(
      "local",
      (err: any, user: Express.User, info: { message: any }) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res
            .status(401)
            .json({ message: info.message || "Authentication failed" });
        }
        req.login(user, (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }
          return res.status(200).json({ message: "Login successful", user });
        });
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

const SignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await SignupSchema.parseAsync(req.body);
    const { email, password, name } = validatedData;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

const LogoutUser = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      res.status(500).json({ message: "Logout failed", error: err });
    }
    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        res
          .status(500)
          .json({ message: "Session destruction failed", error: sessionErr });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout successful" });
    });
  });
};

const validateUserSesssion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.isAuthenticated()) {
      console.log(req.user);

      const user = await prisma.user.findFirst({
        where: { id: req?.user },
      });
      if (!user) {
        throw new Error("User not found");
      }
      res.status(200).json({ message: "User is authenticated", user });
    } else {
      res.status(401).json({ message: "User is not authenticated" });
    }
  } catch (error) {
    next(error);
  }
};

export { LocalSignIn, SignUp, LogoutUser, validateUserSesssion };
