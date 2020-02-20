import db from "../../src/mock-database/index"
import User from "../../src/types/User"

describe("Mock DB", () => {
    beforeEach(() => {
        //clear every existing entry
        db.getAll()
            .map(({id} : User) => id)
            .forEach(db.removeUserById)
    });
    it("adds user", () => {
        const name = "Test User";
        db.addUser({ name });
        const allUsers = db.getAll()
        expect(allUsers
            .map(({name}: User) => name)
            .includes(name))
                .toBe(true);
        expect(allUsers.length).toBe(1);
    });
    it("removes User", () => {
        const name = "Test User";
        db.addUser({ name });
        db.addUser({ name: "second name that is not removed" });
        const allUsers = db.getAll()
        expect(allUsers
            .map(({name}: User) => name)
            .includes(name))
                .toBe(true);
        const id = allUsers
            .find((user : User) => user.name = name).id;

        //remove user just added
        db.removeUserById(id);

        //1 user left
        expect(db.getAll().length).toBe(1);
    });
});