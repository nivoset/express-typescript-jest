import User from "../types/User"
import uuid from "uuid";

let userList: User[] = [];

// const removeUser = (userId) => ({id}) => id !== userId; ???
const removeUser = (userId: string): ((value: User) => boolean) => 
		({id} : User): boolean => id !== userId;

export default {
    getAll: () : User[] => [...userList],
    addUser: (user : User) : number => userList.push({...user, id: uuid()}),
    removeUserById: (userId: string): boolean => {
        const originalLength = userList.length;
        userList = userList.filter(removeUser(userId));
        return (originalLength > userList.length);
    }
}