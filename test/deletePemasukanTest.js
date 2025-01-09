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
    delete: jest.fn().mockReturnThis(),
    match: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
  };
  return mockSupabase;
});

const supabase = require("../middleware/supabaseClient");

describe("DELETE /api/pemasukan/:id", () => {
  it("should delete pemasukan successfully", async () => {
    supabase.delete.mockResolvedValueOnce({
      data: { id: 1, jumlah: 100000, keterangan: "Deleted pemasukan", sumber_dana: "Proyek" },
      error: null,
    });

    const response = await request(app).delete("/api/pemasukan/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Pemasukan deleted successfully");
  });
});
