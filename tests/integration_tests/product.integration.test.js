const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("../../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");

describe("Product", () => {
  let mongoServer;

  beforeAll(async () => {
    jest.setTimeout(6000);
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { dbName: "fashion-test" });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("GET /get-products", () => {
    describe("given that get product failed", () => {
      it("should return a 500", (done) => {
        request(app)
          .post("/admin/api/get-products")
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe("given that get product succeeded", () => {
      it("should return a 200", (done) => {
        request(app)
          .get("/admin/api/get-products")
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });

  describe("POST /add-product", () => {
    describe("given the product endpoint not correct", () => {
      it("should return a 404", (done) => {
        request(app)
          .get("/admin/api/add-product")
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    // describe("given the product creation", () => {
    //   it("should check if an image exists", () => {
    //     const absolutePath = path.resolve(
    //       __dirname,
    //       "../test_assets/shoe_four.webp"
    //     );
    //     console.log("Absolute path", absolutePath);
    //     const exists = fs.existsSync(absolutePath);
    //     expect(exists).toBe(true);
    //   });

    //   it("should check if an image does not exist", () => {
    //     const absolutePath = path.resolve(
    //       __dirname,
    //       "../test_assets/shoe.webp"
    //     );
    //     const exists = fs.existsSync(absolutePath);
    //     expect(exists).toBe(false);
    //   });
    // });

    describe("given the product creation failed", () => {
      it("should return a 500", (done) => {
        const productPayload = {
          title: "Product 1",
          description: "This is the product for testing purposes updated",
          price: 20.0,
          category: "648076ad01716fbeaaa9799e",
          details: "<p>Information has been updated</p>",
        };

        request(app)
          .post("/admin/api/add-product")
          .field("title", productPayload.title)
          .field("description", productPayload.description)
          .field("price", productPayload.price)
          .field("category", productPayload.category)
          .field("details", productPayload.details)
          .expect(500)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });

    describe("given the product creation succeeds", () => {
      it("should return a 200", (done) => {
        const productPayload = {
          title: "Product 1",
          description: "This is the product for testing purposes updated",
          price: 20.0,
          category: "648076ad01716fbeaaa9799e",
          details: "<p>Information has been updated</p>",
        };

        request(app)
          .post("/admin/api/add-product")
          .field("title", productPayload.title)
          .field("description", productPayload.description)
          .field("price", productPayload.price)
          .field("category", productPayload.category)
          .field("details", productPayload.details)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            done();
          });
      });
    });
  });
});
