const request = require("supertest");
const express = require("express");
const pemasukanRoutes = require("../routes/pemasukanRoute");

const app = express();
app.use(express.json());
app.use("/api/pemasukan", pemasukanRoutes);

jest.mock("../middleware/supabaseClient", () => {
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
  };
  return mockSupabase;
});

const supabase = require("../middleware/supabaseClient");

describe("POST /api/pemasukan", () => {
    it("should create pemasukan successfully", async () => {
      supabase.insert.mockResolvedValueOnce({
        data: {
          jumlah: 100000,
          keterangan: "Pemasukan dari proyek",
          sumber_dana: "Proyek",
        },
        error: null,
      });
  
      const authHeader = {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5hbWEiOiJjaGllZ3JlbW9yeXl5IiwiZW1haWwiOiJjaGllZ3JlbW9yeXl5QGdtYWlsLmNvbSIsImlhdCI6MTczNjQzMTQyNSwiZXhwIjoxNzM3MDM2MjI1fQ.C8oKRMKRcXtrjIIucBaiEoTcyZ9M5UswLHuFBheKaJE",
      };
  
      const response = await request(app)
        .post("/api/pemasukan")
        .set(authHeader)
        .send({
          jumlah: 100000,
          keterangan: "Pemasukan dari proyek",
          sumber_dana: "Proyek",
        });
  
      expect(response.status).toBe(201);
      expect(response.body.data.jumlah).toBe(100000);
      expect(response.body.data.keterangan).toBe("Pemasukan dari proyek");
      expect(response.body.data.sumber_dana).toBe("Proyek");
    });
  });
