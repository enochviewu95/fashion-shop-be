const request = require("supertest");
const app = require("../../app");


describe("GET /test", () => {
    describe("given that test does not work", () => {
      it("should return a 500", (done) => {
        request(app)
          .post("/index/get-test")
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe("given that test works", () => {
        it("should return a 200", (done) => {
          request(app)
            .get("/index/get-test")
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              done();
            });
        });
      });
  });
