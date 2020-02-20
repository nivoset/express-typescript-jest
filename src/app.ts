import {getLogger} from './log';
import server from "./server"

const log = getLogger("app");
const port = process.env.PORT || 8080; // default port to listen

// start the Express server
 export default server.listen(port, () => log.info(`Server started on port=${port}`));