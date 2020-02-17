import {getLogger} from "./index"

describe("Logger tests", () => {
    const baseEnv = {...process.env};
    describe("non-prod", () => {
        beforeAll(() => {
            jest.resetModules();
            process.env = {...baseEnv, NODE_ENV: "not-production"};
        });
        it("generates non prod logger", () => {
            const log = getLogger(__filename);
            log.debug("debug log");
        })
    });

    describe("prod", () => {
        beforeAll(() => {
            jest.resetModules();
            process.env = {...baseEnv, NODE_ENV: "production"};
        });
        it("generates non prod logger", () => {
            const log = getLogger(__filename);
            log.debug("debug log");
        })
    });

})