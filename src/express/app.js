import express from "express";
import cookieMiddleware from "./middlewares/cookieMiddleware";
import queryMiddleware from "./middlewares/queryMiddleware";
import setCookieMiddleware from "./middlewares/setCookieMiddleware";
import checkMiddleware from "./middlewares/checkMiddleware";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();
//for post routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(setCookieMiddleware); //testing
app.use(cookieMiddleware);
app.use(queryMiddleware);
app.use(checkMiddleware); //testing

app.use(routes);

export default app;
