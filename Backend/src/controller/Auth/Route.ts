import { Router } from "express";
import { LocalSignIn, LogoutUser, SignUp, validateUserSesssion } from "./Logic";

const router = Router();

router.post("/signup", SignUp);

router.post("/signin/local", LocalSignIn);

router.post("/logout", LogoutUser);

router.get("/Validate", validateUserSesssion);

export { router as AuthRouter };
