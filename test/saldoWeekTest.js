// saldoWeekTest.js
const saldoWeekHandler = require("../models/saldoWeekHandler");
const saldoWeekModel = require("../models/saldoWeekModel");

jest.mock("../models/saldoWeekModel");

describe("saldoWeekHandler", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
    global.console.log = jest.fn();
    global.console.error = jest.fn();

    mockReq = {
      user: { email: "dummy@gmail.com" }, // Contoh email
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getSaldoWeekly", () => {
    it("should return total weekly saldo successfully", async () => {
      // Data yang diharapkan dikembalikan dari model
      const mockSaldoData = {
        total_pemasukan: 10000,
        total_pengeluaran: 5000,
        weekly_saldo: 5000,
        status: "plus",
      };

      saldoWeekModel.getSaldoWeeklyData.mockResolvedValue(mockSaldoData);

      await saldoWeekHandler(mockReq, mockRes);

      expect(saldoWeekModel.getSaldoWeeklyData).toHaveBeenCalledWith(mockReq.user.email);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: true,
        message: "Saldo mingguan berhasil dihitung. Status: plus",
        data: mockSaldoData,
      });
    });

    it("should return error if fetching weekly saldo fails", async () => {
      saldoWeekModel.getSaldoWeeklyData.mockRejectedValue(new Error("Database error"));

      await saldoWeekHandler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: expect.any(Error),
      });
    });
  });
});
