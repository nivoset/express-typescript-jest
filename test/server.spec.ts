import request from "supertest";
import server from "../src/server"


describe("GET / - a get index file", () => {
	let app : any;
	beforeAll((done) => {
		app = server.listen(8081, done);
	})
	it("HTML loaded", (done) => {
		request(app)
				.get("/")
				.expect(200)
				.expect("content-type", "text/html; charset=UTF-8")
				.end(done);
	});
	it("404 random other request", (done) => {
		request(app)
				.get("/not-valid-item.html")
				.expect(404)
				.end(done);
	});

	afterAll((done) => {
		app.close(done);
	});
});