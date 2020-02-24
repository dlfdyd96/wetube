import "core-js";
import express from "express";
import morgan from "morgan";
import helmet from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));


app.use("/", globalRouter); // 글로벌 router는 /join, /login, /home
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;