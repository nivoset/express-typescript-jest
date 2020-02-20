import request from "supertest";
import server from "../../server"
import mockDb from "../../mock-database"

describe("/users", () => {
    let app : any;
    beforeAll((done) => {
        app = server.listen(8082, done);
    })
	it("GET users", (done) => {
        const mockResults = [{ name: "Mock user", id: "mock ID" }];
        spyOn(mockDb, "getAll").and.returnValue(mockResults);
		request(app)
				.get("/users")
				.expect(200)
                .expect("content-type", "application/json; charset=utf-8")
                .then(({body}) => {
                    expect(body).toEqual(mockResults);
                })
				.then(done);
	});
	it("POST add to users", (done) => {
        spyOn(mockDb, "addUser").and.returnValue(null);
		request(app)
                .post("/users")
                .set({ name: "User name"})
				.expect(200)
                .expect("content-type", "text/html; charset=utf-8")
                .then(({text}) => {
                    expect(text).toEqual("ok");
                })
				.then(done);
	});
	it("DELETE users -- Passes", (done) => {
        spyOn(mockDb, "removeUserById").and.returnValue(true);
		request(app)
                .delete("/users/FAKEUSER")
				.expect(200)
                .expect("content-type", "text/html; charset=utf-8")
                .then(({text}) => {
                    expect(text).toEqual("ok");
                })
				.then(done);
	});
	it("DELETE users -- fails", (done) => {
        spyOn(mockDb, "removeUserById").and.returnValue(false);
		request(app)
                .delete("/users/FAKEUSER")
				.expect(404)
                .expect("content-type", "text/html; charset=utf-8")
                .then(({text}) => {
                    expect(text).toEqual("User Id not found");
                })
				.then(done);
	});

	afterAll((done) => {
		app.close(done);
	});
});