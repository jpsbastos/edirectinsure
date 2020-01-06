import * as express from "express";
import * as bodyParser from "body-parser";
import { Router } from "./src/routes/router";
import * as mongoose from "mongoose";
import { errorHandler } from "./src/helpers/error-handler";
import { JwtHelper } from "./src/helpers/jwt-handler";
import { configuration } from "./configuration";

const app: express.Application = express();
const routePrv: Router = new Router();

// support application/json type post data
app.use(bodyParser.json());
//support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(configuration.connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// use JWT auth to secure the api
app.use(JwtHelper.jwt());

routePrv.routes(app)

// global error handler
app.use(errorHandler);

app.listen(configuration.port, () => {
    console.log('Express server listening on port ' + configuration.port);
})