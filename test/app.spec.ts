import * as logger from "../src/log";
import { Logger } from "winston";

xdescribe("App test", () => {
    let log : Logger;
    beforeAll(() => {
        log = logger.getLogger(__filename);
        spyOn(log, "info").and.callThrough();
        spyOn(logger, "getLogger").and.returnValue(log)
    })

    it("Test that listen was called and it opened on a specific port?", (done) => {
        require("./app");
        //i hate this......
        setTimeout(() => {
            expect(log.info).toBeCalled();
            done();
        }, 10)
    });
});