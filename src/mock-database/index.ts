import User from "../types/User"
import uuid from "uuid";
import {getLogger} from '../log';

const log = getLogger("mock database");

let userList: User[] = [];

// const removeUser = (userId) => ({id}) => id !== userId; did i get this right?
const removeUser = (userId : string):
        ((value: User) => boolean) => ({id} : User): boolean => id !== userId;

export default {
    getAll: () : User[] => [...userList.map((user : User) => ({...user}))],
    addUser: (user : User) : void => { userList.push({...user, id: uuid()}) },
    removeUserById: (userId: string) : boolean => {
        log.debug(`Removing userId=${userId}`);
        const originalLength = userList.length;
        userList = userList.filter(removeUser(userId));

        return (originalLength > userList.length);
    }
}