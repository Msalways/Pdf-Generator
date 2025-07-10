import { Router } from "express";
import { AuthRouter } from "./controller/Auth/Route";
import { ReportsRouter } from "./controller/Reports/Route";
import validateSession from "./middleware/validateSession";

const OriginRoute = Router();

OriginRoute.use("/Auth", AuthRouter);

OriginRoute.use("/Reports", validateSession, ReportsRouter);

export default OriginRoute;
