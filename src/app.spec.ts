import request from "supertest";
import app from "./app"


describe("GET / - a get index file", () => {
	it("HTML loaded", (done) => {
		request(app)
				.get("/")
				.expect(200)
				.expect("content-type", "text/html; charset=UTF-8")
				.end(done);
	});

	afterAll(() => {
		app.close();
	});
});