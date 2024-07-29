const request = require("supertest");
const app = require("../../app");
const mongoTestDB = require("../connect-db");

let connection;
let loginResponse;
let createdBanner;

beforeAll(async () => {
  try {
    connection = await mongoTestDB.connect();
  } catch (err) {
    throw err;
  }
});

afterAll(async () => {
  try {
    await mongoTestDB.disconnect(connection);
    await mongoTestDB.stop();
  } catch (err) {
    throw err;
  }
});

describe("POST /admin/api/add-banner", () => {
  describe("given that user has to be authorized ", () => {
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
        throw err;
      }
    });

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
    });
  });

  describe("given that user wants to add banner", () => {
    test("should payload be missing", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .post("/admin/api/add-banner")
          .set("Cookie", loginResponse.headers["set-cookie"]);
        expect(statusCode).toBe(400);
        expect(header["content-type"]).toMatch(/json/);
        expect(body).toHaveProperty("response");
        expect(body).toHaveProperty("msg");
      } catch (err) {
        throw err;
      }
    });

    test("should required fields be empty", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .post("/admin/api/add-banner")
          .set("Cookie", loginResponse.headers["set-cookie"])
          .field("description", "This is a test for banner")
          .attach("image", "test/test_assets/shoe_four.webp");
        expect(statusCode).toBe(400);
        expect(header["content-type"]).toMatch(/json/);
        expect(body).toHaveProperty("response");
        expect(body).toHaveProperty("msg");
      } catch (err) {
        throw err;
      }
    });

    test("should required fields be provided", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .post("/admin/api/add-banner")
          .set("Cookie", loginResponse.headers["set-cookie"])
          .field("title", "This is a test banner")
          .field("description", "This is a test for banner")
          .attach("image", "test/test_assets/shoe_four.webp");
        expect(statusCode).toBe(200);
        expect(header["content-type"]).toMatch(/json/);
        expect(body).toHaveProperty("response");
        expect(body).toHaveProperty("msg");
        createdBanner = body.response;
      } catch (err) {
        throw err;
      }
    });
  });
});
