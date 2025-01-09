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
    update: jest.fn().mockReturnThis(),
    match: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
  };
  return mockSupabase;
});

const supabase = require("../middleware/supabaseClient");

describe("PUT /api/pemasukan/:id", () => {
  it("should update pemasukan successfully", async () => {
    supabase.update.mockResolvedValueOnce({
      data: { id: 1, jumlah: 200000, keterangan: "Updated pemasukan", sumber_dana: "Proyek" },
      error: null,
    });

    const response = await request(app)
      .put("/api/pemasukan/1")
      .send({
        jumlah: 200000,
        keterangan: "Updated pemasukan",
        sumber_dana: "Proyek",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Pemasukan updated successfully");
    expect(response.body.data).toHaveProperty("jumlah", 200000);
  });
});
