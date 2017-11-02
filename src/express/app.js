import express from "express";
import cookieMiddleware from "./middlewares/cookieMiddleware";
import queryMiddleware from "./middlewares/queryMiddleware";
import routes from "./routes";
import bodyParser from "body-parser";
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.use(cookieMiddleware);
app.use(queryMiddleware);

export default app;
