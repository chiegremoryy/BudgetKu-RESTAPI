const request = require("supertest");
const express = require("express");
const authRoutes = require("../routes/authRoute");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

jest.mock("../models/registerHandler", () => {
  return jest.fn((req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email or password is missing" });
    }

    if (email === "uaspss@gmail.com" && password === "uas") {
      return res.status(200).json({ token: "mockedToken123" });
    } else if (email === "testuser@example.com" && password === "password123") {
      return res.status(200).json({ token: "mockedToken123" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
});

describe("POST /api/auth/register", () => {
  it("should return 200 and a token for valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "uaspss@gmail.com",
        password: "uas",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toBe("mockedToken123");
  });

  it("should return 401 for invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "wronguser@example.com",
        password: "wrongpassword",
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should return 400 if email or password is missing", async () => {
    let response = await request(app)
      .post("/api/auth/register")
      .send({
        password: "password123",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");

    response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "testuser@example.com",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
