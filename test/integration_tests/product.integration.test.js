const fs = require("fs");
const request = require("supertest");
const app = require("../../app");
const mongoTestDB = require("../connect-db");

let connection;
let loginResponse;

beforeAll(async () => {
  connection = await mongoTestDB.connect();
});

afterAll(async () => {
  await mongoTestDB.disconnect(connection);
  await mongoTestDB.stop();
});

describe("POST /admin/api/add-product", () => {
  describe("given that user wants to add product", () => {

    test("should fail to register user", async () => {
            const userDetails = {
              email: "viewuenoch@gmail.com",
              password: "Litercy1995",
              firstname: "Enoch",
              lastname: "Viewu",
              provider: "local",
              role: "admin",
            };
            try {
              const { statusCode, body, header } = await request(app)
                .post("/auth/signup")
                .field("email", userDetails.email)
                .field("password", userDetails.password)
                .field("firstname", userDetails.firstname)
                .field("lastname", userDetails.lastname)
                .field("provider", userDetails.provider)
                .field("role", userDetails.role);
              expect(statusCode).toBe(400);
              expect(body).toHaveProperty("response");
              expect(body).toHaveProperty("msg");
              expect(header["content-type"]).toMatch(/json/);
            } catch (err) {
              console.error("Sign up error", err);
              throw err;
            }
    })

    test("should register user", async () => {
      const userDetails = {
        email: "viewuenoch@gmail.com",
        password: "Liter@cy1995",
        firstname: "Enoch",
        lastname: "Viewu",
        provider: "local",
        role: "admin",
      };
      try {
        const { statusCode, body, header } = await request(app)
          .post("/auth/signup")
          .field("email", userDetails.email)
          .field("password", userDetails.password)
          .field("firstname", userDetails.firstname)
          .field("lastname", userDetails.lastname)
          .field("provider", userDetails.provider)
          .field("role", userDetails.role);
        console.log("Sign up response", body);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("response");
        expect(body).toHaveProperty("msg");
        expect(header["content-type"]).toMatch(/json/);
      } catch (err) {
        console.error("Sign up error", err);
        throw err;
      }
    });

    test("should login in user", async () => {
      const userDetails = {
        email: "viewuenoch@gmail.com",
        password: "Liter@cy1995",
      };
      try {
        loginResponse = await request(app)
          .post("/auth/signin")
          .field("email", userDetails.email)
          .field("password", userDetails.password);
        expect(loginResponse.statusCode).toBe(200);
        expect(loginResponse.body).toHaveProperty("response");
        expect(loginResponse.body).toHaveProperty("msg");
        expect(loginResponse.header["content-type"]).toMatch(/json/);
      } catch (err) {
        throw err;
      }
    }, 10000);

    test("should payload be missing", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .post("/admin/api/add-product")
          .set("Cookie", loginResponse.headers["set-cookie"]);
        expect(statusCode).toBe(400);
        expect(header["content-type"]).toMatch(/json/);
        expect(body).toHaveProperty("response");
        expect(body).toHaveProperty("msg");
      } catch (err) {
        throw err;
      }
    });

    test("should payload be available", async () => {
      const productPayload = {
        title: "Product 1",
        description: "This is the product for testing purposes updated",
        price: 20.0,
        category: "648076ad01716fbeaaa9799e",
        details: "<p>Information has been updated</p>",
      };

      try {
        const { body, statusCode, header } = await request(app) //requesting for data from the endpoint
          .post("/admin/api/add-product")
          .set("Cookie", loginResponse.headers["set-cookie"])
          .field("title", productPayload.title)
          .field("description", productPayload.description)
          .field("price", productPayload.price)
          .field("category", productPayload.category)
          .field("details", productPayload.details)
          .attach("image", "test/test_assets/shoe_four.webp");

        expect(statusCode).toBe(200); //Expect the status code of response to be 200
        expect(header["content-type"]).toMatch(/json/); //Expect the content type of the response to be json
        expect(body).toHaveProperty("response"); //Expect the body to have a property called response
        expect(body).toHaveProperty("msg"); //Expect the body to have a property called msg

        fs.unlink(body.response.imageUrl, (err) => {
          if (err) {
            throw err;
          }
        });
      } catch (err) {
        throw err;
      }
    });
  });
});

describe("GET /admin/api/get-products", () => {
  describe("given that user wants to get product", () => {
    test("should get products", async () => {
      try {
        const { body, statusCode, header } = await request(app) //requesting for data from the endpoint
          .get("/admin/api/get-products")
          .set("Cookie", loginResponse.headers["set-cookie"]);
        expect(statusCode).toBe(200); //Expect the status code of response to be 200
        expect(header["content-type"]).toMatch(/json/); //Expect the content type of the response to be json
        expect(body).toHaveProperty("response"); //Expect the body to have a property called response
        expect(body).toHaveProperty("msg"); //Expect the body to have a property called msg
      } catch (err) {
        throw err;
      }
    });
  });
});
