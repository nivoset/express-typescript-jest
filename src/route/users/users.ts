import { Router, Request, Response } from 'express'
import mockDb from '../../mock-database'
import bodyParser from "body-parser";
import {getLogger} from '../../log';

const log = getLogger(__filename);

const users = Router();

users.get('/', (req : Request, res : Response): void  => {
	log.debug("get users called");
	res.status(200).json(mockDb.getAll());
});

users.post('/', 
	bodyParser.json(),
	(req :Request, res : Response) : void => {

		log.debug("add/post users called");
		const {name} = req.body;
		mockDb.addUser({name});
		res.status(200).send("ok");
	});

users.delete('/:userId', function removeThisUser (req :Request, res : Response) : void {
	const userId : string = req.params.userId;
	log.debug(`removing usersId=${userId}`);

	if (mockDb.removeUserById(userId)) {
		res.status(200).send("ok");
	} else {
		log.error(`error removing id=${userId}`);
		res.status(404).send("User Id not found");
	}
});

export default users;
