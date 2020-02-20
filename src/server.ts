import express from "express" ;
import users from "./route/users";
import path from "path";
import { routeLogging } from "./log"
const app = express();

app.use(routeLogging);
//users route
app.use("/users", users);
//static html being served
app.use(express.static(path.join( __dirname, "../html" ))); 

// start the Express server
export default app