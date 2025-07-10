import express, { Request, Response } from "express";
import session from "express-session";
import passport from "./config/passport-auth/setup";
import FileStoreFactory from "session-file-store";
import OriginRoute from "./OriginRoutes";
import globalErrorHandler from "./middleware/errorHandler";
import cors from "cors";
const app = express();
const port = 8979;

const FileStore = FileStoreFactory(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new FileStore({
      path: "./sessions",
      retries: 1,
    }),
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/v1", OriginRoute);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
