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

describe("PUT /admin/api/edit-banner", () => {
  describe("given that user wants to update banner", () => {
    test("should banner id be provided but payload missing", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .put(`/admin/api/edit-banner/${createdBanner._id}`)
          .set("Cookie", loginResponse.headers["set-cookie"]);
        expect(statusCode).toBe(400); //Expect the status code of response to be 200
        expect(header["content-type"]).toMatch(/json/); //Expect the content type of the response to be json
        expect(body).toHaveProperty("response"); //Expect the body to have a property called response
        expect(body).toHaveProperty("msg"); //Expect the body to have a property called msg
      } catch (err) {
        throw err;
      }
    });
    test("should banner id be invalid and payload be provided", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .put(`/admin/api/edit-banner/64a7dee0c4d78a376202d6e1`)
          .set("Cookie", loginResponse.headers["set-cookie"])
          .field("title", "Updated banner")
          .field("description", "This is a test for an updated banner")
          .field("isSelected", false);
        expect(statusCode).toBe(400); //Expect the status code of response to be 200
        expect(header["content-type"]).toMatch(/json/); //Expect the content type of the response to be json
        expect(body).toHaveProperty("response"); //Expect the body to have a property called response
        expect(body).toHaveProperty("msg"); //Expect the body to have a property called msg
      } catch (err) {
        throw err;
      }
    });
    test("should banner id and payload be provided", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .put(`/admin/api/edit-banner/${createdBanner._id}`)
          .set("Cookie", loginResponse.headers["set-cookie"])
          .field("title", "Updated banner")
          .field("description", "This is a test for an updated banner")
          .field("isSelected", false);
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

describe("PUT /admin/api/update-selected", () => {
  describe("given that user wants to update selected banner", () => {
    test("should banner id be invalid", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .put(`/admin/api/update-selected/64a7dee0c4d78a376202d6e1`)
          .set("Cookie", loginResponse.headers["set-cookie"]);
        expect(statusCode).toBe(400); //Expect the status code of response to be 200
        expect(header["content-type"]).toMatch(/json/); //Expect the content type of the response to be json
        expect(body).toHaveProperty("response"); //Expect the body to have a property called response
        expect(body).toHaveProperty("msg"); //Expect the body to have a property called msg
      } catch (err) {
        throw err;
      }
    });
    test("should banner id be provided", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .put(`/admin/api/update-selected/${createdBanner._id}`)
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

describe("GET /admin/api/get-banners", () => {
  describe("given that user wants to get all banners", () => {
    test("should get banners if endpoint is correct", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .get(`/admin/api/get-banners`)
          .set("Cookie", loginResponse.headers["set-cookie"]);
        expect(statusCode).toBe(200); //Expect the status code of response to be 200
        expect(header["content-type"]).toMatch(/json/); //Expect the content type of the response to be json
        expect(body).toHaveProperty("response"); //Expect the body to have a property called response
        expect(body).toHaveProperty("msg"); //Expect the body to have a property called msg
      } catch (err) {
        throw err;
      }
    });
    test("should get banners endpoint be invalid", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .put(`/admin/api/get-banners`)
          .set("Cookie", loginResponse.headers["set-cookie"]);
        expect(statusCode).toBe(404); //Expect the status code of response to be 200
        expect(header["content-type"]).toMatch(/json/); //Expect the content type of the response to be json
        expect(body).toHaveProperty("response"); //Expect the body to have a property called response
        expect(body).toHaveProperty("msg"); //Expect the body to have a property called msg
      } catch (err) {
        throw err;
      }
    });
  });
});


describe("DELETE /admin/api/delete-banner", () => {
  describe("given that user wants to delete banner", () => {
    test("should delete banner if id is provided", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .delete(`/admin/api/delete-banner/${createdBanner._id}`)
          .set("Cookie", loginResponse.headers["set-cookie"]);
        expect(statusCode).toBe(200); //Expect the status code of response to be 200
        expect(header["content-type"]).toMatch(/json/); //Expect the content type of the response to be json
        expect(body).toHaveProperty("response"); //Expect the body to have a property called response
        expect(body).toHaveProperty("msg"); //Expect the body to have a property called msg
      } catch (err) {
        throw err;
      }
    });
    test("should delete banner fail", async () => {
      try {
        const { body, statusCode, header } = await request(app)
          .delete(`/admin/api/delete-banner/${createdBanner._id}`)
          .set("Cookie", loginResponse.headers["set-cookie"]);
        expect(statusCode).toBe(400); //Expect the status code of response to be 200
        expect(header["content-type"]).toMatch(/json/); //Expect the content type of the response to be json
        expect(body).toHaveProperty("response"); //Expect the body to have a property called response
        expect(body).toHaveProperty("msg"); //Expect the body to have a property called msg
      } catch (err) {
        throw err;
      }
    });
  });
});
