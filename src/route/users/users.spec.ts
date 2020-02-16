import request from "supertest";
import app from "../../app"


describe("/users", () => {
	it("GET users", (done) => {
		request(app)
				.get("/users")
				.expect(200)
                .expect("content-type", "application/json; charset=utf-8")
                .then(({body}) => {
                    expect(Array.isArray(body)).toBe(true);
                })
				.then(done);
	});
	it("POST users", (done) => {
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
		request(app)
                .post("/users")
                .set({ name: "User name"})
				.expect(200)
                .expect("content-type", "text/html; charset=utf-8")
                .then(async () => {
                    const {body} = await request(app).get("/users");
                    expect(body.length).toBeGreaterThan(0);
                    const [user] = body;
                    const {id} = user;
                    request(app)
                        .delete(`/users/${id}`)
                        .expect(200).end(done)
                });
	});
	it("DELETE users -- fails", (done) => {
		request(app)
                .delete("/users/FAKEUSER")
				.expect(404)
                .expect("content-type", "text/html; charset=utf-8")
                .then(({text}) => {
                    expect(text).toEqual("User Id not found");
                })
				.then(done);
	});

	afterAll(() => {
		app.close();
	});
});