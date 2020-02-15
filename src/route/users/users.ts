import { Router, Request, Response } from 'express'
import uuid from 'uuid';
import User from '../../types/User';

const users = Router();

let userList : User[] = [];

users.get('/users', (req : Request, res : Response): void  => {
	res.status(200).json(userList);
});

users.post('/user', (req :Request, res : Response) : void => {
	const {name} = req.body;
	const id = uuid();
   userList.push({ name, id });
   res.status(200).send("ok");
});

users.delete('/user/:userId', (req :Request, res : Response) : void => {
	const originalLength = userList.length;
	const userId : string = req.params.userId;
	userList = userList.filter(removeUser(userId));
	if (originalLength > userList.length) {
		res.status(200).send("ok");
	} else {
		res.status(404).send("User Id not found");
	}
});

export default users;

// const removeUser = (userId) => ({id}) => id !== userId; ???
const removeUser = (userId: string): ((value: User) => boolean) => 
		({id} : User): boolean => id !== userId;

