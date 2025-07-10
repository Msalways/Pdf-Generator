import { NextFunction, Request, Response } from "express";

const validateSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized access. Please log in." });
};

export default validateSession;
