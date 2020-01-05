import * as express from "express";
import * as bodyParser from "body-parser";
import { Router } from "./src/routes/router";
import * as mongoose from "mongoose";
import { errorHandler } from "helpers/error-handler";

const MONGO_URL = 'mongodb+srv://jpsbastos:eHKT3pHAx@cluster0-fvvjr.mongodb.net/test?retryWrites=true&w=majority';
const PORT = 3000;
const app: express.Application = express();
const routePrv: Router = new Router();

// support application/json type post data
app.use(bodyParser.json());
//support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
routePrv.routes(app)

// global error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})