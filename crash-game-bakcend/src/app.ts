import { connectDB } from "config/db";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import routes from "routes";
import cors from "cors";
import session from "express-session";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
    // allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/api", routes);

app.get("/", (_, res) => {
  res.status(200).json({ message: "Backend is running" });
});

connectDB();

export default app;
