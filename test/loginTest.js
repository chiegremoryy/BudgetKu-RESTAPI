const request = require("supertest");
const express = require("express");
const authRoutes = require("../routes/authRoute"); // Sesuaikan dengan lokasi file router Anda

// Setup express app untuk testing
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

// Mock loginHandler
jest.mock("../models/loginHandler", () => {
  return jest.fn((req, res) => {
    const { email, password } = req.body;

    // Check for missing email or password
    if (!email || !password) {
      return res.status(400).json({ message: "Email or password is missing" });
    }

    // Check for valid credentials (matching the test credentials)
    if (email === "uaspsss@gmail.com" && password === "uas") {
      return res.status(200).json({ token: "mockedToken123" });
    } else if (email === "testuser@example.com" && password === "password123") {
      return res.status(200).json({ token: "mockedToken123" });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
});

// Unit tests for /api/auth/login endpoint
describe("POST /api/auth/login", () => {
  it("should return 200 and a token for valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
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
      .post("/api/auth/login")
      .send({
        email: "wronguser@example.com",
        password: "wrongpassword",
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should return 400 if email or password is missing", async () => {
    // Test missing email
    let response = await request(app)
      .post("/api/auth/login")
      .send({
        password: "password123",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");

    // Test missing password
    response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
