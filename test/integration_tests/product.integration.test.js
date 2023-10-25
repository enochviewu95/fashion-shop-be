const fs = require("fs");
const request = require("supertest");
const app = require("../../app");
const mongoTestDB = require("../connect-db");

let connection;
let imageUrl;

beforeAll(async () => {
  connection = await mongoTestDB.connect();
});

afterAll(async () => {
  await mongoTestDB.disconnect(connection);
  await mongoTestDB.stop();
});

describe("product", () => {
  describe("POST /auth", () => {
    test("should register user", async () => {
      const userDetails = {
        email: "viewuenoch@gmail.com",
        password: "literacy1995",
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
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("response");
        expect(body).toHaveProperty("msg");
        expect(header["content-type"]).toMatch(/json/);
      } catch (err) {
        throw err;
      }
    });

    test("should login in user", async () => {
      const userDetails = {
        email: "viewuenoch@gmail.com",
        password: "literacy1995",
      };
      try {
        const loginResponse = await request(app)
          .post("/auth/signin")
          .field("email", userDetails.email)
          .field("password", userDetails.password);
        // expect(loginResponse.statusCode).toBe(200);
        // expect(loginResponse.body).toHaveProperty("response");
        // expect(loginResponse.body).toHaveProperty("msg");
        // expect(loginResponse.header["content-type"]).toMatch(/json/);

           console.log("login response", loginResponse);

        const productPayload = {
          title: "Product 1",
          description: "This is the product for testing purposes updated",
          price: 20.0,
          category: "648076ad01716fbeaaa9799e",
          details: "<p>Information has been updated</p>",
        };

        const { body, statusCode, header } = await request(app) //requesting for data from the endpoint
          .post("/admin/api/add-product")
          .set("Cookie", loginResponse.headers["set-cookie"])
          .field("title", productPayload.title)
          .field("description", productPayload.description)
          .field("price", productPayload.price)
          .field("category", productPayload.category)
          .field("details", productPayload.details)
          .attach("image", "test/test_assets/shoe_four.webp");
        
                console.log("add product message", body);
        
        // imageUrl = body.response.imageUrl;


        // expect(statusCode).toBe(200); //Expect the status code of response to be 200
        // expect(header["content-type"]).toMatch(/json/); //Expect the content type of the response to be json
        // expect(body).toHaveProperty("response"); //Expect the body to have a property called response
        // expect(body).toHaveProperty("msg"); //Expect the body to have a property called msg
      } catch (err) {
        console.log('Error message',err)
        throw err;
      }
    });
  });

  // describe("POST /add-product", () => {
  //   describe("given that user wants to create product", () => {
  //     test("should user not be authorized", async () => {
  //       try {
  //         const { statusCode, body, header } = await request(app).post(
  //           "/admin/api/add-product"
  //         );
  //         expect(statusCode).toBe(401);
  //         expect(body).toHaveProperty("response");
  //         expect(body).toHaveProperty("msg");
  //         expect(header["content-type"]).toMatch(/json/);
  //       } catch (err) {
  //         throw err;
  //       }
  //     });
  //   });

  //   describe("given that product fields are not provided", () => {
  //     test("should return a 400 error", async () => {
  //       try {
  //         const { body, statusCode, header } = await request(app)
  //           .post("/admin/api/add-product")
  //           .set("Cookie", loginResponse.headers["set-cookie"]);
  //         expect(statusCode).toBe(400);
  //         expect(header["content-type"]).toMatch(/json/);
  //         expect(body).toHaveProperty("response");
  //         expect(body).toHaveProperty("msg");
  //       } catch (err) {
  //         throw err;
  //       }
  //     });
  //   });

  //   describe("given that product fields are provided", () => {
  //     afterEach((done) => {
  //       fs.unlink(imageUrl, (err) => {
  //         if (err) {
  //           done(err);
  //           throw err;
  //         } else {
  //           done();
  //         }
  //       });
  //     });

  //     //Testing for the creation of products
  //     test("should create a product", async () => {
  //       const productPayload = {
  //         title: "Product 1",
  //         description: "This is the product for testing purposes updated",
  //         price: 20.0,
  //         category: "648076ad01716fbeaaa9799e",
  //         details: "<p>Information has been updated</p>",
  //       };

  //       try {
  //         const { body, statusCode, header } = await request(app) //requesting for data from the endpoint
  //           .post("/admin/api/add-product")
  //           .field("title", productPayload.title)
  //           .field("description", productPayload.description)
  //           .field("price", productPayload.price)
  //           .field("category", productPayload.category)
  //           .field("details", productPayload.details)
  //           .attach("image", "test/test_assets/shoe_four.webp");
  //         imageUrl = body.response.imageUrl;

  //         expect(statusCode).toBe(200); //Expect the status code of response to be 200
  //         expect(header["content-type"]).toMatch(/json/); //Expect the content type of the response to be json
  //         expect(body).toHaveProperty("response"); //Expect the body to have a property called response
  //         expect(body).toHaveProperty("msg"); //Expect the body to have a property called msg
  //       } catch (err) {
  //         throw err;
  //       }
  //     });
  //   });
  // });

  // describe("GET /get-products", () => {
  //   describe("given that end point is correct", () => {
  //     test("should return status code 200 and a json response", async () => {
  //       try {
  //         //Request for data and destructure data into body, status code and header
  //         const { body, statusCode, header } = await request(app).get(
  //           "/admin/api/get-products"
  //         );

  //         //Expect the status code of response to be 200
  //         expect(statusCode).toBe(200);

  //         //Expect the content type of the header to be json
  //         expect(header["content-type"]).toMatch(/json/);

  //         //Expect the body to have a key property called response
  //         expect(body).toHaveProperty("response");

  //         //Expect the body to have a key property called msg
  //         expect(body).toHaveProperty("msg");
  //       } catch (err) {
  //         //Throw err if request fails
  //         throw err;
  //       }
  //     });
  //   });
  // });
});
