process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const server = require("../src/server/index");

describe("Sample Test", () => {
  it("should pass (1 + 2 = 3)", (done) => {
    const sum = 1 + 2;
    sum.should.eql(3);
    sum.should.not.eql(4);
    done();
  });
  it("verify environment", (done) => {
    // todo
    done();
  });
});
