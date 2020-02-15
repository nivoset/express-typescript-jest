import express from "express" ;
import users from "./route/users/users";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 8080; // default port to listen

app.use(bodyParser.json({ type: 'application/json' }));
app.use(users);
app.use(express.static("/html"));

// start the Express server
app.listen( port, () => {
	console.log(`server started at http://localhost:${port}`);
});