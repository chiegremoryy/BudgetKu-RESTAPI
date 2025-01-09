const request = require("supertest");
const express = require("express");
const pemasukanRoutes = require("../routes/pemasukanRoute");

const app = express();
app.use(express.json());
app.use("/api/pemasukan", pemasukanRoutes);

jest.mock("../middleware/authMiddleware", () => {
  return (req, res, next) => {
    req.user = { email: "testuser@example.com" };
    next();
  };
});

jest.mock("../middleware/supabaseClient", () => {
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(),
  };
  return mockSupabase;
});

const supabase = require("../middleware/supabaseClient");

describe("GET /api/pemasukan", () => {
  it("should fetch pemasukan successfully", async () => {
    supabase.select.mockResolvedValueOnce({
      data: [
        { id: 1, jumlah: 100000, keterangan: "Pemasukan A", sumber_dana: "Proyek" },
        { id: 2, jumlah: 50000, keterangan: "Pemasukan B", sumber_dana: "Donasi" },
      ],
      error: null,
      count: 2,
    });

    const response = await request(app).get("/api/pemasukan?page=1&limit=10");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(2);
    expect(response.body.pagination).toHaveProperty("page", 1);
    expect(response.body.pagination).toHaveProperty("total", 2);
  });
});
