import express from "express" ;
import users from "./route/users/users";
import path from "path";
import {getLogger} from './log';

const log = getLogger(__filename);
const app = express();
const port = process.env.PORT || 8080; // default port to listen

app.use("/users", users);
app.use(express.static(path.join( __dirname, "../html" ))); //static html being served

// start the Express server
export default app.listen( port, () => log.info(`Server started at http://localhost:${port}`));